const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/blog_demo");


// POST title,content
const postSchema = new mongoose.Schema({
    title: String,
    content: String
});
const Post = mongoose.model("Post", postSchema);

// USER - email,name
const userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
});
const User = mongoose.model("User", userSchema);


// let newUser = new User({
//     email: "hermine@hogwords.edu",
//     name: "Hermine Granger"
// });

// newUser.posts.push({
//     title: "How to brew polyjuice potion",
//     content:"Just kidding. Go to potions class to lern it!"
// })
// newUser.save((err, user) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(user);
//     }
// });

// const newPost = new Post ({
//     title: "Reflection on Apples",
//     content: "They are delicious"
// });

// newPost.save((err, post) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(post);
//     }
// });

// User.findOne({name: "Hermine Granger"}, (err, user) => {
//     if (err) {
//         //console.log(err);
//     } else {
//         user.posts.push({
//             title: "3 Things I really Hate",
//             content: "Voldemort, Voldemort. Voldemort!"
//         });
//         user.save((err, user) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 console.log(user);
//             }
//         });
//     }
// });