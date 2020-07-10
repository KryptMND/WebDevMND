const express       = require("express");
const router        = express.Router({mergeParams: true});
const Campground    = require("../models/campground");
const Comment       = require("../models/comment");

// NEW _ show form to create comments
router.get("/new", isLoggedIn,(req, res) => {
    Campground.findById(req.params.id,(err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new",{campground: campground});
        }
    });
});

// CREATE - create new comment
router.post("/",isLoggedIn ,(req, res) => {
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

//middleware
function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

module.exports = router;