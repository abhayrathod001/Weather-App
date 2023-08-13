const express = require("express");
const https = require("https");

const bodyParser = require("body-parser");






const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get( "/" , function(req , res){

    res.sendFile(__dirname + "/index.html");

   

    
});


app.post("/" , function(req , res){



    console.log(req.body.cityName);

     var city = req.body.cityName;

    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid=e87071e5774eccfbfe57e06f99bf1599&units=metric";
    




    https.get( url , function(response){
       
        // console.log(response.statusCode);

        

        response.on("data" , function(data){

            const weatherData = JSON.parse(data);
            console.log(weatherData);
            
            const temp = weatherData.main.temp;
            
            const desc = weatherData.weather[0].description;

            const icon = weatherData.weather[0].icon;
            
            const imageURL = " https://openweathermap.org/img/wn/"+icon+"@2x.png";
            
            console.log(temp);
            console.log(desc);
            

            res.write("<h1>the temp in "+ city+" is " + temp + " celcius</h1>");
            
            res.write("<img src=" + imageURL +">");

            res.send();
     
            

        })


    })
    


   
 

 });




app.listen(3000 , function(){
    console.log("LIVE at port 3000");
} );