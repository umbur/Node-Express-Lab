// import your node modules

const db = require("./data/db.js");

const express = require("express");

const server = express();

// Returns an array of all the post objects contained in the database.

server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => res.status(200).json(posts))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    );
});

// Returns the post object with the specified id.

server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id;

  db.findById(id)
    .then(posts => {
      if (posts) {
        res.status(200).json(posts);
      } else {
      res.status(404).json({ error: "The post with the specified ID does not exist."});
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The post information could not be retrieved." })
    );
});

server.listen(4000, () => console.log("server running on porn 4000"));