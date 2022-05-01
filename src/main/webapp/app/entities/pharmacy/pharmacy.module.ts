import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PharmacyComponent } from './list/pharmacy.component';
import { PharmacyDetailComponent } from './detail/pharmacy-detail.component';
import { PharmacyUpdateComponent } from './update/pharmacy-update.component';
import { PharmacyDeleteDialogComponent } from './delete/pharmacy-delete-dialog.component';
import { PharmacyRoutingModule } from './route/pharmacy-routing.module';

@NgModule({
  imports: [SharedModule, PharmacyRoutingModule],
  declarations: [PharmacyComponent, PharmacyDetailComponent, PharmacyUpdateComponent, PharmacyDeleteDialogComponent],
  entryComponents: [PharmacyDeleteDialogComponent],
})
export class PharmacyModule {}
