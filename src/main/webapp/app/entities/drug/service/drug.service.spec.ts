import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IDrug, Drug } from '../drug.model';

import { DrugService } from './drug.service';

describe('Drug Service', () => {
  let service: DrugService;
  let httpMock: HttpTestingController;
  let elemDefault: IDrug;
  let expectedResult: IDrug | IDrug[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(DrugService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      name: 'AAAAAAA',
      description: 'AAAAAAA',
      type: 'AAAAAAA',
      price: 0,
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

    it('should create a Drug', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Drug()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Drug', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          description: 'BBBBBB',
          type: 'BBBBBB',
          price: 1,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Drug', () => {
      const patchObject = Object.assign(
        {
          name: 'BBBBBB',
          type: 'BBBBBB',
        },
        new Drug()
      );

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Drug', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          description: 'BBBBBB',
          type: 'BBBBBB',
          price: 1,
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

    it('should delete a Drug', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addDrugToCollectionIfMissing', () => {
      it('should add a Drug to an empty array', () => {
        const drug: IDrug = { id: 123 };
        expectedResult = service.addDrugToCollectionIfMissing([], drug);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(drug);
      });

      it('should not add a Drug to an array that contains it', () => {
        const drug: IDrug = { id: 123 };
        const drugCollection: IDrug[] = [
          {
            ...drug,
          },
          { id: 456 },
        ];
        expectedResult = service.addDrugToCollectionIfMissing(drugCollection, drug);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Drug to an array that doesn't contain it", () => {
        const drug: IDrug = { id: 123 };
        const drugCollection: IDrug[] = [{ id: 456 }];
        expectedResult = service.addDrugToCollectionIfMissing(drugCollection, drug);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(drug);
      });

      it('should add only unique Drug to an array', () => {
        const drugArray: IDrug[] = [{ id: 123 }, { id: 456 }, { id: 76307 }];
        const drugCollection: IDrug[] = [{ id: 123 }];
        expectedResult = service.addDrugToCollectionIfMissing(drugCollection, ...drugArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const drug: IDrug = { id: 123 };
        const drug2: IDrug = { id: 456 };
        expectedResult = service.addDrugToCollectionIfMissing([], drug, drug2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(drug);
        expect(expectedResult).toContain(drug2);
      });

      it('should accept null and undefined values', () => {
        const drug: IDrug = { id: 123 };
        expectedResult = service.addDrugToCollectionIfMissing([], null, drug, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(drug);
      });

      it('should return initial array if no Drug is added', () => {
        const drugCollection: IDrug[] = [{ id: 123 }];
        expectedResult = service.addDrugToCollectionIfMissing(drugCollection, undefined, null);
        expect(expectedResult).toEqual(drugCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
