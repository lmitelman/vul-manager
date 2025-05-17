import { Injectable } from '@nestjs/common';
// import { VulnRepository } from '../../domain/vuln.repository';
import { Vuln, VulnStatus } from '@vulns/domain/entities/Vuln';
import { CreateVulnDTO } from '@vulns/application/dtos/CreateVulnDTO';
import { VulnResponseDTO } from '@vulns/application/dtos/VulnResponseDTO';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class CreateVulnUseCase {
  constructor(private readonly vulnRepository: any) {}
  async execute(dto: CreateVulnDTO): Promise<VulnResponseDTO> {
    const vuln = new Vuln(
      uuidv4(),
      dto.title,
      dto.description,
      dto.severity,
      VulnStatus.PENDING_FIX,
      new Date(),
      new Date(),
      dto.cweId,
      dto.suggestedFix,
      dto.userId
    );

    await this.vulnRepository.save(vuln);
    return this.toResponseDto(vuln);
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