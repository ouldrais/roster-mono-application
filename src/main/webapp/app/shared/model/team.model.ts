import { IResource } from 'app/shared/model/resource.model';
import { ITeamPlan } from 'app/shared/model/team-plan.model';

export interface ITeam {
  key?: number | null;
  id?: number;
  resource?: IResource | null;
  teamPlan?: ITeamPlan | null;
}

export const defaultValue: Readonly<ITeam> = {};
