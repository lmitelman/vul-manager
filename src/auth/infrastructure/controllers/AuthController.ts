import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthenticateUserUseCase } from '@auth/application/usecases/AuthenticateUserUseCase';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authenticateUserUseCase: AuthenticateUserUseCase,
  ) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    return this.authenticateUserUseCase.execute(body);
  }
}
