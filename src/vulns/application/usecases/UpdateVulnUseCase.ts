import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Vuln } from '@vulns/domain/entities/Vuln';
import { UpdateVulnDTO } from '@vulns/application/dtos/UpdateVulnDTO';
import { VulnResponseDTO } from '@vulns/application/dtos/VulnResponseDTO';
import { VulnRepository } from '@vulns/application/repository/VulnRepository';
import { VulnEntity } from '@vulns/infrastructure/entities/VulnEntity';

@Injectable()
export class UpdateVulnUseCase {
  constructor(
    @Inject('VulnRepository') private readonly vulnRepository: VulnRepository
  ) {}

  async execute(id: string, dto: UpdateVulnDTO): Promise<Vuln> {
    const vulnEntity = await this.vulnRepository.findById(id);
    const vuln = vulnEntity.toDomain();
    if (!vuln) throw new NotFoundException(`Vulnerability with ID ${id} not found`);

    if (dto.title || dto.description || dto.severity) {
      vuln.updateDetails(
        dto.title ?? vuln.getTitle(),
        dto.description ?? vuln.getDescription(),
        dto.severity ?? vuln.getSeverity(),
        dto.cweId ?? vuln.getCweId(),
        dto.suggestedFix ?? vuln.getSuggestedFix()
      );
    }

    if (dto.status) {
      vuln.updateStatus(dto.status);
    }

    await this.vulnRepository.save(VulnEntity.fromDomain(vuln));
    return vuln;
  }
} 