const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT_PUBLIC = process.env.PUBLIC_PORT;
const PORT_SERVER = process.env.PORT || 3000;
const PROTOCOL = process.env.PROTOCOL || "http";

module.exports = {
  publicRuntimeConfig: {
    API_URL: `${PROTOCOL}://${HOSTNAME}${
      PORT_PUBLIC ? `:${PORT_PUBLIC}` : ""
    }/api/db`
  },
  serverRuntimeConfig: {
    API_URL: `http://localhost${PORT_SERVER ? `:${PORT_SERVER}` : ""}/api/db`
  }
};
