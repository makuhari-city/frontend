const path = require("path");
const express = require("express");
const app = new express();

const port = "3000";

// requests for static files in the "public" directory
// like JavaScript, CSS, images will be served
app.use('/app', express.static("build", { root: __dirname }));

// Every other request will send the index.html file that
// contains your application
app.use("*", function (req, resp) {
  console.log("reqest incoming");
  resp.sendFile("build/index.html", { root: __dirname });
});

console.log(`starting server at port ${port}`);

app.listen(port);
