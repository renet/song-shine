import App, { Container } from "next/app";
import getConfig from "next/config";
import { Provider } from "react-redux";
import store from "../store";
import { init } from "../store/actions";

const { publicRuntimeConfig } = getConfig();
const { API_URL } = publicRuntimeConfig;

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
      const response = await fetch(`${API_URL}/load`);
      const savedData = await response.json();

      console.log("Restoring saved data.");
      store.dispatch(init(savedData));
    } catch (error) {
      console.log("Error loading saved data. Using empty store instead.");
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
    const { Component, pageProps } = this.props;

    return (
      <Provider store={store}>
        <Container>
          <Component {...pageProps} />
        </Container>
      </Provider>
    );
  }
}
