import { Status } from "../../types/IProject";

export enum ProjectsTypes {
  ADD_NEW_PROJECT = "ADD_NEW_PROJECT",
  UPDATE_PROJECT_STATUS = "UPDATE_PROJECT_STATUS"
}

export type AddNewProject = {
  type: typeof ProjectsTypes.ADD_NEW_PROJECT;
  payload: string;
};

export type UpdateProjectPayload = {
  id: string;
  status: Status;
};

export type UpdateProjectStatus = {
  type: typeof ProjectsTypes.UPDATE_PROJECT_STATUS;
  payload: UpdateProjectPayload;
};


export type ProjectsActions = AddNewProject | UpdateProjectStatus;
