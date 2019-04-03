import { combineReducers } from "redux";
import page from "./pageReducer";
import song from "./songReducer";
import { init } from "../actions";

const rootReducer = combineReducers({
  page,
  song
});

export default (state, action) => {
  const { payload, type } = action;

  if (type === init.type) {
    return payload;
  }

  return rootReducer(state, action);
};
