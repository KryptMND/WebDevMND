const express = require("express");
const app = express();
const request = require("request");

app.get("/results", function(req, res){
    request("http://www.omdbapi.com/?s=california&apikey=thewdb",(error, response, body) => {
        if(!error && response.statusCode == 200){
            const parsedData = JSON.parse(body);
            res.send(parsedData);
        }
    })
});

app.listen(3000, ()=> {
    console.log("Movie App is listining!!!")
});