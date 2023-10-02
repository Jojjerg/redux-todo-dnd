import { IComment, ISubTask, ITask, Status, SubTaskStatus } from "../../types/ITask";

export enum TasksTypes {
  ADD_NEW_TASK = "ADD_NEW_TASK",
  ADD_NEW_COMMENT = "ADD_NEW_COMMENT",
  ADD_NEW_SUBTASK = "ADD_NEW_SUBTASK",
  DELETE_TASK = "DELETE_TASK",
  DELETE_SUBTASK = "DELETE_SUBTASK",
  UPDATE_TASK_STATUS = "UPDATE_TASK_STATUS",
  UPDATE_SUBTASK_STATUS = "UPDATE_SUBTASK_STATUS",
  UPDATE_TASK_INFO = "UPDATE_TASK_INFO",
  REPLY_TO_COMMENT = "REPLY_TO_COMMENT",
}

export type TaskPayload = Pick<
  ITask,
  "title" | "description" | "project_id" | "start_date"
>;

export type UpdateTaskStatusPayload = {
  id: string;
  status: Status;
};

export type UpdateTaskInfoPayload = Pick<
  ITask,
  "id" | "title" | "description" | "priority"
>;

export type CommentPayload =  Pick<ITask, "id"> & Omit<IComment, "commentId" | "children">;

export type SubTaskPayload =  Pick<ITask, "id"> & Pick<ISubTask, | "text">;

export type ReplyToCommentPayload = {
  taskId: string;
  commentId: string;
  text: string;
  creation_date: string;
}

export type UpdateSubTaskPayload = {
  taskId: string;
  subTaskId: string;
  status: SubTaskStatus;
}

export type DeleteSubTaskPayload = {
  taskId: string;
  subTaskId: string;
}

export type AddNewTask = {
  type: typeof TasksTypes.ADD_NEW_TASK;
  payload: TaskPayload;
};

export type DeleteTask = {
  type: typeof TasksTypes.DELETE_TASK;
  payload: string;
};

export type DeleteSubTask = {
  type: typeof TasksTypes.DELETE_SUBTASK;
  payload: DeleteSubTaskPayload;
};

export type UpdateTaskStatus = {
  type: typeof TasksTypes.UPDATE_TASK_STATUS;
  payload: UpdateTaskStatusPayload;
};

export type UpdateTaskInfo = {
  type: typeof TasksTypes.UPDATE_TASK_INFO;
  payload: UpdateTaskInfoPayload;
};

export type AddComment = {
  type: typeof TasksTypes.ADD_NEW_COMMENT;
  payload: CommentPayload;
}

export type ReplyToComment = {
  type: typeof TasksTypes.REPLY_TO_COMMENT;
  payload: ReplyToCommentPayload;
}

export type AddSubTask = {
  type: typeof TasksTypes.ADD_NEW_SUBTASK;
  payload: SubTaskPayload;
}

export type UpdateSubTaskStatus = {
  type: typeof TasksTypes.UPDATE_SUBTASK_STATUS;
  payload: UpdateSubTaskPayload;
};

export type TasksActions =
  | AddNewTask
  | DeleteTask
  | DeleteSubTask
  | UpdateTaskStatus
  | UpdateTaskInfo
  | UpdateSubTaskStatus
  | AddComment
  | AddSubTask
  | ReplyToComment
