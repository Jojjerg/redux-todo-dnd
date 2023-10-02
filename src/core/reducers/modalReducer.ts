import { ModalActions, ModalTypes } from "../actionTypes/modalActionTypes";

interface ModalState {
  modal: {
    add: boolean;
    edit: boolean;
  };
}

const initialState: ModalState = {
  modal: {
    add: false,
    edit: false,
  },
};

const modalReducer = (
  state = initialState,
  action: ModalActions
): ModalState => {
  switch (action.type) {
    case ModalTypes.SET_ADD_MODAL_OPEN:
      return {
        ...state,
        modal: {
          add: true,
          edit: false,
        },
      };
    case ModalTypes.SET_EDIT_MODAL_OPEN:
      return {
        ...state,
        modal: {
          add: false,
          edit: true,
        },
      };
    case ModalTypes.SET_MODAL_CLOSE:
      return {
        ...state,
        modal: {
          add: false,
          edit: false
        },
      };
    default:
      return state;
  }
};

export default modalReducer;
