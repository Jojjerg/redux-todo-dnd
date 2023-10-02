import { ISubTask, SubTaskStatus } from "../types/ITask";
import { MdDelete, MdOutlineError } from "react-icons/md";
import React, { useEffect, useState } from "react";
import {
  deleteCurrentSubTask,
  updateSubTaskStatus,
} from "../core/actionCreators/tasksActionCreators";

import { AiFillCheckCircle } from "react-icons/ai";
import { Dispatch } from "redux";
import { RxCrossCircled } from "react-icons/rx";
import { connect } from "react-redux";

interface StateProps {
  taskId: string;
  subTask: ISubTask;
}

interface DispatchProps {
  updateStatus(subTask: SubTaskUpdatePayload): void;
  deleteSubTask(subTask: SubTaskDeletePayload): void;
}

type Props = StateProps & DispatchProps;

type SubTaskUpdatePayload = {
  taskId: string;
  subTaskId: string;
  status: SubTaskStatus;
};

type SubTaskDeletePayload = {
  taskId: string;
  subTaskId: string;
};

const SubTask: React.FC<Props> = ({
  taskId,
  subTask,
  updateStatus,
  deleteSubTask,
}) => {
  const checkStatus = (status: SubTaskStatus) =>
    status === "incompleted" ? "completed" : "incompleted";

  const [updateFields, setUpdateFields] = useState<SubTaskUpdatePayload>({
    taskId: taskId,
    subTaskId: subTask.subTaskId,
    status: checkStatus(subTask.status),
  });

  const [deleteFields] = useState<SubTaskDeletePayload>({
    taskId: taskId,
    subTaskId: subTask.subTaskId,
  });

  const handleIsDone = () => {
    updateStatus(updateFields);
  };

  const handleDelete = () => {
    deleteSubTask(deleteFields);
  };

  useEffect(() => {
    setUpdateFields({
      ...updateFields,
      status: checkStatus(subTask.status),
    });
  }, [subTask.status]);

  return (
    <div className="subtask">
      <div className="info">
        <div className="status">
          {subTask.status === "completed" ? (
            <i style={{ color: "#1D795F" }}>
              <AiFillCheckCircle />
            </i>
          ) : (
            <i style={{ color: "#D64A4A" }}>
              <MdOutlineError />
            </i>
          )}
        </div>
        <div className="text">
          <p>{subTask.text}</p>
        </div>
      </div>
      <div className="actions">
        <button onClick={handleIsDone} className="action-button">
          {subTask.status === "incompleted" ? (
            <i style={{ color: "#1D795F" }}>
              <AiFillCheckCircle />
            </i>
          ) : (
            <i style={{ color: "#D64A4A" }}>
              <RxCrossCircled />
            </i>
          )}
        </button>
        <button onClick={handleDelete} className="action-button">
          <i style={{ color: "#D64A4A" }}>
            <MdDelete />
          </i>
        </button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateStatus: (subTask: SubTaskUpdatePayload) =>
    dispatch(updateSubTaskStatus(subTask)),
  deleteSubTask: (subTask: SubTaskDeletePayload) =>
    dispatch(deleteCurrentSubTask(subTask)),
});

export default connect(null, mapDispatchToProps)(SubTask);
