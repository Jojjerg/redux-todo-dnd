import "@/styles/container.scss";

import React, { ReactNode } from "react";

const Container = ({ children }: { children: ReactNode | ReactNode[] }) => {
  return <div className="container">{children}</div>;
};

export default Container;
