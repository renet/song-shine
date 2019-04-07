import { createSelector } from "redux-starter-kit";

export const getPageTitle = createSelector(
  ["page.title"],
  title => title
);
export const getTheme = createSelector(
  ["page.theme"],
  theme => theme
);
export const getSelectedId = createSelector(
  ["page.id"],
  id => id
);
