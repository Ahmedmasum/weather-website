const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geoCode = require("./utils/geoCode");
const foreCast = require("./utils/foreCast");

const app = express();

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather ",
    name: "AhmedMasum",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "AhmedMasum",
  });
});

app.get("/contact", (req, res) => {
  res.render("help", {
    title: "contact",
    name: "AhmedMasum",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please provide a city name ",
    });
  }

  geoCode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      foreCast(latitude, longitude, (error, foreCastData) => {
        if (error) {
          return res.send({
            error,
          });
        }

        res.send({
          forecast: foreCastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

// app.get("/products", (req, res) => {
//   res.send({
//     products: [],
//   });
// });

app.get("/help/*", (req, res) => {
  res.render("notFound", {
    title: "404",
    name: "AhmedMasum",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("notFound", {
    title: "404",
    name: "AhmedMasum",
    errorMessage: "Page Not Found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000.");
});
