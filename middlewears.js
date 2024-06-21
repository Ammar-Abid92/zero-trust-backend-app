const { users } = require("./constants");

const auth = (req, res, next) => {
  const user = basicAuth(req);
  if (user && users[user.name] && users[user.name].password === user.pass) {
    req.role = users[user.name].role;
    return next();
  } else {
    res.set("WWW-Authenticate", 'Basic realm="example"');
    return res.status(401).send("Authentication required.");
  }
};

const authorize = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.role)) {
      return next();
    } else {
      return res.status(403).send("Forbidden");
    }
  };
};

module.exports = { auth, authorize };
