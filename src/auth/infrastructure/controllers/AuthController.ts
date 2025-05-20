import { Controller, Post, Body } from '@nestjs/common';
import { AuthUserUseCase } from '@auth/application/usecases/AuthUserUseCase';
import { AuthUserRequestBody } from './requests/AuthUserRequestBody';
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authenticateUserUseCase: AuthUserUseCase,
  ) {}

  @Post('login')
  async login(@Body() body: AuthUserRequestBody) {
    return this.authenticateUserUseCase.execute(body);
  }
}
