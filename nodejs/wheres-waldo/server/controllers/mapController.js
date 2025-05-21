const { matchedData } = require("express-validator");

const queries = require("../prisma/queries");

const getMaps = async (_, res) => {
  const maps = await queries.getMapsInfo();

  res.status(200).json(maps);
};

const getRandomChars = async (req, res) => {
  const { mapId, n } = matchedData(req);

  const chars = await queries.getRandomCharacters(mapId, n);

  res.status(200).json(chars);
};

const checkTag = async (req, res) => {
  const { mapId, charId, x, y } = matchedData(req);

  const tag = await queries.isTagValid(mapId, charId, x, y);

  if (tag)
    res.status(200).json({
      ...tag,
      found: true,
    });
  else
    res.status(200).json({
      found: false,
    });
};

module.exports = {
  getMaps,
  getRandomChars,
  checkTag,
};
