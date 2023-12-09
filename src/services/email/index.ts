import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { appConfig } from 'src/config';

const sesConfig = {
  region: appConfig.aws.region,
  credentials: {
    accessKeyId: appConfig.aws.accessKey,
    secretAccessKey: appConfig.aws.secretKey,
  },
};

const sesClient = new SESClient(sesConfig);

async function sendEmail(userEmail: string, subject: string, mailMessage: string) {
  try {
    const command = new SendEmailCommand({
      Destination: {
        ToAddresses: [userEmail],
      },
      Message: {
        Subject: {
          Charset: 'UTF-8',
          Data: subject,
        },
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: mailMessage,
          },
        },
      },
      Source: appConfig.email.defaultFrom || '',
      ReplyToAddresses: [appConfig.email.defaultFrom || ''],
    });

    const response = await sesClient.send(command);

    return response;
  } catch (error) {
    console.error('error ::', error);
    return error;
  }
}

export default sendEmail;
