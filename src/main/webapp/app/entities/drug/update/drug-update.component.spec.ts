import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, Subject, from } from 'rxjs';

import { DrugService } from '../service/drug.service';
import { IDrug, Drug } from '../drug.model';

import { DrugUpdateComponent } from './drug-update.component';

describe('Drug Management Update Component', () => {
  let comp: DrugUpdateComponent;
  let fixture: ComponentFixture<DrugUpdateComponent>;
  let activatedRoute: ActivatedRoute;
  let drugService: DrugService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes([])],
      declarations: [DrugUpdateComponent],
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
      .overrideTemplate(DrugUpdateComponent, '')
      .compileComponents();

    fixture = TestBed.createComponent(DrugUpdateComponent);
    activatedRoute = TestBed.inject(ActivatedRoute);
    drugService = TestBed.inject(DrugService);

    comp = fixture.componentInstance;
  });

  describe('ngOnInit', () => {
    it('Should update editForm', () => {
      const drug: IDrug = { id: 456 };

      activatedRoute.data = of({ drug });
      comp.ngOnInit();

      expect(comp.editForm.value).toEqual(expect.objectContaining(drug));
    });
  });

  describe('save', () => {
    it('Should call update service on save for existing entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Drug>>();
      const drug = { id: 123 };
      jest.spyOn(drugService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ drug });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: drug }));
      saveSubject.complete();

      // THEN
      expect(comp.previousState).toHaveBeenCalled();
      expect(drugService.update).toHaveBeenCalledWith(drug);
      expect(comp.isSaving).toEqual(false);
    });

    it('Should call create service on save for new entity', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Drug>>();
      const drug = new Drug();
      jest.spyOn(drugService, 'create').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ drug });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.next(new HttpResponse({ body: drug }));
      saveSubject.complete();

      // THEN
      expect(drugService.create).toHaveBeenCalledWith(drug);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).toHaveBeenCalled();
    });

    it('Should set isSaving to false on error', () => {
      // GIVEN
      const saveSubject = new Subject<HttpResponse<Drug>>();
      const drug = { id: 123 };
      jest.spyOn(drugService, 'update').mockReturnValue(saveSubject);
      jest.spyOn(comp, 'previousState');
      activatedRoute.data = of({ drug });
      comp.ngOnInit();

      // WHEN
      comp.save();
      expect(comp.isSaving).toEqual(true);
      saveSubject.error('This is an error!');

      // THEN
      expect(drugService.update).toHaveBeenCalledWith(drug);
      expect(comp.isSaving).toEqual(false);
      expect(comp.previousState).not.toHaveBeenCalled();
    });
  });
});
