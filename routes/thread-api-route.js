var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/thread/", function(req, res) {
    db.Thread.findAll({})
    .then(function(dbThread) {
      res.json(dbThread);
    });
  
  // Get route for returning posts of a specific category
  app.get("/api/thread/category/:category", function(req, res) {
    db.Thread.findAll({
      where: {
        category: req.params.category
      }
    })
    .then(function(dbThread) {
      res.json(dbThread);
    });
  });

  // Get rotue for retrieving a single thread
  app.get("/api/thread/:id", function(req, res) {
    db.Thread.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbThread) {
      res.json(dbThread);
    });
  });

  // POST route for saving a new thread
  app.thread("/api/thread", function(req, res) {
    console.log(req.body);
    db.Thread.create({
      title: req.body.title,
      body: req.body.body,
      category: req.body.category
    })
    .then(function(dbThread) {
      res.json(dbThread);
    });
  });

  // DELETE route for deleting threads
  app.delete("/api/thread/:id", function(req, res) {
    db.Thread.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(function(dbThread) {
      res.json(dbThread);
    });
  });

  // PUT route for updating threads
  app.put("/api/thread", function(req, res) {
    db.Thread.update(req.body,
      {
        where: {
          id: req.body.id
        }
        
      })
    .then(function(dbThread) {
      res.json(dbThread);
    });
  });
};