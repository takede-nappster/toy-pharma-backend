import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { DisponibilityDetailComponent } from './disponibility-detail.component';

describe('Disponibility Management Detail Component', () => {
  let comp: DisponibilityDetailComponent;
  let fixture: ComponentFixture<DisponibilityDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisponibilityDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ disponibility: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(DisponibilityDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(DisponibilityDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load disponibility on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.disponibility).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
