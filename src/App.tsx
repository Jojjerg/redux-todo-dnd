import React, { Suspense, lazy } from "react";
import { Route, Routes, useSearchParams } from "react-router-dom";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Wrapper from "./components/Wrapper";

const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const TasksPage = lazy(() => import("./pages/TasksPage"));

const App = () => {
  const [searchParams] = useSearchParams();

  const id = searchParams.get("id");

  return (
    <DndProvider backend={HTML5Backend}>
      <Wrapper>
        <Suspense fallback={<div>loading...</div>}>
          <Routes>
            <Route path="/" element={<ProjectsPage />} />
            <Route path={`/project`} element={<TasksPage id={id!} />} />
          </Routes>
        </Suspense>
      </Wrapper>
    </DndProvider>
  );
};

export default App;
