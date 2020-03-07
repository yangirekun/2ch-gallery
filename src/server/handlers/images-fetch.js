const axios = require("axios");

async function handleImagesFetch(req, res) {
  try {
    const {
      query: { boardID, threadID },
    } = req;
    const {
      data: { threads },
    } = await axios(`http://2ch.hk/${boardID}/res/${threadID}.json`);

    const images = [];

    threads[0].posts.reduce(
      (prev, current) => current.files.map((file) => {
        images.push({
          fileName: file.fullname,
          alt: file.displayname,
          path: `http://2ch.hk${file.path}`,
          preview: `http://2ch.hk${file.thumbnail}`,
          width: file.tn_width,
          height: file.tn_height,
        });

        return null;
      }),
      undefined,
    );

    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
}

module.exports = handleImagesFetch;
