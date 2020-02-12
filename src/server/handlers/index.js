const handleHealthCheck = require("./health-check");
const handleBoardsFetch = require("./boards-fetch");
const handleImagesFetch = require("./images-fetch");
const handleDownloadImagesToServer = require("./images-download");
const handleRemoveImagesFromServer = require("./images-remove");

module.exports = {
  healthCheck: handleHealthCheck,
  boardsFetch: handleBoardsFetch,
  imagesFetch: handleImagesFetch,
  downloadImagesToServer: handleDownloadImagesToServer,
  removeImagesFromServer: handleRemoveImagesFromServer
};
