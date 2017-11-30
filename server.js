var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

//Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 8080;

// Require Models
var db = require("./models");

// Set Up Express App for data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Static Directory
app.use(express.static("public"));

//=========
//var exphbs = require("express-handlebars");

app.use(bodyParser.urlencoded({
	extended: false
}));
// override with POST having ?_method=DELETE
//app.use(methodOverride("_method"));
//app.engine("handlebars", exphbs({
//    defaultLayout: "main"
//}));
//app.set("view engine", "handlebars");



//var routes = require("./controllers/burgers_controller.js");
//app.use("/", routes);
//=========

// Routes
// =============================================================
// require("./routes/api-routes.js")(app);

require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: true }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});