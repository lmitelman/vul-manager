import { Inject, Injectable } from '@nestjs/common';
import { Vuln } from '@vulns/domain/entities/Vuln';
import { VulnResponseDTO } from '../../application/dtos/VulnResponseDTO';
import { VulnRepository } from '@vulns/application/repository/VulnRepository';

@Injectable()
export class ListVulnsUseCase {
  constructor(
    @Inject('VulnRepository') private readonly vulnRepository: VulnRepository
  ) {}

  async execute(): Promise<VulnResponseDTO[]> {
    const vulns = await this.vulnRepository.findAll();
    return vulns.map((vuln) => this.toResponseDto(vuln.toDomain()));
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