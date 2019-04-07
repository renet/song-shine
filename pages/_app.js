import App, { Container } from "next/app";
import Head from "next/head";
import { connect, Provider } from "react-redux";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "styled-theming";
import store from "../store";
import { init } from "../store/actions";
import {
  getPageTitle,
  getSelectedId,
  getTheme
} from "../store/selectors/pageSelectors";

const backgroundColor = theme("mode", {
  light: "#fff",
  dark: "#000"
});

const GlobalStyle = createGlobalStyle`
    body {
      margin: 12px;
  
      @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');
      @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    }
  `;

const ThemeWrapper = ({ Component, pageId, pageProps, title, theme }) => (
  <ThemeProvider theme={{ mode: theme }}>
    <Container>
      <GlobalStyle />
      <Head>
        <title>{title}</title>
      </Head>
      <Component {...pageProps} key={pageId} />
    </Container>
  </ThemeProvider>
);
const ConnectedThemeWrapper = connect((state, props) => ({
  ...props,
  theme: getTheme(state),
  title: getPageTitle(state),
  pageId: getSelectedId(state)
}))(ThemeWrapper);

export default class extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  async componentDidMount() {
    try {
      const response = await fetch("http://localhost:3000/api/db/load");
      const savedData = await response.json();

      console.log("Restoring saved data.");
      store.dispatch(init(savedData));
    } catch (error) {
      console.log("Error loading saved data. Using empty store instead.");
    }

    store.subscribe(() => {
      const body = JSON.stringify(store.getState());

      fetch("http://localhost:3000/api/db/save", {
        body,
        headers: {
          "Content-Type": "application/json"
        },
        method: "PUT"
      });
    });
  }

  render() {
    return (
      <Provider store={store}>
        <ConnectedThemeWrapper {...this.props} />
      </Provider>
    );
  }
}
