import { ModalTypes } from "../actionTypes/modalActionTypes";

export const setModalAddOpen = () => ({
  type: ModalTypes.SET_ADD_MODAL_OPEN,
});

export const setModalEditOpen = () => ({
  type: ModalTypes.SET_EDIT_MODAL_OPEN,
});

export const setModalClose = () => ({
  type: ModalTypes.SET_MODAL_CLOSE,
});



