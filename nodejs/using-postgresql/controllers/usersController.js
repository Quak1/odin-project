const db = require("../db/queries");

exports.usernamesGet = async (req, res) => {
  const { search } = req.query;
  let usernames = [];
  if (search) {
    usernames = await db.searchUsername(search);
  } else {
    usernames = await db.getAllUsernames();
  }

  console.log("Usernames:", usernames);
  res.send(
    "<a href='/new'>new</a>" +
      "Usernames: " +
      usernames.map((user) => user.username).join(", "),
  );
};

exports.usersNewGet = (req, res) => {
  res.render("createUsername");
};

exports.usersNewPost = async (req, res) => {
  const { username } = req.body;
  await db.insertUsername(username);
  res.redirect("/");
};
