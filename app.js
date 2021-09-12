const express = require("express");
const https = require("https")

const app = express();

app.use(express.urlencoded({extended: true}));

app.get("/", function (req, res) {
    const url = "https://api.openweathermap.org/data/2.5/weather?q=90404,us&appid=a4ce1690db51c0756a4b8a173931736d&units=imperial"

    //This code snippit makes the API call once client browser hits this home route path (/)
    https.get(url, function(response) {
      console.log(response.statusCode)

      //This code brings back the actual data from the API
      response.on("data", (data) => {

        // JSON.parse() pulls the data we want from API and translates it into JSON..instead of binary or hexidecimal code.
        const weatherData = JSON.parse(data)
        const temp = weatherData.main.temp
        const description = weatherData.weather[0].description
        const city = weatherData.name
        const icon = weatherData.weather[0].icon
        const imgURL = `http://openweathermap.org/img/wn/${icon}.png`

        console.log(weatherData)

        res.write(`<h1>The Temperature in ${city} is ${temp} degrees with ${description}</h1>`)
        res.write(`<img src=${imgURL} />`)
        res.send()
      })
    })
})

app.get("/lotr", function (req, res) {
    res.send("Lord of the Rings here we come!")

    const lotrBooks = "https://the-one-api.dev/v2/book"
    https.get(lotrBooks, (response) => {

        console.log(response.statusCode)
        response.on("book", (book) => {
            const bookData = JSON.parse(book)
            console.log(bookData)
        })
    })
})


app.listen(3000, function () {
    console.log("Weather Application is listening on port 3000")
})