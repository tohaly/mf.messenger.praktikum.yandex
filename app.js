const spdy = require("spdy");
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

const PORT = 4000;

app.use(express.static("./dist"));
app.listen(PORT, function () {
  console.log("\x1b[32m%s\x1b[0m", `Server working on port ${PORT}.`);
});
