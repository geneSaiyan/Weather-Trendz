//Empty array to store cities entered by the user
var cities = [];

//Function used to display the city HTML content
function displayCity() {

    var city = $(this).attr("data-city");

    var currentWeatherQuery = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=af6d8ce77f31fadf19d5245c0880c1e8`;
    var fiveDayWeatherQuery = `https://api.openweathermap.org/data/2.5/forecast?q=${city},3166&APPID=af6d8ce77f31fadf19d5245c0880c1e8`;

    //Creating first AJAX call to get the current city weather attributes
    $.ajax({
        url: currentWeatherQuery,
        method: "GET"
    }).then(function (response) {

        //Using Moment JS to get the current date
        var getDate = moment();
        var todaysDate = getDate.format("MM/DD/YYYY");

        // Converting temp from Kelvin to Fahrenheit
        var temp = Math.round(((response.main.temp - 273.15) * 9 / 5) + 32);
        $("#cityName").html(`${response.name} (${todaysDate}) <span><img src="http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png"></span>`);
        $("#current-temp").html(`Temperature: ${temp} <span>&#8457;</span>`);
        $("#current-humidity").text(`Humidity: ${response.main.humidity}%`);
        $("#current-windSpeed").text(`Wind Speed: ${response.wind.speed} MPH`);
        $("#current-uv").html(`UV Index: <span> ${response.clouds.all} <span>`);

        $("#current-div").fadeIn(1000);
        $("#fiveDay-div").fadeIn(1500);
    });

    //Creating second AJAX call to get the five day weather attributes
    $.ajax({
        url: fiveDayWeatherQuery,
        method: "GET"
    }).then(function (response) {

        //Converting the temperature to fahrenheit
        var temp1 = Math.round(((response.list[0].main.temp - 273.15) * 9 / 5) + 32);
        var temp2 = Math.round(((response.list[6].main.temp - 273.15) * 9 / 5) + 32);
        var temp3 = Math.round(((response.list[15].main.temp - 273.15) * 9 / 5) + 32);
        var temp4 = Math.round(((response.list[23].main.temp - 273.15) * 9 / 5) + 32);
        var temp5 = Math.round(((response.list[32].main.temp - 273.15) * 9 / 5) + 32);
  
        //Putting the response dates in variables
        var date1 = new Date(response.list[0].dt_txt);
        var date2 = new Date(response.list[6].dt_txt);
        var date3 = new Date(response.list[15].dt_txt);
        var date4 = new Date(response.list[23].dt_txt);
        var date5 = new Date(response.list[32].dt_txt);

        //Displaying five day dates using getMonth/getDate/getFullYear methods
        $("#dateDay1").text(`${date1.getMonth() + 1}/${date1.getDate()}/${date1.getFullYear()}`);
        $("#dateDay2").text(`${date2.getMonth() + 1}/${date2.getDate()}/${date2.getFullYear()}`);
        $("#dateDay3").text(`${date3.getMonth() + 1}/${date3.getDate()}/${date3.getFullYear()}`);
        $("#dateDay4").text(`${date4.getMonth() + 1}/${date4.getDate()}/${date4.getFullYear()}`);
        $("#dateDay5").text(`${date5.getMonth() + 1}/${date5.getDate()}/${date5.getFullYear()}`);

        //Displaying five day temps
        $("#tempDay1").html(`Temp: ${temp1} <span>&#8457;</span>`);
        $("#tempDay2").html(`Temp: ${temp2} <span>&#8457;</span>`);
        $("#tempDay3").html(`Temp: ${temp3} <span>&#8457;</span>`);
        $("#tempDay4").html(`Temp: ${temp4} <span>&#8457;</span>`);
        $("#tempDay5").html(`Temp: ${temp5} <span>&#8457;</span>`);

        //Displaying five day icons
        $("#iconDay1").attr("src", `http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`);
        $("#iconDay2").attr("src", `http://openweathermap.org/img/wn/${response.list[6].weather[0].icon}@2x.png`);
        $("#iconDay3").attr("src", `http://openweathermap.org/img/wn/${response.list[15].weather[0].icon}@2x.png`);
        $("#iconDay4").attr("src", `http://openweathermap.org/img/wn/${response.list[23].weather[0].icon}@2x.png`);
        $("#iconDay5").attr("src", `http://openweathermap.org/img/wn/${response.list[32].weather[0].icon}@2x.png`);

        //Displaying five day humidity
        $("#humDay1").html(`Humidity: ${response.list[0].main.humidity}%`);
        $("#humDay2").html(`Humidity: ${response.list[6].main.humidity}%`);
        $("#humDay3").html(`Humidity: ${response.list[15].main.humidity}%`);
        $("#humDay4").html(`Humidity: ${response.list[23].main.humidity}%`);
        $("#humDay5").html(`Humidity: ${response.list[32].main.humidity}%`);

    });

}

//Function to create the city buttons
function renderCityButtons() {

    $("#cityBtnGroup-div").empty();

    // Looping through the array of cities to create buttons
    for (var i = 0; i < cities.length; i++) {

        var cityBtn = $("<button>");

        cityBtn.addClass("btn btn-outline-secondary cityBtn");

        cityBtn.attr("data-city", cities[i]);

        cityBtn.text(cities[i]);

        $("#cityBtnGroup-div").append(cityBtn);
    }
}

//Button click to search for a city that the user inputs
$("#btnSearchCity").click(function () {
    event.preventDefault();

    var city = $("#txtCity").val().trim();

    cities.push(city);

    renderCityButtons();

    $("#txtCity").val("");
})

// Adding a click event listener to buttons with a class of "cityBtn"
$(document).on("click", ".cityBtn", displayCity);

renderCityButtons();