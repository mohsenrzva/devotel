import {
  HttpStatus,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { SocialInterface } from '../social/interfaces/social.interface';
import { AuthGoogleLoginDto } from './dto/auth-google-login.dto';
import { AllConfigType } from '../config/config.type';

@Injectable()
export class AuthGoogleService {
  private google: OAuth2Client;

  constructor(private configService: ConfigService<AllConfigType>) {
    this.google = new OAuth2Client(
      this.configService.get('google.clientId', { infer: true }),
      this.configService.get('google.clientSecret', { infer: true }),
      this.configService.get('google.redirectUri', { infer: true }), // Ensure this is set
    );
  }

  async getProfileByCode(
    loginDto: AuthGoogleLoginDto,
  ): Promise<SocialInterface> {
    try {
      // Exchange authorization code for tokens
      const { tokens } = await this.google.getToken(loginDto.code);
      this.google.setCredentials(tokens);

      // Verify the id_token
      const ticket = await this.google.verifyIdToken({
        idToken: tokens.id_token!,
        audience: this.configService.get('google.clientId', { infer: true }),
      });

      const data = ticket.getPayload();

      if (!data) {
        throw new UnprocessableEntityException({
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: {
            user: 'Invalid token payload',
          },
        });
      }

      return {
        id: data.sub,
        email: data.email,
        firstName: data.given_name,
        lastName: data.family_name,
      };
    } catch (error) {
      console.error('Error exchanging code for tokens:', error);

      throw new UnprocessableEntityException({
        status: error.status,
        errors: {
          token: 'Token exchange failed',
          details: error.message,
        },
      });
    }
  }
}
