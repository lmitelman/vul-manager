import { VulnSeverity, VulnStatus } from '@vulns/domain/Vuln';

export class VulnResponseDTO {
  id: string;
  title: string;
  description: string;
  severity: VulnSeverity;
  status: VulnStatus;
  createdAt: Date;
  updatedAt: Date;
} 