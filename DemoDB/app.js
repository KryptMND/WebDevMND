const mongoose = require("mongoose");
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.connect("mongodb://localhost/cat_app");

const catSchema = new mongoose.Schema({
    name: String,
    age: Number,
    temperament: String
});

const Cat = mongoose.model("Cat", catSchema);

// let george = new Cat({
//     name: "Mrs. Norris",
//     age: 7,
//     temperament: "Evil"
// });

// george.save((err, cat) => {
//     if(err){
//         console.log("Somthing went wrong!");
//     } else {
//         console.log("Cat just got saved");
//         console.log(cat);
//     }
// });


// Cat.create({
//     name: "Snow White",
//     age: 15,
//     temperament: "Bland"
// }, (err, cat) => {
//     if (err){
//         console.log(err);
//     } else {
//         console.log("Saved!")
//         console.log(cat);
//     }
// });

Cat.find({}, (err, cats) => {
    if(err){
        console.log("An Error apeart!!");
        console.log(err);
    } else {
        console.log("all cats are here:")
        console.log(cats)
    }
});