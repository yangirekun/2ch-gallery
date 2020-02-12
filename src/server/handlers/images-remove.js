const path = require("path");
const rimraf = require("rimraf");

async function handleRemoveImagesFromServer(req, res) {
  try {
    rimraf.sync(path.resolve(__dirname, "..", "media", "images"));

    res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

module.exports = handleRemoveImagesFromServer;
