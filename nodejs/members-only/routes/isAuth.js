module.exports.isAuth = (req, res, next) => {
  if (req.isAuthenticated()) {
    res.locals.user = req.user;
    next();
  } else res.redirect("/login");
};

module.exports.ensureNotAuth = (req, res, next) => {
  if (req.isAuthenticated()) res.redirect("/");
  else next();
};
