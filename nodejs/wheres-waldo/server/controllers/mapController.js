const queries = require("../prisma/queries");

const getMaps = async (_, res) => {
  const maps = await queries.getMapsInfo();

  res.status(200).json(maps);
};

const getRandomChars = async (req, res) => {
  const mapId = req.params.id;
  const n = req.query.chars;

  const chars = await queries.getRandomCharacters(Number(mapId), Number(n));
  res.status(200).json(chars);
};

const checkTag = async (req, res) => {
  const { mapId, charId } = req.params;
  const { x, y } = req.query;

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
