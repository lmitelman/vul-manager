import { Test, TestingModule } from '@nestjs/testing';
import { GetVulnUseCase } from '../../../../src/vulns/application/usecases/GetVulnUseCase';
import { VulnRepository } from '@vulns/application/repository/VulnRepository';
import { NotFoundException } from '@nestjs/common';
import { VulnEntity } from '@vulns/infrastructure/entities/VulnEntity';
import { Vuln, VulnSeverity, VulnStatus } from '@vulns/domain/entities/Vuln';

describe('GetVulnUseCase', () => {
  let useCase: GetVulnUseCase;
  let vulnRepository: jest.Mocked<VulnRepository>;

  beforeEach(async () => {
    const mockVulnRepository = {
      findById: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GetVulnUseCase,
        {
          provide: 'VulnRepository',
          useValue: mockVulnRepository,
        },
      ],
    }).compile();

    useCase = module.get<GetVulnUseCase>(GetVulnUseCase);
    vulnRepository = module.get('VulnRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should successfully retrieve an existing vulnerability', async () => {
    // Arrange
    const vulnId = 'vuln-1';
    const mockVulnEntity = new VulnEntity();
    const mockVuln = new Vuln(
      vulnId,
      'Test Vuln',
      'Test Description',
      VulnSeverity.HIGH,
      VulnStatus.PENDING_FIX,
      new Date(),
      new Date(),
      'CWE-79',
      'Fix it',
      'user-1'
    );
    
    mockVulnEntity.toDomain = jest.fn().mockReturnValue(mockVuln);
    vulnRepository.findById.mockResolvedValue(mockVulnEntity);

    // Act
    const result = await useCase.execute(vulnId);

    // Assert
    expect(vulnRepository.findById).toHaveBeenCalledWith(vulnId);
    expect(result).toBeInstanceOf(Vuln);
    expect(result.getId()).toBe(vulnId);
    expect(result.getTitle()).toBe('Test Vuln');
    expect(result.getDescription()).toBe('Test Description');
    expect(result.getSeverity()).toBe('HIGH');
    expect(result.getStatus()).toBe(VulnStatus.PENDING_FIX);
  });

  it('should throw NotFoundException when vulnerability not found', async () => {
    // Arrange
    const vulnId = 'non-existent-id';
    vulnRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute(vulnId)).rejects.toThrow(
      new NotFoundException(`Vulnerability with ID ${vulnId} not found`)
    );
  });
}); 