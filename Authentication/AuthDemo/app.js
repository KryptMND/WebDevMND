const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const localStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
const User = require("./models/user");


mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/auth_demo_app");



const app = express();
app.set("view engine", "ejs");

app.use(require("express-session")({
    secret: "Rusty is the best and cutest dog in the world",
    resave: false,
    saveUninitialized: false
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({extended: true}));

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.get("/", (req, res) => {
    res.render("home");
});

app.get("/secret" ,isLoggedIn,(req, res) => {
    res.render("secret");
});

// AUTH ROUTES

// REGISTR ROUTE

// render register form
app.get("/register", (req, res) => {
    res.render("register");
});

// register logic
app.post("/register", (req, res) => {
    req.body.username
    req.body.password
    User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, ()=> {
            res.render("secret");
        });
    });
});

// LOGIN ROUTE
// render login form
app.get("/login", (req, res) => {
    res.render("login");
});
//login logic
app.post("/login",passport.authenticate("local", {
    successRedirect: "/secret",
    failureRedirect: "/login"
}),(req, res) => {
});

// logout route
app.get("/logout",(req, res) => {
    req.logout();
    res.redirect("/")
});

function isLoggedIn(req, res, next) {
    if(req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

app.listen(3000, () => {
    console.log("connected with authdemo!!!");
});