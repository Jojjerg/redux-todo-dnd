import "@/styles/task-section.scss";

import { ITask, Status } from "../types/ITask";
import React, { useMemo } from "react";

import TaskList from "./TaskList";

interface Props {
  tasks: ITask[];
};

const TaskSection: React.FC<Props> = ({ tasks }) => {
  const filteredByQueueStatus = useMemo(
    () => tasks.filter((task) => task.status === "queue"),
    [tasks]
  );
  const filteredByDevelopmentStatus = useMemo(
    () => tasks.filter((task) => task.status === "development"),
    [tasks]
  );
  const filteredByDoneStatus = useMemo(
    () => tasks.filter((task) => task.status === "done"),
    [tasks]
  );

  const statuses: Status[] = ["queue", "development", "done"];

  return (
    <div className="task-section">
      {statuses.map((status, index) => (
        <TaskList
          key={index}
          status={status}
          queue={filteredByQueueStatus}
          development={filteredByDevelopmentStatus}
          done={filteredByDoneStatus}
        />
      ))}
    </div>
  );
};

export default TaskSection;
