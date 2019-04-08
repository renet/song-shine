import { combineReducers } from "redux";
import page from "./pageReducer";
import music from "./musicReducer";

export default combineReducers({
  page,
  music
});
