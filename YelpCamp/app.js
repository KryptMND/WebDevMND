const express = require("express");
const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("landing");
});

app.get("/campgrounds", (req, res) => {
    let campgrounds = [
        {name: "Salmon Creek", image: "https://images.pexels.com/photos/6757/feet-morning-adventure-camping.jpg?auto=compress&cs=tinysrgb&h=350"},
        {name: "Granite Hill", image: "https://pixabay.com/get/55e8dc404f5aab14f1dc84609620367d1c3ed9e04e50744077287dd79145cd_340.jpg"},
        {name: "Mountain Goat's Rest", image: "https://images.pexels.com/photos/803226/pexels-photo-803226.jpeg?auto=compress&cs=tinysrgb&h=350"}
    ]

    res.render("campgrounds", {campgrounds: campgrounds});
})

app.listen(3000, () => {
    console.log("The Yelp Camp Server has Started!");
});