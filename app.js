const express = require ("express");
const app = express();
const bodyParser =  require("body-parser")
const https = require("https");     
app.get("/", function (req, res){
    res.sendFile(__dirname + "/index.html");
             
})
app.use (bodyParser.urlencoded({extended:true}))
app.post ("/",function(req, res){
    console.log(req.body.cityName)
    console.log("post request recived");
    const appid = "4b4bee3462c6fefc36ecc4c174b5a9ba"
    const country = req.body.cityName
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?appid="+appid+"&q="+country+"&units="+units
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data)
            console.log(weatherData);
            const temp = weatherData.main.temp
            const feels = weatherData.main.feels_like
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon +"@2x.png"
            
            console.log("icon id " + icon);
            console.log("description: " + weatherDescription + " temp: " + temp + " feels: " + feels);
            res.write("<p>este es el periodico del weatherCast en la ciudad de Cordoba</p>");
            res.write("<h1>La descripcion del clima en " +req.body.cityName +" es "+ weatherDescription + " y la temperatura es " + temp + " y la sensacion termica es " + feels + "</h1>")
            res.write("<img src=" + imgURL +">")
            res.send();
            
        }) 
    })



})




app.listen (3004, function (){

    console.log ("server running on port 3004")
})

