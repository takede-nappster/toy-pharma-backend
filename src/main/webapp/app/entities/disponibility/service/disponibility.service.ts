import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDisponibility, getDisponibilityIdentifier } from '../disponibility.model';

export type EntityResponseType = HttpResponse<IDisponibility>;
export type EntityArrayResponseType = HttpResponse<IDisponibility[]>;

@Injectable({ providedIn: 'root' })
export class DisponibilityService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/disponibilities');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(disponibility: IDisponibility): Observable<EntityResponseType> {
    return this.http.post<IDisponibility>(this.resourceUrl, disponibility, { observe: 'response' });
  }

  update(disponibility: IDisponibility): Observable<EntityResponseType> {
    return this.http.put<IDisponibility>(`${this.resourceUrl}/${getDisponibilityIdentifier(disponibility) as number}`, disponibility, {
      observe: 'response',
    });
  }

  partialUpdate(disponibility: IDisponibility): Observable<EntityResponseType> {
    return this.http.patch<IDisponibility>(`${this.resourceUrl}/${getDisponibilityIdentifier(disponibility) as number}`, disponibility, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDisponibility>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDisponibility[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDisponibilityToCollectionIfMissing(
    disponibilityCollection: IDisponibility[],
    ...disponibilitiesToCheck: (IDisponibility | null | undefined)[]
  ): IDisponibility[] {
    const disponibilities: IDisponibility[] = disponibilitiesToCheck.filter(isPresent);
    if (disponibilities.length > 0) {
      const disponibilityCollectionIdentifiers = disponibilityCollection.map(
        disponibilityItem => getDisponibilityIdentifier(disponibilityItem)!
      );
      const disponibilitiesToAdd = disponibilities.filter(disponibilityItem => {
        const disponibilityIdentifier = getDisponibilityIdentifier(disponibilityItem);
        if (disponibilityIdentifier == null || disponibilityCollectionIdentifiers.includes(disponibilityIdentifier)) {
          return false;
        }
        disponibilityCollectionIdentifiers.push(disponibilityIdentifier);
        return true;
      });
      return [...disponibilitiesToAdd, ...disponibilityCollection];
    }
    return disponibilityCollection;
  }
}
