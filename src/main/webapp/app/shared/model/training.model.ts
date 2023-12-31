import { IPositionRequirement } from 'app/shared/model/position-requirement.model';
import { IResourceTraining } from 'app/shared/model/resource-training.model';

export interface ITraining {
  key?: number | null;
  id?: number;
  description?: string | null;
  positionRequirement?: IPositionRequirement | null;
  resourceTraining?: IResourceTraining | null;
}

export const defaultValue: Readonly<ITraining> = {};
