function handleHealthCheck(req, res) {
  res.status(200).send("OK");
}

module.exports = handleHealthCheck;
