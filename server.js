const express = require("express");
const basicAuth = require("basic-auth");
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const { authorize, auth } = require("./middlewears");

dotenv.config();

const app = express();

app.use(helmet());
app.use(morgan("combined"));
app.use(auth);

app.get("/", authorize(["admin", "user"]), (req, res) => {
  res.send("Hello, authenticated user!");
});

app.get("/admin", authorize(["admin"]), (req, res) => {
  res.send("Hello, admin!");
});

app.get("/user", authorize(["user"]), (req, res) => {
  res.send("Hello, user!");
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
