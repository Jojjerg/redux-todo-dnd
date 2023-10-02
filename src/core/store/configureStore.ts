import rootReducer, { AppState } from "../reducers/rootReducer";

import { createStore } from "redux";

function saveToLocalStorage(state: AppState) {
  try {
    const serialisedState = JSON.stringify(state);
    localStorage.setItem("persistantState", serialisedState);
  } catch (e) {
    console.warn(e);
  }
}

function loadFromLocalStorage() {
  try {
    const serialisedState = localStorage.getItem("persistantState");
    if (serialisedState === null) return undefined;
    return JSON.parse(serialisedState);
  } catch (e) {
    console.warn(e);
    return undefined;
  }
}

const configureStore = () => {
  const store = createStore(
    rootReducer,
    loadFromLocalStorage()
  );
  store.subscribe(() => saveToLocalStorage(store.getState()));
  return store;
};

export default configureStore;
