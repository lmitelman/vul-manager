import { Injectable } from '@nestjs/common';
import { Vuln } from '@vulns/domain/entities/Vuln';
import { Presenter } from '@vulns/infrastructure/presenters/Presenter';

export type UpdateVulnPresented = {
  id: string;
  updatedAt: Date;
};

@Injectable()
export default class UpdateVulnPresenter implements Presenter<Vuln, UpdateVulnPresented> {
  present(vuln: Vuln): UpdateVulnPresented {
    return {
      id: vuln.getId(),
      updatedAt: vuln.getUpdatedAt(),
    };
  }
}