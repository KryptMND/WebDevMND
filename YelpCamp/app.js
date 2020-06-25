const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/yelp_camp");


const campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

const Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create(
    
//     {
//         name: "Granite Hill", 
//         image: "https://images.pexels.com/photos/776117/pexels-photo-776117.jpeg?auto=compress&cs=tinysrgb&h=350",
//         description: "This is a huge granite hill, no bathrooms. No Water. Beautiful granite!"

//     }, (err, campground) => {
//         if (err){
//             console.log(err);
//         } else {
//             console.log("New Campground added to Database!");
//             console.log(campground);
//         }
//     });

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    res.render("landing");
});
// INDEX - show all campgrounds
app.get("/campgrounds", (req, res) => {
    Campground.find({}, (err, campgrounds) => {
        if (err) {
            console.log(err);
        } else {
            res.render("index", {campgrounds: campgrounds});
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
    res.render("new")
});
//SHOW - show more info about one campground
app.get("/campgrounds/:id", (req, res) => {
    // find the campground with provided id
    Campground.findById(req.params.id, (err, foundCampground) => {
        if (err) {
            console.log(err);
        } else {
            // render show tamplete with that campground
            res.render("show", {campground: foundCampground});
        }
    });
});

app.listen(3000, () => {
    console.log("The Yelp Camp Server has Started!");
});