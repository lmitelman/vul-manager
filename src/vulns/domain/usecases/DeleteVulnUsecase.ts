import { Injectable, NotFoundException } from '@nestjs/common';
// import { VulnRepository } from '../../domain/vuln.repository';

@Injectable()
export class DeleteVulnUseCase {
  constructor(private readonly vulnRepository: any) {}

  async execute(id: string): Promise<void> {
    const vuln = await this.vulnRepository.findById(id);
    if (!vuln) throw new NotFoundException(`Vulnerability with ID ${id} not found`);
    await this.vulnRepository.delete(id);
  }
} 