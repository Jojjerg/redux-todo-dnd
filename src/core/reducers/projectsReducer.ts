import {
  ProjectsActions,
  ProjectsTypes,
} from "../actionTypes/projectsActionTypes";

import { IProject } from "../../types/IProject";
import { v4 as uuidv4 } from "uuid"

interface ProjectsState {
  data: IProject[];
}

const initialState: ProjectsState = {
  data: [],
};

const projectsReducer = (
  state = initialState,
  action: ProjectsActions
): ProjectsState => {
  switch (action.type) {
    case ProjectsTypes.ADD_NEW_PROJECT:
      return {
        ...state,
        data: [
          ...state.data,
          {
            id: uuidv4(),
            title: action.payload,
            status: "incompleted",
          },
        ],
      };
    case ProjectsTypes.UPDATE_PROJECT_STATUS:
      return {
        ...state,
        data: state.data.map((project) =>
          project.id === action.payload.id
            ? { ...project, status: action.payload.status }
            : project
        ),
      };
    default:
      return {
        ...state,
      };
  }
};

export default projectsReducer;
