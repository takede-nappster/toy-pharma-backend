import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDisponibility, Disponibility } from '../disponibility.model';

import { DisponibilityService } from './disponibility.service';

describe('Disponibility Service', () => {
  let service: DisponibilityService;
  let httpMock: HttpTestingController;
  let elemDefault: IDisponibility;
  let expectedResult: IDisponibility | IDisponibility[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DisponibilityService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      quantity: 0,
    };
  });

  describe('Service methods', () => {
    it('should find an element', () => {
      const returnedFromService = Object.assign({}, elemDefault);

      service.find(123).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(elemDefault);
    });

    it('should create a Disponibility', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Disponibility()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Disponibility', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          quantity: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Disponibility', () => {
      const patchObject = Object.assign({}, new Disponibility());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Disponibility', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          quantity: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.query().subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'GET' });
      req.flush([returnedFromService]);
      httpMock.verify();
      expect(expectedResult).toContainEqual(expected);
    });

    it('should delete a Disponibility', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDisponibilityToCollectionIfMissing', () => {
      it('should add a Disponibility to an empty array', () => {
        const disponibility: IDisponibility = { id: 123 };
        expectedResult = service.addDisponibilityToCollectionIfMissing([], disponibility);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(disponibility);
      });

      it('should not add a Disponibility to an array that contains it', () => {
        const disponibility: IDisponibility = { id: 123 };
        const disponibilityCollection: IDisponibility[] = [
          {
            ...disponibility,
          },
          { id: 456 },
        ];
        expectedResult = service.addDisponibilityToCollectionIfMissing(disponibilityCollection, disponibility);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Disponibility to an array that doesn't contain it", () => {
        const disponibility: IDisponibility = { id: 123 };
        const disponibilityCollection: IDisponibility[] = [{ id: 456 }];
        expectedResult = service.addDisponibilityToCollectionIfMissing(disponibilityCollection, disponibility);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(disponibility);
      });

      it('should add only unique Disponibility to an array', () => {
        const disponibilityArray: IDisponibility[] = [{ id: 123 }, { id: 456 }, { id: 46329 }];
        const disponibilityCollection: IDisponibility[] = [{ id: 123 }];
        expectedResult = service.addDisponibilityToCollectionIfMissing(disponibilityCollection, ...disponibilityArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const disponibility: IDisponibility = { id: 123 };
        const disponibility2: IDisponibility = { id: 456 };
        expectedResult = service.addDisponibilityToCollectionIfMissing([], disponibility, disponibility2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(disponibility);
        expect(expectedResult).toContain(disponibility2);
      });

      it('should accept null and undefined values', () => {
        const disponibility: IDisponibility = { id: 123 };
        expectedResult = service.addDisponibilityToCollectionIfMissing([], null, disponibility, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(disponibility);
      });

      it('should return initial array if no Disponibility is added', () => {
        const disponibilityCollection: IDisponibility[] = [{ id: 123 }];
        expectedResult = service.addDisponibilityToCollectionIfMissing(disponibilityCollection, undefined, null);
        expect(expectedResult).toEqual(disponibilityCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
