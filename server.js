const express = require("express");
const next = require("next");
const bodyParser = require("body-parser");
const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_DEV !== "production";
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();
const routes = require("./routes");

nextApp.prepare().then(() => {
  const app = express();

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use("/api/db", routes);

  app.get("/artist/:id/edit", (req, res) =>
    nextApp.render(req, res, "/edit-artist", { id: req.params.id })
  );

  app.get("/song/:id/edit", (req, res) =>
    nextApp.render(req, res, "/edit-song", { id: req.params.id })
  );

  app.get("*", (req, res) => {
    return handle(req, res);
  });

  app.listen(PORT, err => {
    if (err) throw err;
    console.log(`ready at http://localhost:${PORT}`);
  });
});
