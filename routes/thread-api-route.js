// Requiring Models
var db = require("../models");

// Routes
module.exports = function(app) {

    // GET route for getting all of the threads
    app.get("/api/threads", function(req, res) {
        db.Thread.findAll({}).then(function(dbThread) {
            res.json(dbThread);
        })
    });

// ***Depends on if we use categories***
    // Get route for returning threads of a specific category
    app.get("/api/threads/category/:category", function(req, res) {
        db.Thread.findAll({ category: req.params.category }).then(function(dbThread) {
            res.json(dbThread);
        })
    });

// ***Will be an on-click, I assume?***
    // Get route for retrieving a single thread
    app.get("/api/threads/:id", function(req, res) {
        db.Thread.findOne({
            where: {
                category: req.params.id
            }
        }).then(function(dbThread) {
            res.json(dbThread);
        })
    });

    // POST route for creating a new thread
    app.post("/api/threads", function(req, res) {
        db.Thread.create({
            title: req.body.title,
            body: req.body.body
            // ***Author?
        }).then(function(dbThread) {
            res.json(dbThread);
        })
    });

    // DELETE route for deleting threads
    app.delete("/api/threads/:id", function(req, res) {
        db.Thread.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbThread) {
            res.json(dbThread);
        })
    });

    // PUT route for updating threads
    app.put("/api/threads", function(req, res) {
        db.Thread.update(req.body,
            {
            where: {
                id: req.body.id
            },
        }).then(function(dbThread) {
            res.json(dbThread);
        })
    });
};