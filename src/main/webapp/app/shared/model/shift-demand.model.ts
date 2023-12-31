import { IDepartment } from 'app/shared/model/department.model';
import { IShift } from 'app/shared/model/shift.model';

export interface IShiftDemand {
  id?: number;
  count?: number | null;
  department?: IDepartment | null;
  shift?: IShift | null;
}

export const defaultValue: Readonly<IShiftDemand> = {};
