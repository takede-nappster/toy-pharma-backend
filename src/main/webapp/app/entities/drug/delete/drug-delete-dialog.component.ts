import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDrug } from '../drug.model';
import { DrugService } from '../service/drug.service';

@Component({
  templateUrl: './drug-delete-dialog.component.html',
})
export class DrugDeleteDialogComponent {
  drug?: IDrug;

  constructor(protected drugService: DrugService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.drugService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
