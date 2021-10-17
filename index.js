const express = require("express");
const app = express();
const port = 8080;
const endpoint = "https://neelpatel05.pythonanywhere.com/";
const axios = require("axios");

app.get("/", (req, res) => {
  axios
    .get(endpoint)
    .then((data) => {
      const els = data.data;
      const dates = els.map((el) => {
        return Object.assign(
          {},
          {
            name: el.name,
            year: el.yearDiscovered
          }
        );
      });
      dates.sort((a, b) => {
        if (isNaN(a.year)) {
          a.year = 0;
        }
        return a.year - b.year;
      });
      dates.map((el) => {
        return res.write(`<div> ${el.name} - ${el.year} </div>`);
      });
    })
    .catch((err) => console.log(err));
});

app.listen(port, () => {
  console.log("listen to port 8080");
});
