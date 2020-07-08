const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
// const User = require("./models/user");
const seedDB = require("./seeds");
const campground = require("./models/campground");


mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();


app.get("/", (req, res) => {
    res.render("landing");
});
// INDEX - show all campgrounds
app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    })
});
// CREATE - create new campgrounds
app.post("/campgrounds", (req, res) => {
    // Get data from form and save to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let newCampgrounds = {name:name, image:image, description:description}
    // Create a new Campground and save to DB
    Campground.create(newCampgrounds, (err, newlyCreated) => {
        if (err){
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
});
// NEW - show form to create new campground 
app.get("/campgrounds/new", (req, res) => {
    res.render("campground/new")
});
//SHOW - show more info about one campground
app.get("/campgrounds/:id", (req, res) => {
    // find the campground with provided id
    Campground.findById(req.params.id).populate("comments").exec((err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            // render show tamplete with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

//======================================================
//                  COMMENT ROUTES
//======================================================

// NEW _ show form to create comments
app.get("/campgrounds/:id/comments/new", (req, res) => {
    Campground.findById(req.params.id,(err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new",{campground: campground});
        }
    });
});

// CREATE - create new comment
app.post("/campgrounds/:id/comments", (req, res) => {
    // lookup  campground using ID
    Campground.findById(req.params.id, (err, campground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            // create Comment
            Comment.create(req.body.comment, (err, comment) => {
                if (err) {
                    console.log(err);
                } else {
                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

app.listen(3000, () => {
    console.log("The Yelp Camp Server has Started!");
});