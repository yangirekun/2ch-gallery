const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const {
  healthCheck,
  boardsFetch,
  imagesFetch,
  downloadImagesToServer,
  removeImagesFromServer,
} = require("./handlers");

const app = express();

app.use(express.static(path.join(__dirname, "../../build")));
app.use(express.static(path.join(__dirname, "./media")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/health", healthCheck);
app.get("/api/boards", boardsFetch);
app.get("/api/images", imagesFetch);
app.get("/api/remove-images", removeImagesFromServer);

app.post("/api/download-images", downloadImagesToServer);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../build"));
});

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
const port = process.env.PORT || 4000;
app.listen(port);
