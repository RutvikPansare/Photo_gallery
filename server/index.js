require('dotenv').config();
const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");
const http = require("http");
const app = express();
const server = http.createServer(app);
const axios = require('axios').default;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Please update the origin parameter with the client IP if different to prevent CORS error.
app.use(cors({
  origin: 'http://localhost:3000',
}))

//key to access Pexels API service
const key = process.env.KEY

//handles GET request from client
app.get("/api/curated/:page", async function (req, res) {
  const id = req.params.page;
  try {
    const response = await axios.get(`https://api.pexels.com/v1/curated/?page=${id}&per_page=10`, {
      headers: {
        Accept: "application/json",
        Authorization: key,
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || "Internal Server Error",
      },
    });
  }
});

//handles search GET request from client.
app.get("/api/search/", async function (req, res) {
  const search = req.query.query;
  const page = req.query.page;
  console.log(search)
  try {
    const response = await axios.get(`https://api.pexels.com/v1/search?query=${search}&page=${page}&per_page=10`, {
      headers: {
        Accept: "application/json",
        Authorization: key,
      },
    });
    res.send(response.data);
  } catch (error) {
    res.status(error.status || 500).send({
      error: {
        status: error.status || 500,
        message: error.message || "Internal Server Error",
      },
    });
  }
});

const port = 8000;
server.listen(port, () => console.log(`Server is up on port ${port}`));
