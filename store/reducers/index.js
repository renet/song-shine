import { combineReducers } from "redux";
import page from "./pageReducer";
import music from "./musicReducer";
import { init } from "../actions";

const rootReducer = combineReducers({
  page,
  music
});

export default (state, action) => {
  const { payload, type } = action;

  if (type === init.type) {
    return payload;
  }

  return rootReducer(state, action);
};
