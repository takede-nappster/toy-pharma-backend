import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPharmacy } from '../pharmacy.model';
import { PharmacyService } from '../service/pharmacy.service';

@Component({
  templateUrl: './pharmacy-delete-dialog.component.html',
})
export class PharmacyDeleteDialogComponent {
  pharmacy?: IPharmacy;

  constructor(protected pharmacyService: PharmacyService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pharmacyService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
