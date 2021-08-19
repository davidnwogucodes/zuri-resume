const express = require("express");
const PORT = 4022;
const path = require("path");
const router = require("./router");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "./public")));
app.set("view engine", "ejs");

app.use("/", router);

app.use((err, req, res, next) => {
  if (err) {
    console.log(err.message);
  }
  process.on("SIGINT", () => {
    process.exit(0);
  });
});

app.listen(PORT, () => {
  console.log(`server listening at port:${PORT}`);
});
