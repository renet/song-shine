import { combineReducers } from "redux";
import page from "./pageReducer";
import song from "./songReducer";

export default combineReducers({
  page,
  song
});
