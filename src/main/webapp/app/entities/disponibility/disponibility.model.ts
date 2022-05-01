import { IPharmacy } from 'app/entities/pharmacy/pharmacy.model';
import { IDrug } from 'app/entities/drug/drug.model';

export interface IDisponibility {
  id?: number;
  quantity?: number | null;
  pharmacy?: IPharmacy | null;
  drug?: IDrug | null;
}

export class Disponibility implements IDisponibility {
  constructor(public id?: number, public quantity?: number | null, public pharmacy?: IPharmacy | null, public drug?: IDrug | null) {}
}

export function getDisponibilityIdentifier(disponibility: IDisponibility): number | undefined {
  return disponibility.id;
}
