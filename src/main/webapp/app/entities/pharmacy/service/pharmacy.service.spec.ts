import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { IPharmacy, Pharmacy } from '../pharmacy.model';

import { PharmacyService } from './pharmacy.service';

describe('Pharmacy Service', () => {
  let service: PharmacyService;
  let httpMock: HttpTestingController;
  let elemDefault: IPharmacy;
  let expectedResult: IPharmacy | IPharmacy[] | boolean | null;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    expectedResult = null;
    service = TestBed.inject(PharmacyService);
    httpMock = TestBed.inject(HttpTestingController);

    elemDefault = {
      id: 0,
      name: 'AAAAAAA',
      location: 'AAAAAAA',
      phone: 'AAAAAAA',
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

    it('should create a Pharmacy', () => {
      const returnedFromService = Object.assign(
        {
          id: 0,
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.create(new Pharmacy()).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'POST' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should update a Pharmacy', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          location: 'BBBBBB',
          phone: 'BBBBBB',
        },
        elemDefault
      );

      const expected = Object.assign({}, returnedFromService);

      service.update(expected).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PUT' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should partial update a Pharmacy', () => {
      const patchObject = Object.assign({}, new Pharmacy());

      const returnedFromService = Object.assign(patchObject, elemDefault);

      const expected = Object.assign({}, returnedFromService);

      service.partialUpdate(patchObject).subscribe(resp => (expectedResult = resp.body));

      const req = httpMock.expectOne({ method: 'PATCH' });
      req.flush(returnedFromService);
      expect(expectedResult).toMatchObject(expected);
    });

    it('should return a list of Pharmacy', () => {
      const returnedFromService = Object.assign(
        {
          id: 1,
          name: 'BBBBBB',
          location: 'BBBBBB',
          phone: 'BBBBBB',
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

    it('should delete a Pharmacy', () => {
      service.delete(123).subscribe(resp => (expectedResult = resp.ok));

      const req = httpMock.expectOne({ method: 'DELETE' });
      req.flush({ status: 200 });
      expect(expectedResult);
    });

    describe('addPharmacyToCollectionIfMissing', () => {
      it('should add a Pharmacy to an empty array', () => {
        const pharmacy: IPharmacy = { id: 123 };
        expectedResult = service.addPharmacyToCollectionIfMissing([], pharmacy);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pharmacy);
      });

      it('should not add a Pharmacy to an array that contains it', () => {
        const pharmacy: IPharmacy = { id: 123 };
        const pharmacyCollection: IPharmacy[] = [
          {
            ...pharmacy,
          },
          { id: 456 },
        ];
        expectedResult = service.addPharmacyToCollectionIfMissing(pharmacyCollection, pharmacy);
        expect(expectedResult).toHaveLength(2);
      });

      it("should add a Pharmacy to an array that doesn't contain it", () => {
        const pharmacy: IPharmacy = { id: 123 };
        const pharmacyCollection: IPharmacy[] = [{ id: 456 }];
        expectedResult = service.addPharmacyToCollectionIfMissing(pharmacyCollection, pharmacy);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pharmacy);
      });

      it('should add only unique Pharmacy to an array', () => {
        const pharmacyArray: IPharmacy[] = [{ id: 123 }, { id: 456 }, { id: 39503 }];
        const pharmacyCollection: IPharmacy[] = [{ id: 123 }];
        expectedResult = service.addPharmacyToCollectionIfMissing(pharmacyCollection, ...pharmacyArray);
        expect(expectedResult).toHaveLength(3);
      });

      it('should accept varargs', () => {
        const pharmacy: IPharmacy = { id: 123 };
        const pharmacy2: IPharmacy = { id: 456 };
        expectedResult = service.addPharmacyToCollectionIfMissing([], pharmacy, pharmacy2);
        expect(expectedResult).toHaveLength(2);
        expect(expectedResult).toContain(pharmacy);
        expect(expectedResult).toContain(pharmacy2);
      });

      it('should accept null and undefined values', () => {
        const pharmacy: IPharmacy = { id: 123 };
        expectedResult = service.addPharmacyToCollectionIfMissing([], null, pharmacy, undefined);
        expect(expectedResult).toHaveLength(1);
        expect(expectedResult).toContain(pharmacy);
      });

      it('should return initial array if no Pharmacy is added', () => {
        const pharmacyCollection: IPharmacy[] = [{ id: 123 }];
        expectedResult = service.addPharmacyToCollectionIfMissing(pharmacyCollection, undefined, null);
        expect(expectedResult).toEqual(pharmacyCollection);
      });
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
