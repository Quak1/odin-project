const { matchedData } = require("express-validator");

const queries = require("../prisma/queries");

const getMaps = async (_, res) => {
  const maps = await queries.getMapsInfo();

  res.status(200).json(maps);
};

const getRandomChars = async (req, res) => {
  const { mapId, n } = matchedData(req);

  const chars = await queries.getRandomCharacters(mapId, n);

  delete req.session.time;
  req.session.chars = chars.reduce(
    (obj, char) => ({ ...obj, [char.id]: false }),
    {},
  );
  req.session.mapId = mapId;
  req.session.start = new Date().getTime();

  res.status(200).json(chars);
};

const checkTag = async (req, res) => {
  const { mapId, charId, x, y } = matchedData(req);
  const { chars } = req.session;

  const tag = await queries.isTagValid(mapId, charId, x, y);

  if (tag && charId in chars) {
    req.session.chars[charId] = true;
    if (Object.values(chars).every((val) => val)) {
      req.session.time = new Date().getTime() - req.session.start;
    }
    res.status(200).json({
      ...tag,
      found: true,
    });
  } else
    res.status(200).json({
      found: false,
    });
};

const isDone = async (req, res) => {
  const { time } = req.session;

  if (time) {
    res.status(200).json({
      done: true,
      time,
    });
  } else {
    res.status(200).json({
      done: false,
    });
  }
};

module.exports = {
  getMaps,
  getRandomChars,
  checkTag,
  isDone,
};
