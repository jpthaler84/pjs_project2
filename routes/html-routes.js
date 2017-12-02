var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

app.get("/login", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/login.html"));
  });

app.get("/main", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/main.html"));
  });

app.get("/newthread", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/newthread.html"));
  });

app.get("/thread", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/thread.html"));
  });

app.get("/about", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/about.html"));
  });
app.get("/feedback", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/feedback.html"));
  });
app.get("/contact", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/contact.html"));
  });
};
