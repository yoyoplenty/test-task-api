import { Model } from 'mongoose';
import * as crypto from 'crypto';
import { ObjectId } from 'mongodb';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Token, TokenDocument } from './schemas/token.schema';
import { UserService } from '../user/user.service';
import { compareResource, hashResource } from 'src/utils/helpers/password';
import { RegisterDto } from './dto/register.dto';
import { appConfig } from 'src/config';
import { MSG_TYPES } from 'src/utils/helpers/msg-types';
import { signupEmail } from 'src/services/email/templates/sign-up.template';
import sendEmail from 'src/services/email';
import { ServiceResponse } from 'src/utils/types';
import { SignInDto } from './dto/sign-in.dto';

const host = appConfig.app.verificationBaseUrl;

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Token.name) private token: Model<TokenDocument>,
    private readonly jwt: JwtService,
    private readonly user: UserService,
  ) {}

  async sendVerificationEmail(userId: ObjectId): Promise<ServiceResponse> {
    const user = await this.user.findOne({ _id: userId });
    if (!user) throw new NotFoundException(MSG_TYPES.NOT_FOUND);

    const tokenPayload = {
      userId: user._id,
      token: crypto.randomBytes(16).toString('hex'),
      tokenType: 'email-verification',
    };
    const token = await this.token.create(tokenPayload);

    const verificationLink = `${host}?email=${user.email}&token=${token.token}`;
    const mailMessage = signupEmail(user.lastName, verificationLink);

    await sendEmail(user.email, 'Welcome To SectorApp - Verify Email', mailMessage);

    return {
      data: null,
      message: `A verification email have been sent to ${user.email}. It will expire after one hour. If you didn't get it, kindly check your spam folder.`,
    };
  }

  async register(registerPayload: RegisterDto): Promise<ServiceResponse> {
    const { email } = registerPayload;

    const userExists = await this.user.findOne({ email });
    if (userExists) throw new BadRequestException('user already exists');

    registerPayload.password = await hashResource(registerPayload.password);

    const user = await this.user.create(registerPayload);
    const data = await this.sendVerificationEmail(user._id);

    return data;
  }

  async signIn(signInPayload: SignInDto): Promise<ServiceResponse> {
    const { email, password } = signInPayload;

    const user = await this.user.findOne({ email });
    if (!user) throw new NotFoundException('user not found');

    const isValidPassword: boolean = await compareResource(password, user.password);
    if (!isValidPassword) throw new BadRequestException('Incorrect email / username and password combination');

    user.password = undefined;

    const token = this.jwt.sign(user.toObject());

    return { data: { user, token }, message: 'Login Successful' };
  }

  async emailVerification(token: string, email: string): Promise<ServiceResponse> {
    const user = await this.user.findOne({ email });

    if (!user) throw new NotFoundException('user not found');
    if (user.verified) throw new BadRequestException('email already verified');

    const userToken = await this.token.findOne({ token });
    if (!userToken) throw new BadRequestException('invalid token');

    if (String(userToken.userId) !== String(user._id)) throw new BadRequestException('invalid user token');

    await user.updateOne({ verified: true });
    await userToken.updateOne({ isActive: false });

    return { data: null, message: MSG_TYPES.ACCOUNT_VERIFIED };
  }
}
