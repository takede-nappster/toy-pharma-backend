import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDisponibility } from '../disponibility.model';
import { DisponibilityService } from '../service/disponibility.service';

@Component({
  templateUrl: './disponibility-delete-dialog.component.html',
})
export class DisponibilityDeleteDialogComponent {
  disponibility?: IDisponibility;

  constructor(protected disponibilityService: DisponibilityService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.disponibilityService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
