import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../../../../src/auth/infrastructure/controllers/AuthController';
import { AuthUserUseCase } from '@auth/application/usecases/AuthUserUseCase';
import { AuthUserRequestBody } from '../../../../src/auth/infrastructure/controllers/requests/AuthUserRequestBody';

describe('AuthController', () => {
  let controller: AuthController;
  let authUserUseCase: jest.Mocked<AuthUserUseCase>;

  beforeEach(async () => {
    const mockAuthUserUseCase = {
      execute: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthUserUseCase,
          useValue: mockAuthUserUseCase,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authUserUseCase = module.get(AuthUserUseCase);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('login', () => {
    it('should successfully authenticate user and return token', async () => {
      // Arrange
      const loginRequest: AuthUserRequestBody = {
        email: 'diego.lauz@strike.sh',
        password: 'admin'
      };

      const expectedResponse = {
        user: {
          username: 'Diego',
          id: 'usr-1',
          email: 'diego.lauz@strike.sh',
        },
        accessToken: 'mock.jwt.token'
      };

      authUserUseCase.execute.mockResolvedValue(expectedResponse);

      // Act
      const result = await controller.login(loginRequest);

      // Assert
      expect(authUserUseCase.execute).toHaveBeenCalledWith(loginRequest);
      expect(result).toEqual(expectedResponse);
    });

    it('should pass through any errors from the use case', async () => {
      // Arrange
      const loginRequest: AuthUserRequestBody = {
        email: 'wrong@email.com',
        password: 'wrongpassword'
      };

      const error = new Error('Authentication failed');
      authUserUseCase.execute.mockRejectedValue(error);

      // Act & Assert
      await expect(controller.login(loginRequest)).rejects.toThrow(error);
      expect(authUserUseCase.execute).toHaveBeenCalledWith(loginRequest);
    });
  });
}); 