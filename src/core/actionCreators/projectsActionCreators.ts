import { ProjectsTypes, UpdateProjectPayload } from "../actionTypes/projectsActionTypes";

export const addNewProject = (payload: string) => ({
  type: ProjectsTypes.ADD_NEW_PROJECT,
  payload,
});

export const updateProjectStatus = (payload: UpdateProjectPayload) => ({
  type: ProjectsTypes.UPDATE_PROJECT_STATUS,
  payload,
});
