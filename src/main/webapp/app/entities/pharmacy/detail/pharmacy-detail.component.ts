import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPharmacy } from '../pharmacy.model';

@Component({
  selector: 'jhi-pharmacy-detail',
  templateUrl: './pharmacy-detail.component.html',
})
export class PharmacyDetailComponent implements OnInit {
  pharmacy: IPharmacy | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pharmacy }) => {
      this.pharmacy = pharmacy;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
