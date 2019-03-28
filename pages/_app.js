import App, { Container } from "next/app";
import Head from "next/head";
import { Provider } from "react-redux";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import theme from "styled-theming";

const backgroundColor = theme("mode", {
  light: "#fff",
  dark: "#000"
});

const GlobalStyle = createGlobalStyle`
    body {
      background: ${backgroundColor};
  
      @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500');
      @import url('https://fonts.googleapis.com/icon?family=Material+Icons');
    }
  `;

class MyApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props;
    const { title } = pageProps;
    return (
      <ThemeProvider theme={{ mode: "light" }}>
        <Container>
          <GlobalStyle />
          <Head>
            <title>{title}</title>
          </Head>
          <Component {...pageProps} />
        </Container>
      </ThemeProvider>
    );
  }
}

export default MyApp;
