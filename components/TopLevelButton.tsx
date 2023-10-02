import React, { ReactNode } from "react";

interface Props
  extends React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    React.AriaAttributes {
  children: string | ReactNode;
}

const TopLevelButton: React.FC<Props> = ({ children, ...attributes }) => {
  return (
    <button type="button" {...attributes}>
      {children}
    </button>
  );
};

export default TopLevelButton;
