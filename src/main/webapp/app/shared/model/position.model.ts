import { IPositionRequirement } from 'app/shared/model/position-requirement.model';
import { IResourcePlan } from 'app/shared/model/resource-plan.model';
import { IDepartment } from 'app/shared/model/department.model';

export interface IPosition {
  key?: number | null;
  id?: number;
  leadership?: string | null;
  positionRequirement?: IPositionRequirement | null;
  resourcePlan?: IResourcePlan | null;
  department?: IDepartment | null;
}

export const defaultValue: Readonly<IPosition> = {};
