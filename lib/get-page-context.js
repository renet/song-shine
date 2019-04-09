import { SheetsRegistry } from "jss";
import {
  createMuiTheme,
  createGenerateClassName
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  }
});

function createPageContext() {
  return {
    theme,
    sheetsManager: new Map(),
    sheetsRegistry: new SheetsRegistry(),
    generateClassName: createGenerateClassName()
  };
}

let pageContext;

export default function getPageContext() {
  if (!process.browser) {
    return createPageContext();
  }

  if (!pageContext) {
    pageContext = createPageContext();
  }

  return pageContext;
}
