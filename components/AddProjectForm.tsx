import "@/styles/add-project-form.scss";

import React, { FormEvent } from "react";

import { Dispatch } from "redux";
import { IProject } from "../types/IProject";
import { addNewProject } from "../core/actionCreators/projectsActionCreators";
import { connect } from "react-redux";
import useHandleFields from "../hooks/useHandleFields";

interface DispatchProps {
  addProject(text: string): void;
}

type ProjectForm = Pick<IProject, "title">;

const AddProjectForm: React.FC<DispatchProps> = ({ addProject }) => {
  const [fields, handleFieldChange] = useHandleFields<ProjectForm>({
    title: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!fields) return;

    addProject(fields.title);
  };

  return (
    <form className="add-project-form" action="submit" onSubmit={handleSubmit}>
      <input
        name="title"
        type="text"
        value={fields.title}
        placeholder="Enter project's name"
        onChange={handleFieldChange}
        autoFocus
      />
      <button disabled={!fields.title.length} className="add-btn" type="submit">
        Create
      </button>
    </form>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addProject: (text: string) => dispatch(addNewProject(text)),
});

export default connect(null, mapDispatchToProps)(AddProjectForm);
