import { VulnSeverity, VulnStatus } from '@vulns/domain/entities/Vuln';

export class UpdateVulnDTO {
  title?: string;
  description?: string;
  severity?: VulnSeverity;
  status?: VulnStatus;
} 