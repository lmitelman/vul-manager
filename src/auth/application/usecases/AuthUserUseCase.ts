import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { AuthUserRequestBody } from '@auth/infrastructure/controllers/requests/AuthUserRequestBody';

@Injectable()
export class AuthUserUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  private formatUsername(email: string): string {
    return email.split('.')[0].charAt(0).toUpperCase() + email.split('.')[0].slice(1);
  }

  async execute(body: AuthUserRequestBody) {
    const adminEmail = this.configService.get('ADMIN_EMAIL');
    const adminPassword = this.configService.get('ADMIN_PASSWORD');
    const adminUserId = this.configService.get('ADMIN_USER_ID');

    const isValidCredentials = 
      body.email === adminEmail && 
      body.password === adminPassword;

    if (!isValidCredentials) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      email: adminEmail, 
      sub: adminUserId,
    };
    
    return {
      user: {
        username: this.formatUsername(adminEmail),
        id: payload.sub,
        email: payload.email,
      },
      accessToken: this.jwtService.sign(payload),
    };
  }
}
