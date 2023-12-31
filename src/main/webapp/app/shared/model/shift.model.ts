import dayjs from 'dayjs';
import { ITeamPlan } from 'app/shared/model/team-plan.model';
import { IShiftDemand } from 'app/shared/model/shift-demand.model';
import { IResourcePlan } from 'app/shared/model/resource-plan.model';

export interface IShift {
  id?: number;
  key?: number | null;
  shiftStart?: dayjs.Dayjs | null;
  shiftEnd?: dayjs.Dayjs | null;
  type?: string | null;
  teamPlan?: ITeamPlan | null;
  shiftDemand?: IShiftDemand | null;
  resourcePlan?: IResourcePlan | null;
}

export const defaultValue: Readonly<IShift> = {};
