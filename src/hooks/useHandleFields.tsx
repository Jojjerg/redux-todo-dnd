import { ChangeEvent, ChangeEventHandler, useState } from "react";

const useHandleFields = <T extends {}>(initialState: T): [T, ChangeEventHandler] => {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setValues({
        ...fields,
        [event.target.name]: event.target.value,
      });
      return;
    },
  ];
};

export default useHandleFields
