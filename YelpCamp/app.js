const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");
const User = require("./models/user");
const seedDB = require("./seeds");
const passport = require("passport");
const LocalStrategy = require("passport-local");


mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

// passport config
app.use(require("express-session")({
    secret: "Once again Rusty wins cutest dog!",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});


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
app.get("/campgrounds/:id/comments/new", isLoggedIn,(req, res) => {
    Campground.findById(req.params.id,(err, campground) => {
        if (err) {
            console.log(err);
        } else {
            res.render("comments/new",{campground: campground});
        }
    });
});

// CREATE - create new comment
app.post("/campgrounds/:id/comments",isLoggedIn ,(req, res) => {
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

//======================================================
//                  AUTH ROUTES
//======================================================

//show register form
app.get("/register", (req, res) => {
    res.render("register");
});

// sign up logic
app.post("/register", (req, res) => {
    const newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req ,res ,() => {
            res.redirect("/campgrounds");
        });
    } );
});

// show login form
app.get("/login", (req, res) => {
    res.render("login");
});

//login logic
app.post("/login",passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }) ,(req, res) => {  
});

// loqout route
app.get("/logout",(req, res) => {
    req.logout();
    res.redirect("/campgrounds");
});


// middleware

function isLoggedIn (req, res, next) {
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login")
}


app.listen(3000, () => {
    console.log("The Yelp Camp Server has Started!");
});