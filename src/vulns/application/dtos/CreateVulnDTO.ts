import { VulnSeverity } from '@vulns/domain/Vuln';

export class CreateVulnDTO {
  title: string;
  description: string;
  severity: VulnSeverity;
} 