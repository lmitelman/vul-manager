import { Test, TestingModule } from '@nestjs/testing';
import { ListVulnsUseCase } from '../../../../src/vulns/application/usecases/ListVulnsUsecase';
import { VulnRepository } from '@vulns/application/repository/VulnRepository';
import { VulnEntity } from '@vulns/infrastructure/entities/VulnEntity';
import { Vuln, VulnSeverity, VulnStatus } from '@vulns/domain/entities/Vuln';

describe('ListVulnsUseCase', () => {
  let useCase: ListVulnsUseCase;
  let vulnRepository: jest.Mocked<VulnRepository>;

  beforeEach(async () => {
    const mockVulnRepository = {
      findAll: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ListVulnsUseCase,
        {
          provide: 'VulnRepository',
          useValue: mockVulnRepository,
        },
      ],
    }).compile();

    useCase = module.get<ListVulnsUseCase>(ListVulnsUseCase);
    vulnRepository = module.get('VulnRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should return an array of vulnerabilities', async () => {
    // Arrange
    const mockVulnEntity = new VulnEntity();
    mockVulnEntity.id = 'vuln-1';
    mockVulnEntity.title = 'Test Vuln';
    mockVulnEntity.description = 'Test Description';
    mockVulnEntity.severity = VulnSeverity.HIGH;
    mockVulnEntity.status = VulnStatus.PENDING_FIX;
    mockVulnEntity.createdAt = new Date();
    mockVulnEntity.updatedAt = new Date();
    mockVulnEntity.cweId = 'CWE-79';
    mockVulnEntity.suggestedFix = 'Fix it';
    mockVulnEntity.userId = 'user-1';

    vulnRepository.findAll.mockResolvedValue([mockVulnEntity]);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(vulnRepository.findAll).toHaveBeenCalled();
    expect(result).toHaveLength(1);
    expect(result[0]).toBeInstanceOf(Vuln);
    expect(result[0].getId()).toBe('vuln-1');
  });

  it('should return empty array when no vulnerabilities exist', async () => {
    // Arrange
    vulnRepository.findAll.mockResolvedValue([]);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(vulnRepository.findAll).toHaveBeenCalled();
    expect(result).toHaveLength(0);
  });
}); 