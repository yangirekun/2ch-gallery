const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const {
  healthCheck,
  boardsFetch,
  imagesFetch,
  downloadImagesToServer,
  removeImagesFromServer
} = require("./handlers");

const app = express();

app.use(express.static(path.join(__dirname, "../../build")));
app.use(express.static(path.join(__dirname, "./media")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/health", healthCheck);
app.get("/api/boards", boardsFetch);
app.get("/api/images", imagesFetch);
app.post("/api/download-images", downloadImagesToServer);
app.get("/api/remove-images", removeImagesFromServer);

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
app.listen(3000);
