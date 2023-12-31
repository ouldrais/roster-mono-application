import { IResource } from 'app/shared/model/resource.model';
import { IPosition } from 'app/shared/model/position.model';
import { IShift } from 'app/shared/model/shift.model';

export interface IResourcePlan {
  id?: number;
  availability?: boolean | null;
  resource?: IResource | null;
  position?: IPosition | null;
  shift?: IShift | null;
}

export const defaultValue: Readonly<IResourcePlan> = {
  availability: false,
};
