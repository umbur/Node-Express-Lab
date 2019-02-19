// import your node modules

const db = require("./data/db.js");

const express = require("express");

const server = express();

server.use(express.json());

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

// Creates a post using the information sent inside the request body.

server.post("/api/posts", (req, res) => {
    const postInfo = req.body;
  
    if (!postInfo.title || !postInfo.contents) {
      return res
        .status(400)
        .json({
          errorMessage: "Please provide title and contents for the post."
        });
    }
  
    db.insert(postInfo).then(result => {
      db.findById(result.id)
        .then(post => {
          res.status(201).json(post);
        })
        .catch(err =>
          res
            .status(500)
            .jason({
              error: "There was an error while saving the post to the database"
            })
        );
    });
  });

  // Removes the post with the specified id and returns the deleted post object. 

server.delete('/api/posts/:id', (req, res) => {
    const postId = req.params.id;

    db.findById(postId)
    .then(post => {
        if (!post){
            return res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." })
        } else {
            db.remove(postId)
            .then(count  => {
                res.status(200).json(post);
            })
            .catch(err => {
                res.status(500).json({ error: "The post could not be removed" })
            })
        }
    })

})
       



server.listen(4000, () => console.log("server running on porn 4000"));