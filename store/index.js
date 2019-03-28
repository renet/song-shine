import { configureStore } from "redux-starter-kit";
import rootReducer from "../store/reducers";

export default configureStore({
  reducer: rootReducer
});
