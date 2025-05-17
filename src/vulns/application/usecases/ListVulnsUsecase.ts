import { Injectable } from '@nestjs/common';
import { Vuln } from '@vulns/domain/Vuln';
import { VulnResponseDTO } from '../dtos/VulnResponseDTO';

@Injectable()
export class ListVulnsUseCase {
  constructor(private readonly vulnRepository: any) {}

  async execute(): Promise<VulnResponseDTO[]> {
    const vulns = await this.vulnRepository.findAll();
    return vulns.map(vuln => this.toResponseDto(vuln));
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
    };
  }
} 