import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { PharmacyDetailComponent } from './pharmacy-detail.component';

describe('Pharmacy Management Detail Component', () => {
  let comp: PharmacyDetailComponent;
  let fixture: ComponentFixture<PharmacyDetailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PharmacyDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { data: of({ pharmacy: { id: 123 } }) },
        },
      ],
    })
      .overrideTemplate(PharmacyDetailComponent, '')
      .compileComponents();
    fixture = TestBed.createComponent(PharmacyDetailComponent);
    comp = fixture.componentInstance;
  });

  describe('OnInit', () => {
    it('Should load pharmacy on init', () => {
      // WHEN
      comp.ngOnInit();

      // THEN
      expect(comp.pharmacy).toEqual(expect.objectContaining({ id: 123 }));
    });
  });
});
