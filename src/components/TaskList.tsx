import { ITask, Status } from "../types/ITask";

import { Dispatch } from "redux";
import React from "react";
import Task from "./Task";
import TaskStatusHeader from "./TaskStatusHeader";
import { connect } from "react-redux";
import { updateTaskStatus } from "../core/actionCreators/tasksActionCreators";
import { useDrop } from "react-dnd";

interface StateProps {
  queue: ITask[];
  development: ITask[];
  done: ITask[];

  status: Status;
}

interface DispatchProps {
  updateStatus(id: string, status: Status): void;
}

type Props = StateProps & DispatchProps;

const TaskList: React.FC<Props> = ({ ...props }) => {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "task",
    drop: (item: ITask) => addItemToSection(item.id),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const addItemToSection = (id: string) => {
    props.updateStatus(id, props.status);
  };

  let tasksToMap: ITask[] = [];

  switch (props.status) {
    case "queue":
      tasksToMap = props.queue;
      break;
    case "development":
      tasksToMap = props.development;
      break;
    case "done":
      tasksToMap = props.done;
      break;
    default:
      tasksToMap = [];
      break;
  }

  return (
    <div
      ref={drop}
      style={{ background: isOver ? "#4d5254" : "" }}
      className="task-list-container"
    >
      <TaskStatusHeader status={props.status} />
      {tasksToMap.length > 0 &&
        tasksToMap.map((task) => <Task key={task.id} task={task} />)}
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateStatus: (id: string, status: Status) =>
    dispatch(updateTaskStatus({ id, status })),
});

export default connect(null, mapDispatchToProps)(TaskList);
