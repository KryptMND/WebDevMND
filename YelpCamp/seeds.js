const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

data = [
    {
        name: "Cloud's Rest",
        image: "https://images.pexels.com/photos/2603681/pexels-photo-2603681.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Blah blah blah"
    },
    {
        name: "Desert Mesa",
        image: "https://images.pexels.com/photos/93858/pexels-photo-93858.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Blah blah blah"
    },
    {
        name: "Canyon Floor",
        image: "https://images.pexels.com/photos/3175294/pexels-photo-3175294.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Blah blah blah"
    },  
    {
        name: "Floofster Mountain",
        image: "https://images.pexels.com/photos/2666598/pexels-photo-2666598.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Blah blah blah"
    }  
]

function seedDB() {
    // Remove all campgrounds
    Campground.deleteMany({}, (err) => {
        if (err) {
            console.log(err);
        }
        console.log("removed campgrounds!");
        // add a few campgrounds
        data.forEach(seed => {
            Campground.create(seed, (err , campground) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("campground added");
                    // create comment
                    Comment.create(
                        {
                            text: "This place is great but i wish there was internet",
                            author: "Homer"
                        }, (err, comment) => {
                            if (err) {
                                console.log(err);
                            } else {
                                campground.comments.push(comment);
                                campground.save();
                                console.log("New Comment Created!");
                            }
                        }
                    );
                }
            });
        });
    });
}

module.exports = seedDB;