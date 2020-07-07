const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/reference_demo");

const Post = require("./models/post");
const User = require("./models/user");



// Post.create({
//     title: "How to cook a burger Pt. 4",
//     content: "gggagagagggaagaggaggaga"
// }, (err, post) => {
//     User.findOne({email: "bob@gmail.com"}, (err, foundUser) => {
//         if (err) {
//             console.log(err);
//         } else {
//             foundUser.posts.push(post);
//             foundUser.save((err, data) => {
//                 if (err) {
//                     console.log(err);
//                 } else {
//                     console.log(data);
//                 }
//             });
//         }
//     });
// });


// User.create({
//     email: "bob@gmail.com",
//     name: "Bob Belcher"
// });

User.findOne({email: "bob@gmail.com"}).populate("posts").exec((err, user) => {
    if (err) {
        console.log(err);
    } else {
        console.log(user);
    }
});