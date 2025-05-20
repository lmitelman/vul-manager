import { Inject, Injectable } from '@nestjs/common';
import { Vuln } from '@vulns/domain/entities/Vuln';
import { VulnResponseDTO } from '../../application/dtos/VulnResponseDTO';
import { VulnRepository } from '@vulns/application/repository/VulnRepository';

@Injectable()
export class ListVulnsUseCase {
  constructor(
    @Inject('VulnRepository') private readonly vulnRepository: VulnRepository
  ) {}

  async execute(): Promise<Vuln[]> {
    const vulns = await this.vulnRepository.findAll();
    return vulns.map((vuln) => vuln.toDomain());
  }
} 