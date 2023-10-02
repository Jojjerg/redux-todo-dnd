import {
  CommentPayload,
  DeleteSubTaskPayload,
  ReplyToCommentPayload,
  SubTaskPayload,
  TaskPayload,
  TasksTypes,
  UpdateSubTaskPayload,
  UpdateTaskInfoPayload,
  UpdateTaskStatusPayload,
} from "../actionTypes/tasksActionTypes";

export const addNewTask = (payload: TaskPayload) => ({
  type: TasksTypes.ADD_NEW_TASK,
  payload,
});

export const deleteCurrentTask = (payload: string) => ({
  type: TasksTypes.DELETE_TASK,
  payload,
});

export const deleteCurrentSubTask = (payload: DeleteSubTaskPayload) => ({
  type: TasksTypes.DELETE_SUBTASK,
  payload,
});

export const updateTaskStatus = (payload: UpdateTaskStatusPayload) => ({
  type: TasksTypes.UPDATE_TASK_STATUS,
  payload,
});

export const updateTaskInfo = (payload: UpdateTaskInfoPayload) => ({
  type: TasksTypes.UPDATE_TASK_INFO,
  payload,
});

export const updateSubTaskStatus = (payload: UpdateSubTaskPayload) => ({
  type: TasksTypes.UPDATE_SUBTASK_STATUS,
  payload,
});

export const addNewComment = (payload: CommentPayload) => ({
  type: TasksTypes.ADD_NEW_COMMENT,
  payload,
});

export const replyToComment = (payload: ReplyToCommentPayload) => ({
  type: TasksTypes.REPLY_TO_COMMENT,
  payload,
});

export const addNewSubTask = (payload: SubTaskPayload) => ({
  type: TasksTypes.ADD_NEW_SUBTASK,
  payload,
});
