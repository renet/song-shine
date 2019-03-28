import { createReducer } from "redux-starter-kit";
import {
  setPageTitle,
  setPageType,
  setPageLoading,
  setTheme
} from "../actions/pageActions";

export default createReducer(
  {
    title: "Welcome",
    theme: "light"
  },
  {
    [setTheme]: (state, { payload }) => ({
      ...state,
      theme: payload
    }),
    [setPageTitle]: (state, { payload }) => ({
      ...state,
      title: payload
    }),
    [setPageType]: (state, { payload }) => ({
      ...state,
      type: payload
    }),
    [setPageLoading]: (state, { payload }) => ({
      ...state,
      loading: !!payload
    })
  }
);
