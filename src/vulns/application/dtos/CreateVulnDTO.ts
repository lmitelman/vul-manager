import { VulnSeverity } from '@vulns/domain/entities/Vuln';

export class CreateVulnDTO {
  title: string;
  description: string;
  severity: VulnSeverity;
} 