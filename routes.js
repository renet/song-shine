const express = require("express");
const lowdb = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
const router = express.Router();
const adapter = new FileSync("db.json");
const db = lowdb(adapter);

router.get("/load", (req, res) => {
  res.json(db.getState());
});

router.put("/save", (req, res) => {
  db.setState(req.body).write();
  res.json({ ok: true });
});

module.exports = router;
