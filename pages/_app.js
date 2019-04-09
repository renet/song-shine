import App, { Container } from "next/app";
import getConfig from "next/config";
import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
import CssBaseline from "@material-ui/core/CssBaseline";
import JssProvider from "react-jss/lib/JssProvider";
import { Provider } from "react-redux";
import withReduxStore from "../lib/with-redux-store";
import getPageContext from "../lib/get-page-context";

class MyApp extends App {
  constructor() {
    super();
    this.pageContext = getPageContext();
  }

  async componentDidMount() {
    const jssStyles = document.querySelector("#jss-server-side");
    const { publicRuntimeConfig } = getConfig();
    const { API_URL } = publicRuntimeConfig;
    const { store } = this.props;

    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }

    store.subscribe(() => {
      const body = JSON.stringify(store.getState());

      fetch(`${API_URL}/save`, {
        body,
        headers: {
          "Content-Type": "application/json"
        },
        method: "PUT"
      });
    });
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <Container>
          <JssProvider
            registry={this.pageContext.sheetsRegistry}
            generateClassName={this.pageContext.generateClassName}
          >
            <MuiThemeProvider
              theme={this.pageContext.theme}
              sheetsManager={this.pageContext.sheetsManager}
            >
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              <Component pageContext={this.pageContext} {...pageProps} />
            </MuiThemeProvider>
          </JssProvider>
        </Container>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
