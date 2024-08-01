// STEP 1: Copy the OWMGeocode and other OWM .js files into your website
// STEP 2: Enter your API key below (uncomment)
// STEP 3: Uncomment the resources for your website
// STEP 4: Write the load functions to perform each step
// STEP 5: Call the load1() function when the weather should load

//const APIKEY = "APIKEYHERE";
//let units = "imperial";

// RESOURCES (Uncomment for each .js file)
// let owmGeocode = new OWMGeocode(APIKEY);
// let owmWeather = new OWMWeather(APIKEY, units);
// let owmForecast = new OWMForecast(APIKEY, units);
// let owmPollution = new OWMPollution(APIKEY);


//    load1()  -->  load2()  -->  load3()
//     |             |             |
//     Get location  |             Display weather
//                   Get weather from location

let hasLocation;
let weatherDesc;
const output = document.getElementById("output")
const prompt = document.getElementById("prompt")

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(load2);
        return true
    } else {
        return false;
    }
}

// const locationInput = document.getElementById("location-input");
// const locationInputLabel = document.getElementById("label-location");


window.onload = function () {
    hasLocation = getLocation();
}

if (hasLocation === true) {
    // locationInput.style.visibility = "hidden";
    // locationInputLabel.style.visibility = "hidden";
}

// function load1() {
//     owmGeocode.city = locationInput.value; // or load from a text box, etc.
//     owmGeocode.request(load2); // link to second function
// }

let lat;
let lon;
function load2(position) {
    if (position!==undefined && hasLocation) {
        console.log("worked")
        owmWeather.lat = lat = position.coords.latitude;
        owmWeather.lon = lon = position.coords.longitude;
    }
    else {
        console.log("failed")
        owmWeather.lat = owmGeocode.getLat();
        owmWeather.lon = owmGeocode.getLon();
    }
    owmWeather.request(load3); // link to third function
}




const OPENAI_KEY = "sk-proj-CQ9Rnjo5bQh5dvqSXxmbT3BlbkFJwxjc0dcbyR8CdFjxfvCF";

function runGPT() {
    choiceTxT = prompt.options[prompt.selectedIndex].text

    if (hasLocation) {
        gpt1Location(userCity, weatherDesc, choiceTxT)
    }
    else gpt1(choiceTxT)
}

function gpt1Location(userCity, weatherDesc, choice) {

    fetch(`https://api.openai.com/v1/chat/completions`, {
        headers: {
            "Authorization": `Bearer ${OPENAI_KEY}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            "model": "gpt-4o",
            "messages": [
                {
                    "role": "system",
                    "content": "You will be asked questions regarding the weather today. Please use the user's location, and the weather to answer their question. DO NOT exceed 3 sentences in a response. Be specific and concise."
                },
                {
                    "role": "system",
                    "content": `This is the user's city: ${userCity}, here is a description of the weather there today ${weatherDesc}. If possible, also look up the temperature and factor that in as well.`
                },  
                {
                    "role": "user",
                    "content": `Knowing this information, please answer this question ${choice}`
                }
            ]
        })
    }).then(response => response.json()).then(json => {
        // console.log("Here it is")
        // console.log(json);
        // console.log(json.choices[0].message.content);
        gpt2(json)
    })
}

function gpt1(choice) {

    fetch(`https://api.openai.com/v1/chat/completions`, {
        headers: {
            "Authorization": `Bearer ${OPENAI_KEY}`,
            "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
            "model": "gpt-4o",
            "messages": [
                {
                    "role": "system",
                    "content": "You will be asked questions regarding the weather today. Please use the user's location, and the weather to answer their question. DO NOT exceed 3 sentences in a response. Be specific and concise."
                },
            
                {
                    "role": "user",
                    "content": `Please look up the weather in Cooladdi Queensland, and use that information to answer this question ${choice}, about the weather in "Cooladdi Queensland" today.`
                }
            ]
        })
    }).then(response => response.json()).then(json => {
        // console.log("Here it is")
        // console.log(json);
        // console.log(json.choices[0].message.content);
        gpt2(json)
    })
}

function gpt2(json) {

    output.innerHTML = json.choices[0].message.content;
}

// let firstJSON = {}
// function load3() {
//     firstJSON = owmWeather.json
//     owmGeocode.city = "Rockport, MA"; // or load from a text box, etc.
//     owmGeocode.request(load4); // link to second function
// }

// function load4() {
//     owmWeather.lat = owmGeocode.getLat();
//     owmWeather.lon = owmGeocode.getLon();
//     owmWeather.request(load5); // link to third function
// }

// let secondJSON = {};
// function load5()
// {
//     secondJSON = owmWeather.json;

//     const weatherReport = document.getElementById("weather-report");
//     if (Math.abs(firstJSON.wind.gust - secondJSON.wind.gust) < 0.5) {
//         weatherReport.innerHTML = "gust speeds same"
//     }
//     else if (firstJSON.wind.gust < secondJSON.wind.gust) {
//         weatherReport.innerHTML = "Fly kite in Rockport"
//     }
//     else {

//         weatherReport.innerHTML = "Fly kite in gloucester"
//     }
// }

function load3() {
    const loc = document.getElementById("location");
    loc.innerHTML = ``;

    const weatherReport = document.getElementById("weather-report");
    const weatherClothingRecc = document.getElementById("weather-report-clothing")
    // See display.js for more examples
    weatherDesc = owmWeather.json.weather[0].description;
    weatherReport.innerHTML = `Weather report for ${owmGeocode.city}: ${weatherDesc}`;

    if (owmWeather.json.main.temp_max > 70) {
        document.body.style.backgroundColor = "darkblue"
        // weatherClothingRecc.innerHTML = "Wear shorts & T-shirts"
    }
    else if (owmWeather.json.main.temp_max < 50) {
        document.body.style.backgroundColor = "blue"
        // weatherClothingRecc.innerHTML = "Wear Pants and Long Sleeve Shirts"
    }
    else {
        document.body.style.backgroundColor = "green"
        // weatherClothingRecc.innerHTML = "Wear shorts & T-shirts"
    }
}
const userCity = owmGeocode.city;
