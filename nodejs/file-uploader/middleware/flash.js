module.exports = function () {
  return function (req, res, next) {
    req.flash = flash;
    next();
  };
};

function flash(type, msg) {
  const messages = (this.session.flash ??= {});
  if (type && msg) {
    return (messages[type] ??= []).push(msg);
  } else if (type) {
    const typeMessages = messages[type] || [];
    delete messages[type];
    return typeMessages;
  } else {
    this.session.flash = {};
    return messages;
  }
}
