import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { VulnRepository } from '@vulns/application/repository/VulnRepository';

@Injectable()
export class DeleteVulnUseCase {
  constructor(
    @Inject('VulnRepository') private readonly vulnRepository: VulnRepository,
  ) {}

  async execute(id: string): Promise<void> {
    const vuln = await this.vulnRepository.findById(id);
    if (!vuln) throw new NotFoundException(`Vulnerability with ID ${id} not found`);
    await this.vulnRepository.delete(id);
  }
} 