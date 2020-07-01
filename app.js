const express = require("express");

const app = express();
const PORT = 4000;

app.use(express.static("./static"));
app.listen(PORT, function () {
  console.log("\x1b[32m%s\x1b[0m", `Server working on port ${PORT}.`);
});
