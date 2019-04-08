const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT;
const PROTOCOL = process.env.PROTOCOL || "http";
const API_URL = `${PROTOCOL}://${HOSTNAME}${PORT ? `:${PORT}` : ""}/api/db`;

module.exports = {
  publicRuntimeConfig: {
    API_URL
  }
};
