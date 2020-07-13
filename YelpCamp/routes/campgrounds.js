const express    = require("express");
const router     = express.Router();
const Campground = require("../models/campground");

// INDEX - show all campgrounds
router.get("/", (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("campgrounds/index", {campgrounds: campgrounds});
        }
    })
});
// CREATE - create new campgrounds
router.post("/",isLoggedIn,(req, res) => {
    // Get data from form and save to campgrounds array
    let name = req.body.name;
    let image = req.body.image;
    let description = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCampgrounds = {name:name, image:image, description:description, author: author}
    // Create a new Campground and save to DB
    Campground.create(newCampgrounds, (err, newlyCreated) => {
        if (err){
            console.log(err);
        } else {
            console.log(newlyCreated);
            res.redirect("/campgrounds");
        }
    })
});
// NEW - show form to create new campground 
router.get("/new", isLoggedIn, (req, res) => {
    res.render("campgrounds/new")
});
//SHOW - show more info about one campground
router.get("/:id", (req, res) => {
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
// middleware
function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

module.exports = router;