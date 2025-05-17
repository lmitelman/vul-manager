import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VulnRepository } from '@vulns/application/repository/VulnRepository';
import { VulnEntity } from '@vulns/infrastructure/entities/VulnEntity';
import { VulnStatus } from '@vulns/domain/entities/Vuln';

@Injectable()
export class MySQLVulnRepository implements VulnRepository {
  constructor(
    @InjectRepository(VulnEntity)
    private readonly repo: Repository<VulnEntity>,
  ) {}

  async create(vuln: Partial<VulnEntity>): Promise<VulnEntity> {
    const newVuln = this.repo.create(vuln);
    return this.repo.save(newVuln);
  }

  async findAll(): Promise<VulnEntity[]> {
    return this.repo.find();
  }

  async findById(id: string): Promise<VulnEntity | null> {
    return this.repo.findOne({ where: { id } });
  }
  async updateStatus(id: number, status: VulnStatus): Promise<void> {
    await this.repo.update(id, { status });
  }

  async delete(id: string): Promise<void> {
    await this.repo.delete(Number(id));
  }
}
