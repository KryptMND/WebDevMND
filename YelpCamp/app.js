const express        = require("express");
const app            = express();
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const Campground     = require("./models/campground");
const Comment        = require("./models/comment");
const User           = require("./models/user");
const seedDB         = require("./seeds");
const passport       = require("passport");
const LocalStrategy  = require("passport-local");
const methodOverride = require("method-override");
const flash          = require("connect-flash");
// require routes
const commentRoutes    = require("./routes/comments");
const campgroundRoutes = require("./routes/campgrounds");
const authRoutes       = require("./routes/index"); 


mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/yelp_camp");


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB();

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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use(authRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments",commentRoutes);

app.listen(3000, () => {
    console.log("The Yelp Camp Server has Started!");
});