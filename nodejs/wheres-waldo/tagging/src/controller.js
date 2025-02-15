const { getAllMaps, saveTag, getMapTags } = require("./db");

async function getMaps(req, res) {
  const maps = await getAllMaps();
  res.json(maps);
}

async function getTags(req, res) {
  const { mapId } = req.params;
  const tags = await getMapTags(mapId);
  res.json(tags);
}

async function postTag(req, res) {
  const tag = req.body;
  const { mapId } = req.params;
  const newTag = await saveTag(tag, mapId);
  res.json(newTag[0]);
}

module.exports = {
  getMaps,
  getTags,
  postTag,
};
