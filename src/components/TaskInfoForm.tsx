import { ITask, Priority } from "../types/ITask";
import React, { FormEvent } from "react";
import {
  deleteCurrentTask,
  updateTaskInfo,
} from "../core/actionCreators/tasksActionCreators";

import { Dispatch } from "redux";
import { checkInputsLength } from "../utils/checkInputsLength";
import { connect } from "react-redux";
import { convertDateToNormal } from "../utils/convertDateToNormal";
import useHandleFields from "../hooks/useHandleFields";

interface StateProps {
  task: ITask;
}

interface DispatchProps {
  deleteTask(id: string): void;
  updateTask(updatedTask: InfoForm): void;
}

type Props = StateProps & DispatchProps;

type InfoForm = Pick<ITask, "id" | "title" | "description" | "priority">;

const TaskInfoForm: React.FC<Props> = ({ task, deleteTask, updateTask }) => {
  const [fields, handleFieldChange] = useHandleFields<InfoForm>({
    id: task.id,
    title: task.title,
    description: task.description,
    priority: task.priority,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fields) return;

    updateTask(fields);
  };

  const handleDelete = (id: string) => {
    deleteTask(id);
  };

  let color: string = "";

  switch (task.status) {
    case "queue":
      color = "#CD5C5C";
      break;
    case "development":
      color = "#DE9A43";
      break;
    case "done":
      color = "#1D795F";
      break;
    default:
      color = "";
      break;
  }

  const priorities: Priority[] = ["low", "middle", "high"];

  const now = new Date(Date.now())
  const created = new Date(task.start_date)

  const result = now.getTime() - created.getTime()

  const workingTime = Math.floor(result / (1000 * 3600 * 24))

  return (
    <form action="submit" onSubmit={handleSubmit}>
      <div className="field">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          value={fields.title}
          onChange={handleFieldChange}
        />
      </div>

      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea
          name="description"
          value={fields.description}
          onChange={handleFieldChange}
        />
      </div>

      <div className="field">
        <label htmlFor="priority">Priority</label>
        <select name="priority" onChange={handleFieldChange}>
          <>
            <option value={fields.priority}>{fields.priority}</option>
            {priorities.map((priority, index) => (
              <option key={index} value={priority}>
                {priority}
              </option>
            ))}
          </>
        </select>
      </div>

      <div className="field">
        <span>Status</span>
        <div className="status" style={{ backgroundColor: color }}>
          {task.status.toUpperCase()}
        </div>
      </div>

      <div className="field">
        <span>Working time</span>
        <div className="working-time">{workingTime} days</div>
      </div>

      <div className="date">
        <p>Created: {convertDateToNormal(task.start_date)}</p>
        <p>Finished: {convertDateToNormal(task.end_date)}</p>
      </div>

      <div className="button-container">
        <button
          disabled={!checkInputsLength(fields)}
          className="button edit"
          type="submit"
        >
          Edit
        </button>
        <button
          className="button delete"
          type="button"
          onClick={() => handleDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </form>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  updateTask: (updatedTask: InfoForm) => dispatch(updateTaskInfo(updatedTask)),
  deleteTask: (id: string) => dispatch(deleteCurrentTask(id)),
});

export default connect(null, mapDispatchToProps)(TaskInfoForm);
