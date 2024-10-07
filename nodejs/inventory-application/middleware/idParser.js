const idParser = (req, res, next) => {
  const parsedId = parseInt(req.params.id, 10);

  if (Number.isNaN(parsedId) || parsedId < 0) {
    throw Error("id must be a positive number");
  }

  req.params.id = parsedId;
  next();
};

module.exports = idParser;
