import { Injectable } from '@nestjs/common';
import { Vuln } from '@vulns/domain/entities/Vuln';
import { Presenter } from '@vulns/infrastructure/presenters/Presenter';

export type CreateVulnPresented = {
  id: string;
  createdAt: Date;
};

@Injectable()
export default class CreateVulnPresenter implements Presenter<Vuln, CreateVulnPresented> {
  present(vuln: Vuln): CreateVulnPresented {
    return {
      id: vuln.getId(),
      createdAt: vuln.getCreatedAt(),
    };
  }
}