export interface ITask {
  id: string;
  project_id: string;
  title: string;
  description: string;
  start_date: Date;
  end_date: string;
  priority: Priority;
  files: File[];
  status: Status;
  sub_tasks: ISubTask[] 
  comments: IComment[];
}

export interface ISubTask {
  subTaskId: string;
  text: string;
  status: SubTaskStatus;
}

export interface IComment {
  commentId: string;
  text: string;
  creation_date: string;
  children: IComment[]
}

export type SubTaskStatus = "incompleted" | "completed"

export type Priority = "low" | "middle" | "high";

export type Status = "queue" | "development" | "done";