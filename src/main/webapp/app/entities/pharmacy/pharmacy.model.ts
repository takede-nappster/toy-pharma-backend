import { IDisponibility } from 'app/entities/disponibility/disponibility.model';

export interface IPharmacy {
  id?: number;
  name?: string | null;
  location?: string | null;
  phone?: string | null;
  disponibilities?: IDisponibility[] | null;
}

export class Pharmacy implements IPharmacy {
  constructor(
    public id?: number,
    public name?: string | null,
    public location?: string | null,
    public phone?: string | null,
    public disponibilities?: IDisponibility[] | null
  ) {}
}

export function getPharmacyIdentifier(pharmacy: IPharmacy): number | undefined {
  return pharmacy.id;
}
