import { Test, TestingModule } from '@nestjs/testing';
import { UpdateVulnUseCase } from '@vulns/application/usecases/UpdateVulnUseCase';
import { VulnRepository } from '@vulns/application/repository/VulnRepository';
import { UpdateVulnDTO } from '@vulns/application/dtos/UpdateVulnDTO';
import { Vuln, VulnSeverity, VulnStatus } from '@vulns/domain/entities/Vuln';
import { VulnEntity } from '@vulns/infrastructure/entities/VulnEntity';
import { NotFoundException } from '@nestjs/common';

describe('UpdateVulnUseCase', () => {
  let useCase: UpdateVulnUseCase;
  let vulnRepository: jest.Mocked<VulnRepository>;

  beforeEach(async () => {
    const mockVulnRepository = {
      findById: jest.fn(),
      save: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UpdateVulnUseCase,
        {
          provide: 'VulnRepository',
          useValue: mockVulnRepository,
        },
      ],
    }).compile();

    useCase = module.get<UpdateVulnUseCase>(UpdateVulnUseCase);
    vulnRepository = module.get('VulnRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should throw NotFoundException when vulnerability not found', async () => {
    // Arrange
    const vulnId = 'non-existent-id';
    vulnRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute(vulnId, {})).rejects.toThrow(NotFoundException);
  });

  it('should update vulnerability details', async () => {
    // Arrange
    const vulnId = 'vuln-1';
    const mockVulnEntity = new VulnEntity();
    const existingVuln = new Vuln(
      vulnId,
      'Old Title',
      'Old Description',
      VulnSeverity.LOW,
      VulnStatus.PENDING_FIX,
      new Date(),
      new Date(),
      'CWE-79',
      'Old Fix',
      'user-1'
    );
    mockVulnEntity.toDomain = jest.fn().mockReturnValue(existingVuln);

    vulnRepository.findById.mockResolvedValue(mockVulnEntity);

    const updateDto: UpdateVulnDTO = {
      title: 'New Title',
      description: 'New Description',
      severity: VulnSeverity.HIGH,
      cweId: 'CWE-89',
      suggestedFix: 'New Fix'
    };

    // Act
    const result = await useCase.execute(vulnId, updateDto);

    // Assert
    expect(vulnRepository.save).toHaveBeenCalled();
    expect(result.getTitle()).toBe(updateDto.title);
    expect(result.getDescription()).toBe(updateDto.description);
    expect(result.getSeverity()).toBe(updateDto.severity);
    expect(result.getCweId()).toBe(updateDto.cweId);
    expect(result.getSuggestedFix()).toBe(updateDto.suggestedFix);
  });

  it('should update vulnerability status', async () => {
    // Arrange
    const vulnId = 'vuln-1';
    const mockVulnEntity = new VulnEntity();
    const existingVuln = new Vuln(
      vulnId,
      'Title',
      'Description',
      VulnSeverity.LOW,
      VulnStatus.PENDING_FIX,
      new Date(),
      new Date(),
      'CWE-79',
      'Fix',
      'user-1'
    );
    mockVulnEntity.toDomain = jest.fn().mockReturnValue(existingVuln);

    vulnRepository.findById.mockResolvedValue(mockVulnEntity);

    const updateDto: UpdateVulnDTO = {
      status: VulnStatus.PENDING_FIX
    };

    // Act
    const result = await useCase.execute(vulnId, updateDto);

    // Assert
    expect(vulnRepository.save).toHaveBeenCalled();
    expect(result.getStatus()).toBe(VulnStatus.PENDING_FIX);
  });
});