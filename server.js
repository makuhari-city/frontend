const path = require("path")
const express = require("express")
const app = new express()

// requests for static files in the "public" directory
// like JavaScript, CSS, images will be served
app.use(express.static("build", {root: __dirname}))

// Every other request will send the index.html file that
// contains your application
app.use("*", function(req, resp) {
	resp.sendFile("build/index.html", {root:__dirname})
})

app.listen("3000")
