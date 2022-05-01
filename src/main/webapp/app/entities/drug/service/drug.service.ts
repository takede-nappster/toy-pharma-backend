import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IDrug, getDrugIdentifier } from '../drug.model';

export type EntityResponseType = HttpResponse<IDrug>;
export type EntityArrayResponseType = HttpResponse<IDrug[]>;

@Injectable({ providedIn: 'root' })
export class DrugService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/drugs');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(drug: IDrug): Observable<EntityResponseType> {
    return this.http.post<IDrug>(this.resourceUrl, drug, { observe: 'response' });
  }

  update(drug: IDrug): Observable<EntityResponseType> {
    return this.http.put<IDrug>(`${this.resourceUrl}/${getDrugIdentifier(drug) as number}`, drug, { observe: 'response' });
  }

  partialUpdate(drug: IDrug): Observable<EntityResponseType> {
    return this.http.patch<IDrug>(`${this.resourceUrl}/${getDrugIdentifier(drug) as number}`, drug, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IDrug>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IDrug[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addDrugToCollectionIfMissing(drugCollection: IDrug[], ...drugsToCheck: (IDrug | null | undefined)[]): IDrug[] {
    const drugs: IDrug[] = drugsToCheck.filter(isPresent);
    if (drugs.length > 0) {
      const drugCollectionIdentifiers = drugCollection.map(drugItem => getDrugIdentifier(drugItem)!);
      const drugsToAdd = drugs.filter(drugItem => {
        const drugIdentifier = getDrugIdentifier(drugItem);
        if (drugIdentifier == null || drugCollectionIdentifiers.includes(drugIdentifier)) {
          return false;
        }
        drugCollectionIdentifiers.push(drugIdentifier);
        return true;
      });
      return [...drugsToAdd, ...drugCollection];
    }
    return drugCollection;
  }
}
