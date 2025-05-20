import { Injectable } from '@nestjs/common';
import { Vuln } from '@vulns/domain/entities/Vuln';
import { Presenter } from '@vulns/infrastructure/presenters/Presenter';

export type GetVulnPresented = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  severity: string;
  status: string;
  cweId: string;
  suggestedFix: string;
  userId: string;
};

@Injectable()
export default class GetVulnPresenter implements Presenter<Vuln, GetVulnPresented> {
  present(vuln: Vuln): GetVulnPresented {
    return {
      id: vuln.getId(),
      createdAt: vuln.getCreatedAt(),
      updatedAt: vuln.getUpdatedAt(),
      title: vuln.getTitle(),
      description: vuln.getDescription(),
      severity: vuln.getSeverity(),
      status: vuln.getStatus(),
      cweId: vuln.getCweId(),
      suggestedFix: vuln.getSuggestedFix(),
      userId: vuln.getUserId(),
    };
  }
}