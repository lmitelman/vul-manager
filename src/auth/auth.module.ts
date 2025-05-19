import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './infrastructure/controllers/AuthController';
import { JwtStrategy } from './application/strategies/JwtStrategy';
import { AuthenticateUserUseCase } from './application/usecases/AuthenticateUserUseCase';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '24h' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthenticateUserUseCase, 
    JwtStrategy, 
    ConfigService
  ],
  exports: [
    JwtModule, 
    AuthenticateUserUseCase, 
    ConfigService
  ],
})
export class AuthModule {}
