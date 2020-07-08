const mongoose = require("mongoose");
const Campground = require("./models/campground");
const Comment = require("./models/comment");

data = [
    {
        name: "Cloud's Rest",
        image: "https://images.pexels.com/photos/2603681/pexels-photo-2603681.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ligula neque, dapibus aliquet tincidunt ut, sollicitudin at leo. Pellentesque sit amet tincidunt mi. Phasellus vel viverra quam. In tincidunt finibus magna ac convallis. Ut vulputate mauris arcu, eget pretium neque lobortis interdum. Pellentesque ut mattis ex, quis bibendum quam. Praesent velit ante, euismod non lacus vel, eleifend pretium nibh. Nunc purus mauris, malesuada sit amet tellus id, sodales elementum ex. Mauris aliquet leo et arcu maximus, nec imperdiet justo pretium.Fusce ultricies elit justo, eu venenatis felis blandit sit amet. Nam sed vulputate lacus. Pellentesque facilisis, justo id congue ullamcorper, velit nibh vestibulum mi, sit amet commodo dui orci eu nisi. Aenean ac enim ut felis tempus convallis. Suspendisse facilisis urna id metus malesuada tincidunt. Nullam nec metus ac nulla sagittis ornare. Suspendisse potenti. Praesent suscipit augue vitae tincidunt egestas. Duis feugiat elementum sagittis. Vivamus vehicula nulla et neque fringilla."
    },
    {
        name: "Desert Mesa",
        image: "https://images.pexels.com/photos/93858/pexels-photo-93858.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ligula neque, dapibus aliquet tincidunt ut, sollicitudin at leo. Pellentesque sit amet tincidunt mi. Phasellus vel viverra quam. In tincidunt finibus magna ac convallis. Ut vulputate mauris arcu, eget pretium neque lobortis interdum. Pellentesque ut mattis ex, quis bibendum quam. Praesent velit ante, euismod non lacus vel, eleifend pretium nibh. Nunc purus mauris, malesuada sit amet tellus id, sodales elementum ex. Mauris aliquet leo et arcu maximus, nec imperdiet justo pretium.Fusce ultricies elit justo, eu venenatis felis blandit sit amet. Nam sed vulputate lacus. Pellentesque facilisis, justo id congue ullamcorper, velit nibh vestibulum mi, sit amet commodo dui orci eu nisi. Aenean ac enim ut felis tempus convallis. Suspendisse facilisis urna id metus malesuada tincidunt. Nullam nec metus ac nulla sagittis ornare. Suspendisse potenti. Praesent suscipit augue vitae tincidunt egestas. Duis feugiat elementum sagittis. Vivamus vehicula nulla et neque fringilla."
    },
    {
        name: "Canyon Floor",
        image: "https://images.pexels.com/photos/3175294/pexels-photo-3175294.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ligula neque, dapibus aliquet tincidunt ut, sollicitudin at leo. Pellentesque sit amet tincidunt mi. Phasellus vel viverra quam. In tincidunt finibus magna ac convallis. Ut vulputate mauris arcu, eget pretium neque lobortis interdum. Pellentesque ut mattis ex, quis bibendum quam. Praesent velit ante, euismod non lacus vel, eleifend pretium nibh. Nunc purus mauris, malesuada sit amet tellus id, sodales elementum ex. Mauris aliquet leo et arcu maximus, nec imperdiet justo pretium.Fusce ultricies elit justo, eu venenatis felis blandit sit amet. Nam sed vulputate lacus. Pellentesque facilisis, justo id congue ullamcorper, velit nibh vestibulum mi, sit amet commodo dui orci eu nisi. Aenean ac enim ut felis tempus convallis. Suspendisse facilisis urna id metus malesuada tincidunt. Nullam nec metus ac nulla sagittis ornare. Suspendisse potenti. Praesent suscipit augue vitae tincidunt egestas. Duis feugiat elementum sagittis. Vivamus vehicula nulla et neque fringilla."
    },  
    {
        name: "Floofster Mountain",
        image: "https://images.pexels.com/photos/2666598/pexels-photo-2666598.jpeg?auto=compress&cs=tinysrgb&h=350",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas ligula neque, dapibus aliquet tincidunt ut, sollicitudin at leo. Pellentesque sit amet tincidunt mi. Phasellus vel viverra quam. In tincidunt finibus magna ac convallis. Ut vulputate mauris arcu, eget pretium neque lobortis interdum. Pellentesque ut mattis ex, quis bibendum quam. Praesent velit ante, euismod non lacus vel, eleifend pretium nibh. Nunc purus mauris, malesuada sit amet tellus id, sodales elementum ex. Mauris aliquet leo et arcu maximus, nec imperdiet justo pretium.Fusce ultricies elit justo, eu venenatis felis blandit sit amet. Nam sed vulputate lacus. Pellentesque facilisis, justo id congue ullamcorper, velit nibh vestibulum mi, sit amet commodo dui orci eu nisi. Aenean ac enim ut felis tempus convallis. Suspendisse facilisis urna id metus malesuada tincidunt. Nullam nec metus ac nulla sagittis ornare. Suspendisse potenti. Praesent suscipit augue vitae tincidunt egestas. Duis feugiat elementum sagittis. Vivamus vehicula nulla et neque fringilla."
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