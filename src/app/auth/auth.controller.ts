import { Response } from 'express';
import { ApiOperation } from '@nestjs/swagger';
import { Controller, Post, Body, Patch, Param, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { ResponseDTO } from 'src/utils/types';
import { ErrorResponse, JsonResponse } from 'src/handlers/responses';
import { SignInDto } from './dto/sign-in.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({
    summary: 'User Registers',
    description: 'Allows new users to register',
  })
  @Post('register')
  async register(@Body() registerPayload: RegisterDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.authService.register(registerPayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiOperation({
    summary: 'Login User',
    description: 'Allow user to login',
  })
  @Post('login')
  async signIn(@Body() signInPayload: SignInDto, @Res() res: Response): Promise<ResponseDTO> {
    try {
      const response = await this.authService.signIn(signInPayload);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }

  @ApiOperation({
    summary: 'Email Verification',
    description: 'Allow user to login',
  })
  @Patch('verify/:email/:token')
  async emailVerification(
    @Param('email') email: string,
    @Param('token') token: string,
    @Res() res: Response,
  ): Promise<ResponseDTO> {
    try {
      const response = await this.authService.emailVerification(token, email);

      return JsonResponse(res, response);
    } catch (error) {
      return ErrorResponse(res, error);
    }
  }
}
