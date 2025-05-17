import { VulnStatus } from '@vulns/domain/entities/Vuln';
import { VulnEntity } from '@vulns/infrastructure/entities/VulnEntity';

export interface VulnRepository {
  create(vuln: Partial<VulnEntity>): Promise<VulnEntity>;
  findAll(): Promise<VulnEntity[]>;
  findById(id: string): Promise<VulnEntity | null>;
  updateStatus(id: number, status: VulnStatus): Promise<void>;
  delete(id: string): Promise<void>;
}
