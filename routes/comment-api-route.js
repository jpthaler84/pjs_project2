// Requiring Models
var db = require("../models");

// Routes
module.exports = function(app) {

// ***I don't think we'd need a route for getting ALL comments or even getting all comments for a specific thread. 
// We'd just need to navigate to a specific thread and all comments will be there***
    // GET route for getting all of the comments
    // app.get("/api/threads", function(req, res) {
    //     db.Comment.findAll({}).then(function(dbComment) {
    //         res.json(dbComment);
    //     })
    // });

// ***Same thing here. Just need route for specific thread***
    // Get route for returning threads of a specific category
    // app.get("/api/threads/category/:category", function(req, res) {
    //     db.Comment.findAll({ category: req.params.category }).then(function(dbComment) {
    //         res.json(dbComment);
    //     })
    // });

// ***Don't think we'll need this at all***
    // Get route for retrieving a single thread
    // app.get("/api/threads/:id", function(req, res) {
    //     db.Comment.findOne({
    //         where: {
    //             category: req.params.id
    //         }
    //     }).then(function(dbComment) {
    //         res.json(dbComment);
    //     })
    // });

    // POST route for creating a new comment
    app.post("/api/threads", function(req, res) {
        db.Comment.create({
            title: req.body.title,
            body: req.body.body
            // ***Author?
        }).then(function(dbComment) {
            res.json(dbComment);
        })
    });

    // DELETE route for deleting comments
    app.delete("/api/threads/:id", function(req, res) {
        db.Comment.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbComment) {
            res.json(dbComment);
        })
    });

    // PUT route for updating comments
    app.put("/api/threads", function(req, res) {
        db.Comment.update(req.body,
            {
            where: {
                id: req.body.id
            },
        }).then(function(dbComment) {
            res.json(dbComment);
        })
    });
};