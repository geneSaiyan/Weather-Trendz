var cities = [];

function renderButtons() {

    $("#cityBtnGroup-div").empty();

    // Looping through the array of movies
    for (var i = 0; i < cities.length; i++) {

        var cityBtn = $("<button>");

        cityBtn.addClass("btn btn-outline-secondary");

        cityBtn.attr("data-name", cities[i]);

        cityBtn.text(cities[i]);

        $("#cityBtnGroup-div").append(cityBtn);
    }
}

$("#btnSearchCity").click(function () {
    event.preventDefault();
    var city = $("#txtCity").val().trim();

    cities.push(city);

    renderButtons();
})

renderButtons();