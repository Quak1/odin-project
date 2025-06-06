const { matchedData } = require("express-validator");

const queries = require("../prisma/queries");

const getMaps = async (_, res) => {
  const maps = await queries.getMapsInfo();

  res.status(200).json(maps);
};

const getRandomChars = async (req, res) => {
  const { mapId, n } = matchedData(req);

  const chars = await queries.getRandomCharacters(mapId, n);

  if (!chars.length) throw new Error();

  delete req.session.time;
  req.session.chars = chars.reduce(
    (obj, char) => ({ ...obj, [char.id]: false }),
    {},
  );
  req.session.mapId = mapId;
  req.session.start = new Date().getTime();

  res.status(200).json({ chars, start: req.session.start });
};

const checkTag = async (req, res) => {
  const { mapId, charId, x, y } = matchedData(req);
  const { chars } = req.session;

  if (!(charId in chars)) return res.status(200).json({ found: false });

  const tag = await queries.isTagValid(mapId, charId, x, y);

  if (tag) {
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

const getTopScores = async (req, res) => {
  const { mapId } = matchedData(req);

  const scores = await queries.getTopScores(mapId, 10);

  res.status(200).json(scores);
};

const recordScore = async (req, res) => {
  const { mapId, username } = matchedData(req);
  const { time } = req.session;

  if (!time) return res.sendStatus(400);

  const confirm = await queries.recordScore(mapId, username, time);

  req.session.destroy((err) => {
    res.status(200).json(confirm);
  });
};

module.exports = {
  getMaps,
  getRandomChars,
  checkTag,
  isDone,
  getTopScores,
  recordScore,
};
