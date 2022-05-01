import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { PharmacyComponent } from '../list/pharmacy.component';
import { PharmacyDetailComponent } from '../detail/pharmacy-detail.component';
import { PharmacyUpdateComponent } from '../update/pharmacy-update.component';
import { PharmacyRoutingResolveService } from './pharmacy-routing-resolve.service';

const pharmacyRoute: Routes = [
  {
    path: '',
    component: PharmacyComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: PharmacyDetailComponent,
    resolve: {
      pharmacy: PharmacyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: PharmacyUpdateComponent,
    resolve: {
      pharmacy: PharmacyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: PharmacyUpdateComponent,
    resolve: {
      pharmacy: PharmacyRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(pharmacyRoute)],
  exports: [RouterModule],
})
export class PharmacyRoutingModule {}
