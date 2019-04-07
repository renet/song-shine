import { createReducer } from "redux-starter-kit";
import {
  setPageTitle,
  setPageType,
  setPageLoading,
  setSelectedId,
  setTheme,
  toggleSideMenu
} from "../actions/pageActions";

export default createReducer(
  {
    sidemenuOpen: false,
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
    }),
    [setSelectedId]: (state, { payload }) => ({
      ...state,
      id: payload
    }),
    [toggleSideMenu]: (state, { payload }) => ({
      ...state,
      sidemenuOpen: !!payload
    })
  }
);
