var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/layouts/login.html"));
  });

app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/layouts/login.html"));
  });

app.get("/main", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/layouts/main.html"));
  });

app.get("/newthread", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/layouts/newthread.html"));
  });

app.get("/thread", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/layouts/thread.html"));
  });

};
