//env must top
require("dotenv").config();
//express
var bodyParser = require("body-parser");
const express = require("express");
const cors = require("cors");
var path = require("path");
var fs = require("fs");
var FroalaEditor = require("wysiwyg-editor-node-sdk/lib/froalaEditor.js");

const app = express();
const port = 4000;

const router = require("./src/routes");

app.use(express.json());

app.use(cors());

app.use(express.static(__dirname + "/"));

app.use(
	"/bower_components",
	express.static(path.join(__dirname, "../bower_components"))
);

app.use("/api/v1", router);
app.use("/uploads", express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/upload_image", function (req, res) {
	FroalaEditor.Image.upload(req, "/uploads/", function (err, data) {
		if (err) {
			//   console.log(err);
			return res.send(JSON.stringify(err));
		}
		console.log(data);
		res.send({
			link: "http://localhost:4000" + data.link,
		});
	});
});

app.post("/deleteImage", function (req, res) {
	console.log(req.body.src);

	// Do delete.
	FroalaEditor.Image.delete(req.body.src, function (err) {
		if (err) {
			return res.status(404).end(JSON.stringify(err));
		}

		return res.end("success");
	});
});

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});
