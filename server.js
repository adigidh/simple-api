const express = require("express");
const cors = require("cors");
const hpp = require("hpp");
const helmet = require("helmet");
const crypto = require("crypto");
const routes = require("./routes");
const Tok = require("csrf");
const tokens = new Tok();
// App

const app = express();
app.disable("x-powered-by");

// installs the hpp.js middleware which will protect the app from HTTP parameter pollution attacks.
app.use(hpp());
app.use(helmet());
app.use(cors());

// Generate a CSRF token
app.use((req, res, next) => {
  const csrfSecret = tokens.secretSync();
  res.cookie(crypto.randomUUID(), csrfSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });
  req.csrfToken = tokens.create(csrfSecret);
  next();
});

app.get("/api/csrf-token", (req, res) => {
  res.json({ csrfToken: req.csrfToken });
});

// Set port
const port = process.env.PORT || "3000";
app.set("port", port);

app.use("/", routes);

// Server
app.listen(port, () => console.log(`Server running on localhost:${port}`));
