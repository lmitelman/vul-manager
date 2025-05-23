import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Vuln } from '@vulns/domain/entities/Vuln';
import { VulnResponseDTO } from '../../application/dtos/VulnResponseDTO';
import { VulnRepository } from '@vulns/application/repository/VulnRepository';

@Injectable()
export class GetVulnUseCase {
  constructor(
    @Inject('VulnRepository') private readonly vulnRepository: VulnRepository
  ) {}

  async execute(id: string): Promise<Vuln> {
    const vuln = await this.vulnRepository.findById(id);
    if (!vuln) throw new NotFoundException(`Vulnerability with ID ${id} not found`);
    return vuln.toDomain();
  }
} 