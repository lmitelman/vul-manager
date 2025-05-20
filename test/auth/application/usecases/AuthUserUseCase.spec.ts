import { Test, TestingModule } from '@nestjs/testing';
import { AuthUserUseCase } from '../../../../src/auth/application/usecases/AuthUserUseCase';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';
import { AuthUserRequestBody } from '@auth/infrastructure/controllers/requests/AuthUserRequestBody';

describe('AuthUserUseCase', () => {
  let useCase: AuthUserUseCase;
  let configService: jest.Mocked<ConfigService>;
  let jwtService: jest.Mocked<JwtService>;

  const mockConfig = {
    ADMIN_EMAIL: 'diego.lauz@strike.sh',
    ADMIN_PASSWORD: 'admin',
    ADMIN_USER_ID: 'usr-1'
  };

  beforeEach(async () => {
    const mockConfigService = {
      get: jest.fn((key: string, defaultValue: string) => mockConfig[key] || defaultValue),
    };

    const mockJwtService = {
      sign: jest.fn().mockReturnValue('mock.jwt.token'),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthUserUseCase,
        {
          provide: ConfigService,
          useValue: mockConfigService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    useCase = module.get<AuthUserUseCase>(AuthUserUseCase);
    configService = module.get(ConfigService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should authenticate user with valid credentials', async () => {
    // Arrange
    const authRequest: AuthUserRequestBody = {
      email: 'diego.lauz@strike.sh',
      password: 'admin'
    };

    // Act
    const result = await useCase.execute(authRequest);

    // Assert
    expect(result).toEqual({
      user: {
        username: 'Diego',
        id: 'usr-1',
        email: 'diego.lauz@strike.sh',
      },
      accessToken: 'mock.jwt.token'
    });
    expect(jwtService.sign).toHaveBeenCalledWith({
      email: 'diego.lauz@strike.sh',
      sub: 'usr-1',
    });
  });

  it('should throw UnauthorizedException with invalid email', async () => {
    // Arrange
    const authRequest: AuthUserRequestBody = {
      email: 'wrong@email.com',
      password: 'admin'
    };

    // Act & Assert
    await expect(useCase.execute(authRequest)).rejects.toThrow(
      new UnauthorizedException('Invalid credentials')
    );
    expect(jwtService.sign).not.toHaveBeenCalled();
  });

  it('should throw UnauthorizedException with invalid password', async () => {
    // Arrange
    const authRequest: AuthUserRequestBody = {
      email: 'diego.lauz@strike.sh',
      password: 'wrongpassword'
    };

    // Act & Assert
    await expect(useCase.execute(authRequest)).rejects.toThrow(
      new UnauthorizedException('Invalid credentials')
    );
    expect(jwtService.sign).not.toHaveBeenCalled();
  });

  it('should format username correctly from email', async () => {
    // Arrange
    const authRequest: AuthUserRequestBody = {
      email: 'diego.lauz@strike.sh',
      password: 'admin'
    };

    // Act
    const result = await useCase.execute(authRequest);

    // Assert
    expect(result.user.username).toBe('Diego');
  });
}); 