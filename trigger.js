const testnum = document.getElementById("testnum");

///////////////////////////////////////////////////////////////
// LOCATION - translate from city, state, country to lat/lon //
///////////////////////////////////////////////////////////////

function getLocation() {
    owmGeocode.city = "Worcester, MA";
    owmGeocode.request(displayLocation);
}

function testLocation() {
    owmGeocode.testRequest(testnum.value, displayLocation);
}

///////////////////////////////////////////////////////////////
// WEATHER - the current weather conditions                  //
///////////////////////////////////////////////////////////////

function getWeather() {
    owmWeather.lat = lat;
    owmWeather.lon = lon;

    owmWeather.request(displayWeather);
}

function testWeather() {
    owmWeather.testRequest(testnum.value, displayWeather);
}

///////////////////////////////////////////////////////////////
// FORECAST                                                  //
///////////////////////////////////////////////////////////////

function getForecast() {
    owmForecast.lat = lat;
    owmForecast.lon = lon;

    owmForecast.request(displayForecast);
}

function testForecast() {
    owmForecast.testRequest(testnum.value, displayForecast);
}

///////////////////////////////////////////////////////////////
// POLLUTION - the air quality index (AQI) and contaminants  //
///////////////////////////////////////////////////////////////

function getPollution() {
    owmPollution.lat = owmGeocode.getLat();
    owmPollution.lon = owmGeocode.getLon();

    owmPollution.request(displayPollution);
}

function testPollution() {
    owmPollution.testRequest(testnum.value, displayPollution);
}