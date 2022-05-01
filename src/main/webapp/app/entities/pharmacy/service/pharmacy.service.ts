import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { isPresent } from 'app/core/util/operators';
import { ApplicationConfigService } from 'app/core/config/application-config.service';
import { createRequestOption } from 'app/core/request/request-util';
import { IPharmacy, getPharmacyIdentifier } from '../pharmacy.model';

export type EntityResponseType = HttpResponse<IPharmacy>;
export type EntityArrayResponseType = HttpResponse<IPharmacy[]>;

@Injectable({ providedIn: 'root' })
export class PharmacyService {
  protected resourceUrl = this.applicationConfigService.getEndpointFor('api/pharmacies');

  constructor(protected http: HttpClient, protected applicationConfigService: ApplicationConfigService) {}

  create(pharmacy: IPharmacy): Observable<EntityResponseType> {
    return this.http.post<IPharmacy>(this.resourceUrl, pharmacy, { observe: 'response' });
  }

  update(pharmacy: IPharmacy): Observable<EntityResponseType> {
    return this.http.put<IPharmacy>(`${this.resourceUrl}/${getPharmacyIdentifier(pharmacy) as number}`, pharmacy, { observe: 'response' });
  }

  partialUpdate(pharmacy: IPharmacy): Observable<EntityResponseType> {
    return this.http.patch<IPharmacy>(`${this.resourceUrl}/${getPharmacyIdentifier(pharmacy) as number}`, pharmacy, {
      observe: 'response',
    });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IPharmacy>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IPharmacy[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  addPharmacyToCollectionIfMissing(pharmacyCollection: IPharmacy[], ...pharmaciesToCheck: (IPharmacy | null | undefined)[]): IPharmacy[] {
    const pharmacies: IPharmacy[] = pharmaciesToCheck.filter(isPresent);
    if (pharmacies.length > 0) {
      const pharmacyCollectionIdentifiers = pharmacyCollection.map(pharmacyItem => getPharmacyIdentifier(pharmacyItem)!);
      const pharmaciesToAdd = pharmacies.filter(pharmacyItem => {
        const pharmacyIdentifier = getPharmacyIdentifier(pharmacyItem);
        if (pharmacyIdentifier == null || pharmacyCollectionIdentifiers.includes(pharmacyIdentifier)) {
          return false;
        }
        pharmacyCollectionIdentifiers.push(pharmacyIdentifier);
        return true;
      });
      return [...pharmaciesToAdd, ...pharmacyCollection];
    }
    return pharmacyCollection;
  }
}
