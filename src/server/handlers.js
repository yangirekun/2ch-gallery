const axios = require("axios");
const path = require("path");
const rimraf = require("rimraf");
const fs = require("fs");

function handleHealthCheck(req, res) {
  res.status(200).send("OK");
}

async function handleBoardsFetch(req, res) {
  try {
    const {
      data: { boards }
    } = await axios(`http://2ch.hk/boards.json`);

    res.json(
      boards.map(board => ({
        id: board.id,
        label: board.name
      }))
    );
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

async function handleImagesFetch(req, res) {
  try {
    const {
      query: { boardID, threadID }
    } = req;
    const {
      data: { threads }
    } = await axios(`http://2ch.hk/${boardID}/res/${threadID}.json`);

    let images = [];

    threads[0].posts.reduce(
      (prev, current) =>
        current.files.map(file => {
          images.push({
            fileName: file.fullname,
            alt: file.displayname,
            path: `http://2ch.hk${file.path}`,
            preview: `http://2ch.hk${file.thumbnail}`,
            width: file.tn_width,
            height: file.tn_height
          });

          return null;
        }),
      undefined
    );

    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

async function handleDownloadImagesToServer(req, res) {
  try {
    const {
      body: { images }
    } = req;

    fs.mkdirSync(path.resolve(__dirname, "media", "images"));

    for (let image of images) {
      const { data } = await axios(image.path, { responseType: "stream" });
      const writer = fs.createWriteStream(path.resolve(__dirname, "media", "images", image.fileName));

      data.pipe(writer);
    }

    res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

async function handleRemoveImagesFromServer(req, res) {
  try {
    rimraf.sync(path.resolve(__dirname, "media", "images"));

    res.status(200).send("OK");
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

module.exports = {
  healthCheck: handleHealthCheck,
  boardsFetch: handleBoardsFetch,
  imagesFetch: handleImagesFetch,
  downloadImagesToServer: handleDownloadImagesToServer,
  removeImagesFromServer: handleRemoveImagesFromServer
};
