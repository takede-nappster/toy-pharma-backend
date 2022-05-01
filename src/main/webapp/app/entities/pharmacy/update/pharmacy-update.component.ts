import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IPharmacy, Pharmacy } from '../pharmacy.model';
import { PharmacyService } from '../service/pharmacy.service';

@Component({
  selector: 'jhi-pharmacy-update',
  templateUrl: './pharmacy-update.component.html',
})
export class PharmacyUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    name: [],
    location: [],
    phone: [],
  });

  constructor(protected pharmacyService: PharmacyService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pharmacy }) => {
      this.updateForm(pharmacy);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pharmacy = this.createFromForm();
    if (pharmacy.id !== undefined) {
      this.subscribeToSaveResponse(this.pharmacyService.update(pharmacy));
    } else {
      this.subscribeToSaveResponse(this.pharmacyService.create(pharmacy));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPharmacy>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(pharmacy: IPharmacy): void {
    this.editForm.patchValue({
      id: pharmacy.id,
      name: pharmacy.name,
      location: pharmacy.location,
      phone: pharmacy.phone,
    });
  }

  protected createFromForm(): IPharmacy {
    return {
      ...new Pharmacy(),
      id: this.editForm.get(['id'])!.value,
      name: this.editForm.get(['name'])!.value,
      location: this.editForm.get(['location'])!.value,
      phone: this.editForm.get(['phone'])!.value,
    };
  }
}
