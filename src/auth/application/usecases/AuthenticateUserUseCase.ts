import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async execute(body: { email: string; password: string }) {
    const adminEmail = this.configService.get('ADMIN_EMAIL');
    const adminPassword = this.configService.get('ADMIN_PASSWORD');

    console.log(adminEmail, adminPassword);

    const isValidCredentials = 
      body.email === adminEmail && 
      body.password === adminPassword;

    if (!isValidCredentials) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { 
      email: body.email, 
      sub: 'usr-1',
    };
    
    return {
      user: {
        username: body.email.split('.')[0].charAt(0).toUpperCase() + body.email.split('.')[0].slice(1),
        id: payload.sub,
        email: payload.email,
      },
      accessToken: this.jwtService.sign(payload),
    };
  }
}
