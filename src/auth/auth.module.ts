import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './infrastructure/controllers/AuthController';
import { JwtStrategy } from './application/strategies/JwtStrategy';
import { AuthUserUseCase } from './application/usecases/AuthUserUseCase';
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
    AuthUserUseCase, 
    JwtStrategy, 
    ConfigService
  ],
  exports: [
    JwtModule, 
    AuthUserUseCase, 
    ConfigService
  ],
})
export class AuthModule {}
