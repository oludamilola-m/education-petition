const express = require("express");
const app = express();
const handlebars = require("express-handlebars");
const PetitionController = require("./controllers/petition-controller");

// app.set("view engine", "handlebars");
// app.engine("handlebars", handlebars({ defaultLayout: "main" }));

app.set("view engine", "hbs");
app.engine("hbs", handlebars({ defaultLayout: "main", extname: ".hbs" }));

app.use(express.static("./public"));
app.use(
    express.urlencoded({
        extended: true,
    })
); // Allows us to access form data from post request in req.body

app.get("/", (req, res) => {
    res.redirect("/petition");
});

app.get("/petition", PetitionController.home);

app.post("/petition", PetitionController.createPetition);
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
