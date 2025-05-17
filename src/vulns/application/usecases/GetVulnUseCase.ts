import { Injectable, NotFoundException } from '@nestjs/common';
import { Vuln } from '@vulns/domain/entities/Vuln';
import { VulnResponseDTO } from '../../application/dtos/VulnResponseDTO';
import { VulnRepository } from '@vulns/application/repository/VulnRepository';

@Injectable()
export class GetVulnUseCase {
  constructor(private readonly vulnRepository: VulnRepository) {}

  async execute(id: string): Promise<VulnResponseDTO> {
    const vuln = await this.vulnRepository.findById(id);
    if (!vuln) throw new NotFoundException(`Vulnerability with ID ${id} not found`);
    return this.toResponseDto(vuln.toDomain());
  }

  private toResponseDto(vuln: Vuln): VulnResponseDTO {
    return {
      id: vuln.getId(),
      title: vuln.getTitle(),
      description: vuln.getDescription(),
      severity: vuln.getSeverity(),
      status: vuln.getStatus(),
      createdAt: vuln.getCreatedAt(),
      updatedAt: vuln.getUpdatedAt(),
      cweId: vuln.getCweId(),
      suggestedFix: vuln.getSuggestedFix(),
    };
  }
} 