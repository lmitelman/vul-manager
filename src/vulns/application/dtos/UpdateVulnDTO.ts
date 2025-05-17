import { VulnSeverity, VulnStatus } from '@vulns/domain/Vuln';

export class UpdateVulnDTO {
  title?: string;
  description?: string;
  severity?: VulnSeverity;
  status?: VulnStatus;
} 