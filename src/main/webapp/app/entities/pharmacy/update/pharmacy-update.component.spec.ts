import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { PharmacyService } from '../service/pharmacy.service';
import { IPharmacy, Pharmacy } from '../pharmacy.model';

import { PharmacyUpdateComponent } from './pharmacy-update.component';

describe('Pharmacy Management Update Component', () => {
  let comp: PharmacyUpdateComponent;
  let fixture: ComponentFixture<PharmacyUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let pharmacyService: PharmacyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [PharmacyUpdateComponent],
      providers: [
        FormBuilder,
        {
          provide: ActivatedRoute,
          useValue: {
            params: from([{}]),
          },
        },
      ],
    })
      .overrideTemplate(PharmacyUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(PharmacyUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    pharmacyService = TestBed.inject(PharmacyService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const pharmacy: IPharmacy = { id: 456 };

      activatedRoute.data = of({ pharmacy });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(pharmacy));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Pharmacy>>();
      const pharmacy = { id: 123 };
      jest.spyOn(pharmacyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pharmacy });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pharmacy }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(pharmacyService.update).toHaveBeenCalledWith(pharmacy);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Pharmacy>>();
      const pharmacy = new Pharmacy();
      jest.spyOn(pharmacyService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pharmacy });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: pharmacy }));
      saveSubject.complete();

      // THEN
      expect(pharmacyService.create).toHaveBeenCalledWith(pharmacy);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Pharmacy>>();
      const pharmacy = { id: 123 };
      jest.spyOn(pharmacyService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ pharmacy });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(pharmacyService.update).toHaveBeenCalledWith(pharmacy);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
