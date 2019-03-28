import { createReducer } from "redux-starter-kit";
import { setSongDetails, setSongText } from "../actions/songActions";

export default createReducer(
  {},
  {
    [setSongDetails]: (state, { payload }) => {
      const { title, artists, year } = payload;

      return { ...state, title, artists, year };
    },
    [setSongText]: (state, { payload }) => ({
      ...state,
      text: payload
    })
  }
);
