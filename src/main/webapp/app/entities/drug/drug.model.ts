import { IDisponibility } from 'app/entities/disponibility/disponibility.model';

export interface IDrug {
  id?: number;
  name?: string | null;
  description?: string | null;
  type?: string | null;
  price?: number | null;
  disponibilities?: IDisponibility[] | null;
}

export class Drug implements IDrug {
  constructor(
    public id?: number,
    public name?: string | null,
    public description?: string | null,
    public type?: string | null,
    public price?: number | null,
    public disponibilities?: IDisponibility[] | null
  ) {}
}

export function getDrugIdentifier(drug: IDrug): number | undefined {
  return drug.id;
}
