const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<H2>Hello docker..</H2>");
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Listen on port " + port));
