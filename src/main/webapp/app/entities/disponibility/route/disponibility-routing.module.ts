import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DisponibilityComponent } from '../list/disponibility.component';
import { DisponibilityDetailComponent } from '../detail/disponibility-detail.component';
import { DisponibilityUpdateComponent } from '../update/disponibility-update.component';
import { DisponibilityRoutingResolveService } from './disponibility-routing-resolve.service';

const disponibilityRoute: Routes = [
  {
    path: '',
    component: DisponibilityComponent,
    data: {
      defaultSort: 'id,asc',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DisponibilityDetailComponent,
    resolve: {
      disponibility: DisponibilityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DisponibilityUpdateComponent,
    resolve: {
      disponibility: DisponibilityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DisponibilityUpdateComponent,
    resolve: {
      disponibility: DisponibilityRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(disponibilityRoute)],
  exports: [RouterModule],
})
export class DisponibilityRoutingModule {}
