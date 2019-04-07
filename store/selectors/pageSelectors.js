import { createSelector } from "redux-starter-kit";

export const getTheme = createSelector(
  ["page.theme"],
  theme => theme
);
export const getSelectedId = createSelector(
  ["page.id"],
  id => id
);
