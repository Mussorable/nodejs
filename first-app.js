const express = require("express");

const path = require("path");

const adminRoutes = require("./routes/admin");
const shopRouter = require("./routes/shop");

const bodyParses = require("body-parser");

const app = express();

// It allowing users to access public folder
app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParses.urlencoded({ extended: false }));
app.use("/admin", adminRoutes.routes);
app.use(shopRouter);

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "e404.html"));
});

app.listen(5173);
