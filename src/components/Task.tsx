import React, { useState } from "react";

import { type ITask } from "../types/ITask";
import EditTaskForm from "./EditTaskForm";
import { AiOutlineComment } from "react-icons/ai";
import { BsListTask } from "react-icons/bs";

import "@/styles/custom-div.scss";
import Drag from "./Drag";
import Modal from "./Modal";
import { useDrag } from "react-dnd";
import { countCommentIds } from "../utils/countCommentIds";
import { convertDateToNormal } from "../utils/convertDateToNormal";

interface StateProps {
  task: ITask;
}

type Props = StateProps;

const Task: React.FC<Props> = ({ task }) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "task",
    item: { id: task.id },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  const commentsAmount = countCommentIds(task.comments);

  const [show, setShow] = useState(false);

  const handleOpenModal = () => {
    setShow(true);
  };

  let color: string = "";

  switch (task.priority) {
    case "high":
      color = "#cd5c5c";
      break;
    case "middle":
      color = "#de9a43";
      break;
    case "low":
      color = "#1d795f";
      break;
    default:
      color = "";
      break;
  }

  convertDateToNormal(task.start_date)

  return (
    <>
      <button
        ref={drag}
        style={{
          opacity: isDragging ? "0.25" : "1",
          background: `linear-gradient(145deg, #353839 70%, ${color} 150%)`,
        }}
        className="custom-div"
        onClick={handleOpenModal}
      >
        <div className="task-heading">
          <h1>{task.title}</h1>
          <Drag />
        </div>
        <p className="description">{task.description}</p>
        <div className="comments-subtasks">
          <div className="comments">
            <i>
              <AiOutlineComment />
            </i>
            <span>{Object.keys(commentsAmount).length}</span>
          </div>
          <div className="subtasks">
            <i>
              <BsListTask />
            </i>
            <span>{task.sub_tasks.length}</span>
          </div>
        </div>
        <div className="date">
          <p>Created: {convertDateToNormal(task.start_date)}</p>
          {/* <p>Finished: {convertDateToNormal(task.end_date)}</p> */}
        </div>
      </button>
      {show && (
        <Modal close={setShow}>
          <EditTaskForm task={task} />
        </Modal>
      )}
    </>
  );
};

export default Task;
