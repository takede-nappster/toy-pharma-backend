import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { IDisponibility, Disponibility } from '../disponibility.model';
import { DisponibilityService } from '../service/disponibility.service';

@Injectable({ providedIn: 'root' })
export class DisponibilityRoutingResolveService implements Resolve<IDisponibility> {
  constructor(protected service: DisponibilityService, protected router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IDisponibility> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        mergeMap((disponibility: HttpResponse<Disponibility>) => {
          if (disponibility.body) {
            return of(disponibility.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Disponibility());
  }
}
