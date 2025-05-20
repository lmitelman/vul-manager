import { Test, TestingModule } from '@nestjs/testing';
import { CreateVulnUseCase } from '../../../../src/vulns/application/usecases/CreateVulnUseCase';
import { VulnRepository } from '@vulns/application/repository/VulnRepository';
import { CreateVulnDTO } from '@vulns/application/dtos/CreateVulnDTO';
import { Vuln, VulnSeverity, VulnStatus } from '@vulns/domain/entities/Vuln';
import { VulnEntity } from '@vulns/infrastructure/entities/VulnEntity';

jest.mock('uuid', () => ({
  v4: () => 'mocked-uuid'
}));

describe('CreateVulnUseCase', () => {
  let useCase: CreateVulnUseCase;
  let vulnRepository: jest.Mocked<VulnRepository>;

  beforeEach(async () => {
    const mockVulnRepository = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateVulnUseCase,
        {
          provide: 'VulnRepository',
          useValue: mockVulnRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateVulnUseCase>(CreateVulnUseCase);
    vulnRepository = module.get('VulnRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a new vulnerability', async () => {
    // Arrange
    const createVulnDto: CreateVulnDTO = {
      title: 'Test Vulnerability',
      description: 'Test Description',
      severity: VulnSeverity.HIGH,
      status: VulnStatus.PENDING_FIX,
      cweId: 'CWE-79',
      suggestedFix: 'Fix suggestion',
      userId: 'user-123'
    };

    const expectedId = 'vuln-mocked-uuid';

    // Act
    const result = await useCase.execute(createVulnDto);

    // Assert
    expect(vulnRepository.create).toHaveBeenCalledWith(
      expect.any(VulnEntity)
    );
    expect(result).toBeInstanceOf(Vuln);
    expect(result.getId()).toBe(expectedId);
    expect(result.getTitle()).toBe(createVulnDto.title);
    expect(result.getDescription()).toBe(createVulnDto.description);
    expect(result.getSeverity()).toBe(createVulnDto.severity);
    expect(result.getStatus()).toBe(VulnStatus.PENDING_FIX);
    expect(result.getCweId()).toBe(createVulnDto.cweId);
    expect(result.getSuggestedFix()).toBe(createVulnDto.suggestedFix);
    expect(result.getUserId()).toBe(createVulnDto.userId);
  });

  it('should create vulnerability with correct dates', async () => {
    // Arrange
    const createVulnDto: CreateVulnDTO = {
      title: 'Test Vulnerability',
      description: 'Test Description',
      severity: VulnSeverity.HIGH,
      status: VulnStatus.PENDING_FIX,
      cweId: 'CWE-79',
      suggestedFix: 'Fix suggestion',
      userId: 'user-123'
    };

    // Act
    const result = await useCase.execute(createVulnDto);

    // Assert
    expect(result.getCreatedAt()).toBeInstanceOf(Date);
    expect(result.getUpdatedAt()).toBeInstanceOf(Date);
    expect(result.getCreatedAt().getTime()).toBeLessThanOrEqual(Date.now());
    expect(result.getUpdatedAt().getTime()).toBeLessThanOrEqual(Date.now());
  });
});
