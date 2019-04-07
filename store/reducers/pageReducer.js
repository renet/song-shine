import { createReducer } from "redux-starter-kit";
import {
  setPageLoading,
  setSelectedId,
  setTheme
} from "../actions/pageActions";

export default createReducer(
  {
    theme: "light"
  },
  {
    [setTheme]: (state, { payload }) => ({
      ...state,
      theme: payload
    }),
    [setPageLoading]: (state, { payload }) => ({
      ...state,
      loading: !!payload
    }),
    [setSelectedId]: (state, { payload }) => ({
      ...state,
      id: payload
    })
  }
);
