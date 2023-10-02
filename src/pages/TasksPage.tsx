import "@/styles/top-level-btns-container.scss";

import React, { ChangeEvent, useEffect, useState } from "react";

import Container from "../components/Container";
import { type ITask } from "../types/ITask";
import { NavLink } from "react-router-dom";

import { connect } from "react-redux";
import { AppState } from "../core/reducers/rootReducer";
import AddTaskForm from "../components/AddTaskForm";
import TaskSection from "../components/TaskSection";
import Modal from "../components/Modal";
import TopLevelButton from "../components/TopLevelButton";
import SearchInput from "../components/SearchInput";
import { useDebounce } from "../hooks/useDebounce";

interface StateProps {
  tasks: ITask[];
  id: string;
}

type Props = StateProps;

const TasksPage: React.FC<Props> = ({ tasks, id }) => {
  const [show, setShow] = useState<boolean>(false);
  const [projectTasks, setProjectTasks] = useState<ITask[]>([]);

  const [filter, setFilter] = useState("");

  const searchTasks = (filter: string) => {
    return filter
      ? projectTasks.filter((task) => task.title.includes(filter))
      : projectTasks;
  };

  const searchQuery = useDebounce(filter, 300)
  const searchedTasks = searchTasks(searchQuery);

  const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  useEffect(() => {
    if (!tasks.length) return;

    const filterProjectTasks = () => {
      const filteredByProjectId = tasks.filter((task) => task.project_id === id);
      setProjectTasks(filteredByProjectId);
    };
    filterProjectTasks();
  }, [tasks, id]);

  return (
    <>
      <div className="top-level-btns-container">
        <TopLevelButton
          className="call-modal-button top-level-button"
          onClick={() => setShow(true)}
        >
          <span>+</span>
        </TopLevelButton>
        <TopLevelButton className="back-to-projects top-level-button">
          <NavLink to="/">
            <span>&#10232;</span>
          </NavLink>
        </TopLevelButton>
      </div>
      <Container>
        <SearchInput
          placeholder="Enter task's name"
          onChange={(e) => searchHandler(e)}
        />
        {tasks.length ? <TaskSection tasks={searchedTasks} /> : null}
      </Container>
      {show && (
        <Modal close={setShow}>
          <AddTaskForm id={id} />
        </Modal>
      )}
    </>
  );
};

const mapStateToProps = (state: AppState) => ({
  tasks: state.tasks.data,
});

export default connect(mapStateToProps, null)(TasksPage);
