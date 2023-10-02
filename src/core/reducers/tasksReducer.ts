import { TasksActions, TasksTypes } from "../actionTypes/tasksActionTypes";

import { ITask } from "../../types/ITask";
import { addComment } from "../../utils/addReply";
import { v4 as uuidv4 } from "uuid";

interface TasksState {
  data: ITask[];
}

const initialState: TasksState = {
  data: [],
};

const tasksReducer = (
  state = initialState,
  action: TasksActions
): TasksState => {
  switch (action.type) {
    case TasksTypes.ADD_NEW_TASK:
      return {
        ...state,
        data: [
          ...state.data,
          {
            id: uuidv4(),
            project_id: action.payload.project_id,
            title: action.payload.title,
            description: action.payload.description,
            start_date: action.payload.start_date,
            end_date: "",
            priority: "low",
            files: [],
            status: "queue",
            sub_tasks: [],
            comments: [],
          },
        ],
      };

    case TasksTypes.DELETE_TASK:
      return {
        ...state,
        data: state.data.filter((item) => item.id !== action.payload),
      };
    case TasksTypes.DELETE_SUBTASK:
      return {
        ...state,
        data: state.data.map((task) =>
          task.id === action.payload.taskId
            ? {
                ...task,
                sub_tasks: task.sub_tasks.filter(
                  (subTask) => subTask.subTaskId !== action.payload.subTaskId
                ),
              }
            : task
        ),
      };
    case TasksTypes.UPDATE_TASK_STATUS:
      return {
        ...state,
        data: state.data.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                status: action.payload.status,
                end_date:
                  action.payload.status === "done"
                    ? new Date(Date.now()).toLocaleString()
                    : "",
              }
            : task
        ),
      };

    case TasksTypes.UPDATE_TASK_INFO:
      return {
        ...state,
        data: state.data.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                title: action.payload.title,
                description: action.payload.description,
                priority: action.payload.priority,
              }
            : task
        ),
      };

    case TasksTypes.UPDATE_SUBTASK_STATUS:
      return {
        ...state,
        data: state.data.map((task) =>
          task.id === action.payload.taskId
            ? {
                ...task,
                sub_tasks: task.sub_tasks.map((subTask) =>
                  subTask.subTaskId === action.payload.subTaskId
                    ? {
                        ...subTask,
                        status: action.payload.status,
                      }
                    : subTask
                ),
              }
            : task
        ),
      };
    case TasksTypes.ADD_NEW_COMMENT:
      return {
        ...state,
        data: state.data.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                comments: [
                  ...task.comments,
                  {
                    commentId: uuidv4(),
                    text: action.payload.text,
                    creation_date: action.payload.creation_date,
                    children: [],
                  },
                ],
              }
            : task
        ),
      };
    case TasksTypes.REPLY_TO_COMMENT:
      return {
        ...state,
        data: addComment(
          state.data,
          action.payload.taskId,
          action.payload.commentId,
          {
            commentId: uuidv4(),
            text: action.payload.text,
            creation_date: action.payload.creation_date,
            children: [],
          }
        ),
      };
    case TasksTypes.ADD_NEW_SUBTASK:
      return {
        ...state,
        data: state.data.map((task) =>
          task.id === action.payload.id
            ? {
                ...task,
                sub_tasks: [
                  ...task.sub_tasks,
                  {
                    subTaskId: uuidv4(),
                    text: action.payload.text,
                    status: "incompleted",
                  },
                ],
              }
            : task
        ),
      };
    default:
      return {
        ...state,
      };
  }
};

export default tasksReducer;
