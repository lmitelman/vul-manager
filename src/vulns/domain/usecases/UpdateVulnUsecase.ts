import { Injectable, NotFoundException } from '@nestjs/common';
import { Vuln } from '@vulns/domain/entities/Vuln';
import { UpdateVulnDTO } from '@vulns/application/dtos/UpdateVulnDTO';
import { VulnResponseDTO } from '@vulns/application/dtos/VulnResponseDTO';
// import { VulnRepository } from '../../domain/vuln.repository';

@Injectable()
export class UpdateVulnUseCase {
  constructor(private readonly vulnRepository: any) {}

  async execute(id: string, dto: UpdateVulnDTO): Promise<VulnResponseDTO> {
    const vuln = await this.vulnRepository.findById(id);
    if (!vuln) throw new NotFoundException(`Vulnerability with ID ${id} not found`);

    if (dto.title || dto.description || dto.severity) {
      vuln.updateDetails(
        dto.title ?? vuln.getTitle(),
        dto.description ?? vuln.getDescription(),
        dto.severity ?? vuln.getSeverity()
      );
    }

    if (dto.status) {
      vuln.updateStatus(dto.status);
    }

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