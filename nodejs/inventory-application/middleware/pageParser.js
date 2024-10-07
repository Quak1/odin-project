const handlePage = (req, res, next) => {
  const page = req.query.page;

  if (!page || page == 0) req.query.page = 1;
  else if (parseInt(page) == page && page > 0) req.query.page = Number(page);
  else throw Error("page must be a positive integer");

  next();
};

module.exports = handlePage;
