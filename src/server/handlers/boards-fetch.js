const axios = require("axios");

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

module.exports = handleBoardsFetch;
