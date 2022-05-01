import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDisponibility, Disponibility } from '../disponibility.model';
import { DisponibilityService } from '../service/disponibility.service';
import { IPharmacy } from 'app/entities/pharmacy/pharmacy.model';
import { PharmacyService } from 'app/entities/pharmacy/service/pharmacy.service';
import { IDrug } from 'app/entities/drug/drug.model';
import { DrugService } from 'app/entities/drug/service/drug.service';

@Component({
  selector: 'jhi-disponibility-update',
  templateUrl: './disponibility-update.component.html',
})
export class DisponibilityUpdateComponent implements OnInit {
  isSaving = false;

  pharmaciesSharedCollection: IPharmacy[] = [];
  drugsSharedCollection: IDrug[] = [];

  editForm = this.fb.group({
    id: [],
    quantity: [],
    pharmacy: [],
    drug: [],
  });

  constructor(
    protected disponibilityService: DisponibilityService,
    protected pharmacyService: PharmacyService,
    protected drugService: DrugService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ disponibility }) => {
      this.updateForm(disponibility);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const disponibility = this.createFromForm();
    if (disponibility.id !== undefined) {
      this.subscribeToSaveResponse(this.disponibilityService.update(disponibility));
    } else {
      this.subscribeToSaveResponse(this.disponibilityService.create(disponibility));
    }
  }

  trackPharmacyById(_index: number, item: IPharmacy): number {
    return item.id!;
  }

  trackDrugById(_index: number, item: IDrug): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDisponibility>>): void {
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

  protected updateForm(disponibility: IDisponibility): void {
    this.editForm.patchValue({
      id: disponibility.id,
      quantity: disponibility.quantity,
      pharmacy: disponibility.pharmacy,
      drug: disponibility.drug,
    });

    this.pharmaciesSharedCollection = this.pharmacyService.addPharmacyToCollectionIfMissing(
      this.pharmaciesSharedCollection,
      disponibility.pharmacy
    );
    this.drugsSharedCollection = this.drugService.addDrugToCollectionIfMissing(this.drugsSharedCollection, disponibility.drug);
  }

  protected loadRelationshipsOptions(): void {
    this.pharmacyService
      .query()
      .pipe(map((res: HttpResponse<IPharmacy[]>) => res.body ?? []))
      .pipe(
        map((pharmacies: IPharmacy[]) =>
          this.pharmacyService.addPharmacyToCollectionIfMissing(pharmacies, this.editForm.get('pharmacy')!.value)
        )
      )
      .subscribe((pharmacies: IPharmacy[]) => (this.pharmaciesSharedCollection = pharmacies));

    this.drugService
      .query()
      .pipe(map((res: HttpResponse<IDrug[]>) => res.body ?? []))
      .pipe(map((drugs: IDrug[]) => this.drugService.addDrugToCollectionIfMissing(drugs, this.editForm.get('drug')!.value)))
      .subscribe((drugs: IDrug[]) => (this.drugsSharedCollection = drugs));
  }

  protected createFromForm(): IDisponibility {
    return {
      ...new Disponibility(),
      id: this.editForm.get(['id'])!.value,
      quantity: this.editForm.get(['quantity'])!.value,
      pharmacy: this.editForm.get(['pharmacy'])!.value,
      drug: this.editForm.get(['drug'])!.value,
    };
  }
}
