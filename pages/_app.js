import App, { Container } from "next/app";
import getConfig from "next/config";
import { Provider } from "react-redux";
import withReduxStore from "../lib/with-redux-store";

class MyApp extends App {
  async componentDidMount() {
    const { publicRuntimeConfig } = getConfig();
    const { API_URL } = publicRuntimeConfig;
    const { store } = this.props;

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
          <Component {...pageProps} />
        </Container>
      </Provider>
    );
  }
}

export default withReduxStore(MyApp);
