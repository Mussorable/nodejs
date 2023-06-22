const express = require("express");

const bodyParses = require("body-parser");

const app = express();

app.use(bodyParses.urlencoded({ extended: false }));

app.use("/users", (req, res) => {
  console.log('Inside "/users" endopint');
  res.send(
    '<form action="/add-product" method="POST"><input type="text" name="title"><button type="submit">Submit</button></form>'
  );
});

app.use("/add-product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

app.use("/", (req, res, next) => {
  res.send("<h1>inside /</h1>");
});

app.listen(5173);
