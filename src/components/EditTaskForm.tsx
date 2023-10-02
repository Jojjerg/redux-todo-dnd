import "@/styles/task-project-form.scss";

import CommentsContainer from "./CommentsContainer";
import { type ITask } from "../types/ITask";
import React from "react";
import SubTasksContainer from "./SubTasksContainer";
import TaskInfoForm from "./TaskInfoForm";

interface Props {
  task: ITask;
}

const EditTaskForm: React.FC<Props> = ({ task }) => {
  return (
    <div className="form">
      <TaskInfoForm task={task} />
      <SubTasksContainer id={task.id} subTasks={task.sub_tasks}/>
      <CommentsContainer id={task.id} comments={task.comments}/>
    </div>
  );
};

export default EditTaskForm;
