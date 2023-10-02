import React from "react";

const TaskStatusHeader = ({ status }: { status: string }) => {
  return (
    <div className="task-status-header">
      <h1>{status}</h1>
    </div>
  );
};

export default TaskStatusHeader;
