import { createAction } from "redux-starter-kit";

export const setPageTitle = createAction("page/title/set");
export const setPageType = createAction("page/type/set");
export const setPageLoading = createAction("page/loading/set");
export const setTheme = createAction("page/theme/set");
export const toggleSideMenu = createAction("page/sidemenu/toggle");
