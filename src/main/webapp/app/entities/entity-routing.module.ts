import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'pharmacy',
        data: { pageTitle: 'pharmbackendApp.pharmacy.home.title' },
        loadChildren: () => import('./pharmacy/pharmacy.module').then(m => m.PharmacyModule),
      },
      {
        path: 'drug',
        data: { pageTitle: 'pharmbackendApp.drug.home.title' },
        loadChildren: () => import('./drug/drug.module').then(m => m.DrugModule),
      },
      {
        path: 'disponibility',
        data: { pageTitle: 'pharmbackendApp.disponibility.home.title' },
        loadChildren: () => import('./disponibility/disponibility.module').then(m => m.DisponibilityModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
