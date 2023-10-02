export interface IProject {
  id: string;
  title: string;
  status: Status;
}

export type Status = "completed" | "incompleted";
