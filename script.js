//Empty array to store cities entered by the user
var cities = [];

//Function used to display the city HTML content
function displayCity() {

    var city = $(this).attr("data-city");

    var currentWeatherQuery = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=af6d8ce77f31fadf19d5245c0880c1e8`;

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