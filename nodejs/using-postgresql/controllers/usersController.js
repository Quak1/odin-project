exports.usersGet = (req, res) => {
  console.log("usernames will be logged here - wip");
  res.send("usernames");
};

exports.usersNewGet = (req, res) => {
  console.log("new username form will be shown");
  res.send("username form");
};

exports.usersNewPost = (req, res) => {
  console.log("username to be saved: ", req.body.username);
};
