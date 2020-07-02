const express = require("express");
const mongoose = require("mongoose");
const app = express();
const bodyParser = require("body-parser");
const methodOverride = require("method-override");
const expressSanitizer = require("express-sanitizer");

//MONGOOSE SETUP
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/animal_app");
mongoose.set('useFindAndModify', false);

// APP CONFIG
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));

// MONGOOSE CONFIG
const animalSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date , default: Date.now}
});

const Animal = mongoose.model("Animal", animalSchema);

// ROOT ROUTE
app.get("/", (req, res) => {
    res.redirect("/animals");
});

// INDEX ROUTE
app.get("/animals", (req, res) => {
    Animal.find({}, (err, animals) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index",{animals:animals});
        }
    });
});

// NEW ROUTE
app.get("/animals/new", (req, res) => {
    res.render("new");
});

// CREATE ROUTE
app.post("/animals", (req, res) => {
    // create animal
    req.body.animal.body = req.sanitize(req.body.animal.body);
    Animal.create(req.body.animal,(err, newAnimal) => {
        if (err) {
            res.redirect("/animals/new");
        } else {
            res.redirect("/animals");
        }
    });
});

// SHOW ROUTE
app.get("/animals/:id", (req, res) => {
    Animal.findById(req.params.id, (err, oneAnimal) => {
        if (err) {
            res.redirect("/animals")
        } else {
            res.render("show",{animal: oneAnimal});
        }
    });
});

// EDIT ROUTE
app.get("/animals/:id/edit", (req, res) => {
    Animal.findById(req.params.id, (err, oneAnimal) => {
        if (err) {
            res.redirect("/animals");
        } else {
            res.render("edit", { animal: oneAnimal});
        }
    });
});

// UPDATE ROUTE
app.put("/animals/:id", (req, res) => {
    req.body.animal.body = req.sanitize(req.body.animal.body);
    Animal.findByIdAndUpdate(req.params.id, req.body.animal, (err, updatedAnimal) => {
        if (err) {
            res.redirect("/animals");
        } else {
            res.redirect("/animals/" + req.params.id);
        }
    });
});

// DESTROY ROUTE
app.delete("/animals/:id", (req,res) => {
    Animal.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/animal/" + req.params.id);
        } else {
            res.redirect("/animals");
        }
    });
});

// LISTEN TO PORT 3000
app.listen(3000, () => {
    console.log("Connected to AnimalApp!!");
});
