const express    = require("express");
const router     = express.Router();
const Campground = require("../models/campground");
const middleware = require("../middleware");

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
router.post("/",middleware.isLoggedIn,(req, res) => {
    // Get data from form and save to campgrounds array
    let name = req.body.name;
    let price = req.body.price;
    let image = req.body.image;
    let description = req.body.description;
    let author = {
        id: req.user._id,
        username: req.user.username
    }
    let newCampgrounds = {name:name, price:price ,image:image, description:description, author: author}
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
router.get("/new", middleware.isLoggedIn, (req, res) => {
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

//EDIT - show update form 
router.get("/:id/edit",middleware.checkCampgroundOwnership ,(req, res) => {
    Campground.findById(req.params.id, (err, foundCampground) => {
        res.render("campgrounds/edit", {campground: foundCampground});
    });           
});
//UPDATE - update/edit logic
router.put("/:id",middleware.checkCampgroundOwnership ,(req, res) => {
    Campground.findByIdAndUpdate(req.params.id,req.body.campground, (err, editCampground) => {
        if (err) {
            console.log(err);
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY - delete campground
router.delete("/:id",middleware.checkCampgroundOwnership ,(req, res) => {
    Campground.findByIdAndRemove(req.params.id, (err) => {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    });
});


module.exports = router;