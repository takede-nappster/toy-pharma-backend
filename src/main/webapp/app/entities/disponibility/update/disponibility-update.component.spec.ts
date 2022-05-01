import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DisponibilityService } from '../service/disponibility.service';
import { IDisponibility, Disponibility } from '../disponibility.model';
import { IPharmacy } from 'app/entities/pharmacy/pharmacy.model';
import { PharmacyService } from 'app/entities/pharmacy/service/pharmacy.service';
import { IDrug } from 'app/entities/drug/drug.model';
import { DrugService } from 'app/entities/drug/service/drug.service';

import { DisponibilityUpdateComponent } from './disponibility-update.component';

describe('Disponibility Management Update Component', () => {
  let comp: DisponibilityUpdateComponent;
  let fixture: ComponentFixture<DisponibilityUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let disponibilityService: DisponibilityService;
  let pharmacyService: PharmacyService;
  let drugService: DrugService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DisponibilityUpdateComponent],
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
      .overrideTemplate(DisponibilityUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DisponibilityUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    disponibilityService = TestBed.inject(DisponibilityService);
    pharmacyService = TestBed.inject(PharmacyService);
    drugService = TestBed.inject(DrugService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should call Pharmacy query and add missing value', () => {
      const disponibility: IDisponibility = { id: 456 };
      const pharmacy: IPharmacy = { id: 92855 };
      disponibility.pharmacy = pharmacy;

      const pharmacyCollection: IPharmacy[] = [{ id: 72960 }];
      jest.spyOn(pharmacyService, 'query').mockReturnValue(of(new HttpResponse({ body: pharmacyCollection })));
      const additionalPharmacies = [pharmacy];
      const expectedCollection: IPharmacy[] = [...additionalPharmacies, ...pharmacyCollection];
      jest.spyOn(pharmacyService, 'addPharmacyToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ disponibility });
      comp.ngOnInit();

      expect(pharmacyService.query).toHaveBeenCalled();
      expect(pharmacyService.addPharmacyToCollectionIfMissing).toHaveBeenCalledWith(pharmacyCollection, ...additionalPharmacies);
      expect(comp.pharmaciesSharedCollection).toEqual(expectedCollection);
    });

    it('Should call Drug query and add missing value', () => {
      const disponibility: IDisponibility = { id: 456 };
      const drug: IDrug = { id: 14085 };
      disponibility.drug = drug;

      const drugCollection: IDrug[] = [{ id: 85075 }];
      jest.spyOn(drugService, 'query').mockReturnValue(of(new HttpResponse({ body: drugCollection })));
      const additionalDrugs = [drug];
      const expectedCollection: IDrug[] = [...additionalDrugs, ...drugCollection];
      jest.spyOn(drugService, 'addDrugToCollectionIfMissing').mockReturnValue(expectedCollection);

      activatedRoute.data = of({ disponibility });
      comp.ngOnInit();

      expect(drugService.query).toHaveBeenCalled();
      expect(drugService.addDrugToCollectionIfMissing).toHaveBeenCalledWith(drugCollection, ...additionalDrugs);
      expect(comp.drugsSharedCollection).toEqual(expectedCollection);
    });

    it('Should update editForm', () => {
      const disponibility: IDisponibility = { id: 456 };
      const pharmacy: IPharmacy = { id: 15275 };
      disponibility.pharmacy = pharmacy;
      const drug: IDrug = { id: 35887 };
      disponibility.drug = drug;

      activatedRoute.data = of({ disponibility });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(disponibility));
      expect(comp.pharmaciesSharedCollection).toContain(pharmacy);
      expect(comp.drugsSharedCollection).toContain(drug);
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Disponibility>>();
      const disponibility = { id: 123 };
      jest.spyOn(disponibilityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disponibility });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: disponibility }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(disponibilityService.update).toHaveBeenCalledWith(disponibility);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Disponibility>>();
      const disponibility = new Disponibility();
      jest.spyOn(disponibilityService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disponibility });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: disponibility }));
      saveSubject.complete();

      // THEN
      expect(disponibilityService.create).toHaveBeenCalledWith(disponibility);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Disponibility>>();
      const disponibility = { id: 123 };
      jest.spyOn(disponibilityService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ disponibility });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(disponibilityService.update).toHaveBeenCalledWith(disponibility);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });

  describe('Tracking relationships identifiers', () => {
    describe('trackPharmacyById', () => {
      it('Should return tracked Pharmacy primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackPharmacyById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });

    describe('trackDrugById', () => {
      it('Should return tracked Drug primary key', () => {
        const entity = { id: 123 };
        const trackResult = comp.trackDrugById(0, entity);
        expect(trackResult).toEqual(entity.id);
      });
    });
  });
});
