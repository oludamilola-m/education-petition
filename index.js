const express = require("express");
const app = express();
const handlebars = require("express-handlebars");

// app.set("view engine", "handlebars");
// app.engine("handlebars", handlebars({ defaultLayout: "main" }));

app.set("view engine", "hbs");
app.engine("hbs", handlebars({ defaultLayout: "main", extname: ".hbs" }));

app.use(express.static("./public"));

app.get("/", (req, res) => {
  res.redirect("/petition");
});

app.get("/petition", (req, res) => {
  res.render("petition");
});
// app.get("/cities", (req, res) => {
//   db.getActors()
//     .then(({ rows }) => {
//       console.log("data:", rows);
//     })
//     .catch((err) => {
//       console.log("err in getActors: ", err);
//     });
// });

// app.post("/add-city", (req, res) => {
//   db.addCity("Quito", "Ecuador", 100000)
//     .then(() => {
//       console.log("successful");
//     })
//     .catch((err) => {
//       console.log("err: ", err);
//     });
// });

app.listen(8080, () => console.log("petition server running"));
