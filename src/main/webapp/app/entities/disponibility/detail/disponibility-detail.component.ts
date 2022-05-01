import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDisponibility } from '../disponibility.model';

@Component({
  selector: 'jhi-disponibility-detail',
  templateUrl: './disponibility-detail.component.html',
})
export class DisponibilityDetailComponent implements OnInit {
  disponibility: IDisponibility | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ disponibility }) => {
      this.disponibility = disponibility;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
