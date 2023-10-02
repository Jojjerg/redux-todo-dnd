import "@/styles/custom-div.scss";

import { Status, type IProject } from "../types/IProject";
import React, { MouseEvent } from "react";
import { Dispatch } from "redux";
import { updateProjectStatus } from "../core/actionCreators/projectsActionCreators";
import { connect } from "react-redux";

interface DispatchProps {
  updateStatus(id: string, status: Status): void;
};

type StateProps = IProject;

type Props = StateProps & DispatchProps;

const Project: React.FC<Props> = ({ id, title, status, updateStatus }) => {
  const checkStatus = (status: Status) =>
    status === "incompleted" ? "completed" : "incompleted";

  const handleIsDone = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newStatus = checkStatus(status);
    updateStatus(id, newStatus);
  };

  let action: string = "";

  switch (status) {
    case "incompleted":
      action = "Complete";
      break;
    case "completed":
      action = "Cancel";
      break;
    default:
      action = "";
      break;
  }

  return (
    <div
      className="custom-div"
      style={{ opacity: status === "completed" ? "0.9" : "1" }}
    >
      <h1>{title}</h1>
      <p className="project-status">{status}</p>
      <button
        style={{ background: status === "completed" ? "#cd5c5c" : ""}}
        data-status={status}
        className="change-status-button"
        onClick={handleIsDone}
      >
        {action}
      </button>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateStatus: (id: string, status: Status) =>
    dispatch(updateProjectStatus({ id, status })),
});

export default connect(null, mapDispatchToProps)(Project);
