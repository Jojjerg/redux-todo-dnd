import "@/styles/subtask.scss";

import { ISubTask, ITask } from "../types/ITask";
import React, { FormEvent } from "react";

import { Dispatch } from "redux";
import SubTask from "./SubTask";
import { addNewSubTask } from "../core/actionCreators/tasksActionCreators";
import { connect } from "react-redux";
import useHandleFields from "../hooks/useHandleFields";

interface StateProps {
  id: string;
  subTasks: ISubTask[];
}

interface DispatchProps {
  addSubTask(subTask: SubTaskForm): void;
}

type SubTaskForm = Pick<ITask, "id"> & Pick<ISubTask, "text">;

type Props = StateProps & DispatchProps;

const SubTasksContainer: React.FC<Props> = ({ id, subTasks, addSubTask }) => {
  const [fields, handleFieldChange] = useHandleFields<SubTaskForm>({
    id: id,
    text: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fields) return;

    addSubTask(fields);
  };

  return (
    <div className="form-subtasks-container">
      <form
        className="add-subtasks-form"
        action="submit"
        onSubmit={handleSubmit}
      >
        <input
          name="text"
          placeholder="Type subtask"
          type="text"
          value={fields.text}
          onChange={handleFieldChange}
        />
        <button
          className="add-btn"
          disabled={!fields.text.length}
          type="submit"
        >
          Create subtask
        </button>
      </form>
      <div className="subtasks-container">
        {subTasks.length > 0 &&
          subTasks.map((subTask) => <SubTask key={subTask.subTaskId} taskId={id} subTask={subTask} />)}
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addSubTask: (subTask: SubTaskForm) => dispatch(addNewSubTask(subTask)),
});

export default connect(null, mapDispatchToProps)(SubTasksContainer);
