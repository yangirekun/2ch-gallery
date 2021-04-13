const axios = require("axios");
const path = require("path");
const fs = require("fs");

async function handleDownloadImagesToServer(req, res) {
  try {
    const {
      body: { images },
    } = req;

    fs.mkdirSync(path.resolve(__dirname, "..", "media", "images"));

    for (const image of images) {
      const { data } = await axios(image.path, { responseType: "stream" });
      const writer = fs.createWriteStream(
        path.resolve(__dirname, "..", "media", "images", image.fileName),
      );

      data.pipe(writer);
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

module.exports = handleDownloadImagesToServer;
