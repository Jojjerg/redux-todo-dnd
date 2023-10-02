export enum ModalTypes {
  SET_ADD_MODAL_OPEN = "SET_ADD_MODAL_OPEN",
  SET_EDIT_MODAL_OPEN = "SET_ADD_EDIT_OPEN",
  SET_MODAL_CLOSE = "SET_MODAL_CLOSE",
}

export type ModalAddOpen = {
  type: typeof ModalTypes.SET_ADD_MODAL_OPEN;
};

export type ModalEditOpen = {
  type: typeof ModalTypes.SET_EDIT_MODAL_OPEN;
};

export type ModalClose = {
  type: typeof ModalTypes.SET_MODAL_CLOSE;
};


export type ModalActions =
  | ModalAddOpen
  | ModalEditOpen
  | ModalClose;
