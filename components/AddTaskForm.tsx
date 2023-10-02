import "@/styles/add-task-form.scss";

import React, { FormEvent } from "react";

import { Dispatch } from "redux";
import { ITask } from "../types/ITask";
import { addNewTask } from "../core/actionCreators/tasksActionCreators";
import { checkInputsLength } from "../utils/checkInputsLength";
import { connect } from "react-redux";
import useHandleFields from "../hooks/useHandleFields";

interface StateProps {
  id: string;
}

interface DispatchProps {
  addTask(task: TaskForm): void;
}

type TaskForm = Pick<
  ITask,
  "title" | "project_id" | "description" | "start_date"
>;

type Props = StateProps & DispatchProps;

const AddTaskForm: React.FC<Props> = ({ id, addTask }) => {
  const date = new Date(Date.now())

  const [fields, handleFieldChange] = useHandleFields<TaskForm>({
    title: "",
    description: "",
    project_id: id,
    start_date: date,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fields) return;
    
    addTask(fields)
  };

  return (
    <form className="add-task-form" action="submit" onSubmit={handleSubmit}>
      <div className="add-input">
        <label htmlFor="title">Name</label>
        <input
          name="title"
          type="text"
          value={fields.title}
          onChange={handleFieldChange}
        />
      </div>

      <div className="add-input">
        <label htmlFor="description">Description</label>
        <input
          name="description"
          type="text"
          value={fields.description}
          onChange={handleFieldChange}
        />
      </div>

      <button
        disabled={!checkInputsLength(fields)}
        className="add-btn"
        type="submit"
      >
        Create
      </button>
    </form>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addTask: (task: TaskForm) => dispatch(addNewTask(task)),
});

export default connect(null, mapDispatchToProps)(AddTaskForm);
