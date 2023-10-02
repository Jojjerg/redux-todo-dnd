import { combineReducers } from "redux";
import modalReducer from "./modalReducer";
import projectsReducer from "./projectsReducer";
import tasksReducer from "./tasksReducer";

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
  modal: modalReducer,
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
