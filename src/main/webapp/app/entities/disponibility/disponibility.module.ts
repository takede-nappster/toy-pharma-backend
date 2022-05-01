import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { DisponibilityComponent } from './list/disponibility.component';
import { DisponibilityDetailComponent } from './detail/disponibility-detail.component';
import { DisponibilityUpdateComponent } from './update/disponibility-update.component';
import { DisponibilityDeleteDialogComponent } from './delete/disponibility-delete-dialog.component';
import { DisponibilityRoutingModule } from './route/disponibility-routing.module';

@NgModule({
  imports: [SharedModule, DisponibilityRoutingModule],
  declarations: [DisponibilityComponent, DisponibilityDetailComponent, DisponibilityUpdateComponent, DisponibilityDeleteDialogComponent],
  entryComponents: [DisponibilityDeleteDialogComponent],
})
export class DisponibilityModule {}
