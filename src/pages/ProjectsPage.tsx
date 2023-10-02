import Container from "../components/Container";
import { type IProject } from "../types/IProject";
import { NavLink } from "react-router-dom";
import Project from "../components/Project";
import React from "react";
import { connect } from "react-redux";
import { AppState } from "../core/reducers/rootReducer";

import "@/styles/projects-container.scss";
import AddProjectForm from "../components/AddProjectForm";

interface StateProps {
  projects: IProject[];
}

type Props = StateProps;

const ProjectsPage: React.FC<Props> = ({ projects }) => {
  return (
    <Container>
      <AddProjectForm />
      <div className="projects-container">
        {projects.map((project: IProject) => (
          <NavLink to={`/project/?id=${project.id}`} key={project.id}>
            <Project id={project.id} title={project.title} status={project.status} />
          </NavLink>
        ))}
      </div>
    </Container>
  );
};

const mapStateToProps = (state: AppState) => ({
  projects: state.projects.data,
});

export default connect(mapStateToProps, null)(ProjectsPage);
