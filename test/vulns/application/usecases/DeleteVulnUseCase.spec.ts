import { Test, TestingModule } from '@nestjs/testing';
import { DeleteVulnUseCase } from '../../../../src/vulns/application/usecases/DeleteVulnUseCase';
import { VulnRepository } from '@vulns/application/repository/VulnRepository';
import { NotFoundException } from '@nestjs/common';
import { VulnEntity } from '@vulns/infrastructure/entities/VulnEntity';

describe('DeleteVulnUseCase', () => {
  let useCase: DeleteVulnUseCase;
  let vulnRepository: jest.Mocked<VulnRepository>;

  beforeEach(async () => {
    const mockVulnRepository = {
      findById: jest.fn(),
      delete: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeleteVulnUseCase,
        {
          provide: 'VulnRepository',
          useValue: mockVulnRepository,
        },
      ],
    }).compile();

    useCase = module.get<DeleteVulnUseCase>(DeleteVulnUseCase);
    vulnRepository = module.get('VulnRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should successfully delete an existing vulnerability', async () => {
    // Arrange
    const vulnId = 'vuln-1';
    const mockVulnEntity = new VulnEntity();
    vulnRepository.findById.mockResolvedValue(mockVulnEntity);
    vulnRepository.delete.mockResolvedValue();

    // Act
    await useCase.execute(vulnId);

    // Assert
    expect(vulnRepository.findById).toHaveBeenCalledWith(vulnId);
    expect(vulnRepository.delete).toHaveBeenCalledWith(vulnId);
  });

  it('should throw NotFoundException when vulnerability not found', async () => {
    // Arrange
    const vulnId = 'non-existent-id';
    vulnRepository.findById.mockResolvedValue(null);

    // Act & Assert
    await expect(useCase.execute(vulnId)).rejects.toThrow(
      new NotFoundException(`Vulnerability with ID ${vulnId} not found`)
    );
    expect(vulnRepository.delete).not.toHaveBeenCalled();
  });
}); 