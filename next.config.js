const HOSTNAME = process.env.HOSTNAME || "localhost";
const PORT = process.env.PORT || 3000;
const PROTOCOL = process.env.PROTOCOL || "http";
const API_URL = `${PROTOCOL}://${HOSTNAME}:${PORT}/api/db`;

module.exports = {
  publicRuntimeConfig: {
    API_URL
  }
};
