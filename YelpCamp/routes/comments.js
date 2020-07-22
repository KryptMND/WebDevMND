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
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();

                    campground.comments.push(comment);
                    campground.save();
                    res.redirect("/campgrounds/" + campground._id);
                }
            });
        }
    });
});

// EDIT - edit comment in campgrounds
router.get("/:comment_id/edit",checkCommentOwnership ,(req, res) => {
    Comment.findById(req.params.comment_id, (err, foundComment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});
        }
    });
});

// UPDATE - update logic
router.put("/:comment_id",checkCommentOwnership ,(req, res) => {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, (err, updatedComment) => {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DESTROY -  delete comment
router.delete("/:comment_id",checkCommentOwnership ,(req, res) => {
    Comment.findByIdAndRemove(req.params.comment_id, err => {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

function checkCommentOwnership(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, (err, foundComment) => {
            if (err) {
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    res.redirect("back");
                }
            } 
        });
    } else {
        res.redirect("back");
    }
}

//middleware
function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}

module.exports = router;