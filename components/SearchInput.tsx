import React from "react";

interface Props
  extends React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    React.AriaAttributes {}

const SearchInput: React.FC<Props> = ({ ...attributes }) => {
  return <input type="text" {...attributes} />;
};

export default SearchInput;
