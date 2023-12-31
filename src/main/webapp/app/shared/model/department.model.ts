import { IPosition } from 'app/shared/model/position.model';
import { IShiftDemand } from 'app/shared/model/shift-demand.model';

export interface IDepartment {
  key?: number | null;
  id?: number;
  team?: string | null;
  position?: IPosition | null;
  shiftDemand?: IShiftDemand | null;
}

export const defaultValue: Readonly<IDepartment> = {};
