const fs = require("fs");
const https = require("https");
const express = require("express");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
const { authorize, authenticateToken } = require("./middlewears");

dotenv.config();
const app = express();

const options = {
  key: fs.readFileSync("server.key"),
  cert: fs.readFileSync("server.cert"),
  requestCert: true,
  rejectUnauthorized: false, // Set to true to enforce client certificate validation
  ca: [fs.readFileSync("server.cert")], // CA to validate client certificates
};

app.use(helmet());
app.use(morgan("combined"));
app.use(express.json());

// Login route to issue JWT token
app.post("/login", (req, res) => {
  const { username, role } = req.body;
  const user = { name: username, role: role };

  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET);
  res.json({ accessToken });
});

// Protected routes
app.get("/", authenticateToken, authorize(["admin", "user"]), (req, res) => {
  res.send("Hello, authenticated user!");
});

app.get("/admin", authenticateToken, authorize(["admin"]), (req, res) => {
  res.send("Hello, admin!");
});

app.get("/user", authenticateToken, authorize(["user"]), (req, res) => {
  res.send("Hello, user!");
});

// Create HTTPS server
https.createServer(options, app).listen(process.env.PORT || 3000, () => {
  console.log(
    `HTTPS server running at https://localhost:${process.env.PORT || 3000}/`
  );
});
