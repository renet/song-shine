import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import initializeStore from "../store";

const isServer = typeof window === "undefined";

function getOrCreateStore(preloadedState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(preloadedState);
  }

  // Create store if unavailable on the client and set it on the window object
  if (!window.__NEXT_REDUX_STORE__) {
    window.__NEXT_REDUX_STORE__ = initializeStore(preloadedState);
  }
  return window.__NEXT_REDUX_STORE__;
}

export default App => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      const { serverRuntimeConfig } = getConfig();
      const { API_URL } = serverRuntimeConfig;
      let store;

      if (isServer) {
        try {
          const response = await fetch(`${API_URL}/load`);
          const savedData = await response.json();

          console.log("Restoring saved data.");
          store = getOrCreateStore(savedData);
        } catch (error) {
          console.log(error);
          console.log("Error loading saved data. Using empty store instead.");
          store = getOrCreateStore();
        }
      } else {
        store = getOrCreateStore();
      }

      appContext.ctx.store = store;

      let appProps = {};
      if (typeof App.getInitialProps === "function") {
        appProps = await App.getInitialProps(appContext);
      }

      return {
        ...appProps,
        preloadedState: store.getState()
      };
    }

    constructor(props) {
      super(props);
      this.store = getOrCreateStore(props.preloadedState);
    }

    render() {
      return <App {...this.props} store={this.store} />;
    }
  };
};
