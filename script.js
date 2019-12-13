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

        var getDate = moment();
        var todaysDate = getDate.format("MM/DD/YYYY");

        // Converting temp from Kelvin to Fahrenheit
        var temp = Math.round((( response.main.temp - 273.15) * 9/5) + 32);
        $("#cityName").text(response.name);
        $("#todayDate").text(todaysDate);
        $("#current-temp").html(`Temperature: ${temp} <span>&#8457;</span>`);
        $("#current-humidity").text(`Humidity: ${response.main.humidity}%`);
        $("#current-windSpeed").text(`Wind Speed: ${response.wind.speed} MPH`);
        $("#current-uv").html(`UV Index: ${response.clouds.all}`);

       $("#current-div").fadeIn(2000);
       $("#fiveDay-div").fadeIn(5000);
    });

    //Creating second AJAX call to get the five day weather attributes
    $.ajax({
        url: fiveDayWeatherQuery,
        method: "GET"
    }).then(function (response) {

        var temp1 = Math.round((( response.list[0].main.temp - 273.15) * 9/5) + 32);
        var temp2 = Math.round((( response.list[6].main.temp - 273.15) * 9/5) + 32);
        var temp3 = Math.round((( response.list[15].main.temp - 273.15) * 9/5) + 32);
        var temp4 = Math.round((( response.list[23].main.temp - 273.15) * 9/5) + 32);
        var temp5 = Math.round((( response.list[32].main.temp - 273.15) * 9/5) + 32);
        var day1 = moment().add(1, 'd');
        var today1 = day1.format("MM/DD/YYYY");

    $("#dateDay1").text(response.list[0].dt);
    $("#tempDay1").html(`Temp: ${temp1} <span>&#8457;</span>`);
    $("#tempDay2").html(`Temp: ${temp2} <span>&#8457;</span>`);
    $("#tempDay3").html(`Temp: ${temp3} <span>&#8457;</span>`);
    $("#tempDay4").html(`Temp: ${temp4} <span>&#8457;</span>`);
    $("#tempDay5").html(`Temp: ${temp5} <span>&#8457;</span>`);

    $("#iconDay1").attr("src", `http://openweathermap.org/img/wn/${response.list[0].weather[0].icon}@2x.png`);

    //console.log(response.list[0].weather[0].icon);

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