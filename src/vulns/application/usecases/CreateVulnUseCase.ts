import { Inject, Injectable } from '@nestjs/common';
import { Vuln, VulnStatus } from '@vulns/domain/entities/Vuln';
import { CreateVulnDTO } from '@vulns/application/dtos/CreateVulnDTO';
import { VulnResponseDTO } from '@vulns/application/dtos/VulnResponseDTO';
import { v4 as uuidv4 } from 'uuid';
import { VulnRepository } from '@vulns/application/repository/VulnRepository';
import { VulnEntity } from '@vulns/infrastructure/entities/VulnEntity';

@Injectable()
export class CreateVulnUseCase {
  constructor(
    @Inject('VulnRepository') private readonly vulnRepository: VulnRepository
  ) {}
  
  async execute(dto: CreateVulnDTO): Promise<Vuln> {
    const vuln = new Vuln(
      `vuln-${uuidv4()}`,
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

    await this.vulnRepository.create(VulnEntity.fromDomain(vuln));
    return vuln
  }
} 