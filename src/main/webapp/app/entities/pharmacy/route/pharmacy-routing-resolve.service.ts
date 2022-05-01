import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IPharmacy, Pharmacy } from '../pharmacy.model';
import { PharmacyService } from '../service/pharmacy.service';

@Injectable({ providedIn: 'root' })
export class PharmacyRoutingResolveService implements Resolve<IPharmacy> {
  constructor(protected service: PharmacyService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPharmacy> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((pharmacy: HttpResponse<Pharmacy>) => {
          if (pharmacy.body) {
            return of(pharmacy.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Pharmacy());
  }
}
