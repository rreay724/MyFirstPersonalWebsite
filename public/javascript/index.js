const key = "162615d493a92c2eec2fe63cac63fd8a";
const notificationElement = document.querySelector(".notification");
const tempElement = document.querySelector(".temperature-value p");
const descriptionElement = document.querySelector(".temperature-description p");
const welcomeMessageElement = document.querySelector(".me-developer");
const timeElement = document.querySelector(".time p");
const locationElement = document.querySelector(".location p");

var day = new Date();
var hour = day.getHours();

// get time
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var hour = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  var t;

  if (hour >= 0 && hour < 12) {
    if (h === 0) {
      h = h + 12;
    }
    timeElement.innerHTML = h + ":" + m + ":" + s + "am";
    t = setTimeout(startTime, 500);
  } else if (h >= 12 && h < 23) {
    if (h >= 13 && h <= 23) {
      h = h - 12;
    }
    timeElement.innerHTML = h + ":" + m + ":" + s + "pm";
    t = setTimeout(startTime, 500);
  }
  console.log(h);
}
function checkTime(i) {
  if (i < 10) {
    i = "0" + i;
  } // add zero in front of numbers < 10
  return i;
}

// Get location for weather
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Browser Doesn't Support Geolocation.</p>";
}

// Get users position
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude);
}

function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

const weather = {
  temperature: {
    value: 18,
    unit: "fahrenheit",
  },
  description: "few clouds",
  welcome: "Welcome to my page.",
};

function getWeather(latitude, longitude) {
  var DsProxyLink = `https://cors-anywhere.herokuapp.com/`;
  var api = `${DsProxyLink}https://api.darksky.net/forecast/${key}/${latitude},${longitude}`;
  console.log(api);
  fetch(api)
    .then(function (response) {
      let data = response.json();
      return data;
    })
    .then(function (data) {
      // weather.temperature.value = Math.floor(data.main.temp * (9 / 5) - KELVIN);
      // weather.description = data.weather[0].description;
      // weather.city = data.name;
      // weather.country = data.sys.country;
      weather.temperature.value = Math.floor(data.currently.temperature);
      weather.description = data.currently.summary;
      // icon = data.currently.icon;
      // weather.city = data.name;
      // weather.country = data.sys.country;
    })
    .then(function () {
      displayWeather();
    });
}

function displayWeather() {
  tempElement.innerHTML = `${weather.temperature.value}° <span>F</span>`;
  descriptionElement.innerHTML = weather.description;
  var timeOfDayMessage = "";

  // if (hour >= 2 && hour < 12) {
  //   timeOfDayMessage = "Good morning! ";
  // } else if (hour >= 12 && hour <= 16) {
  //   timeOfDayMessage = "Good afternoon! ";
  // } else if (hour >= 17 && hour <= 23) {
  //   timeOfDayMessage = "Good evening! ";
  // }

  // // Change welcome message based on weather description
  // if (weather.description === "Rain") {
  //   welcomeMessageElement.innerHTML = "It's a wet one today. Stay dry!";
  // }
  // if (weather.description === "Drizzle") {
  //   welcomeMessageElement.innerHTML = "Little bit of rain today. Stay dry!";
  // }

  // // Messages for overcast
  // if (
  //   weather.description === "Overcast" &&
  //   weather.temperature.value <= 80 &&
  //   weather.temperature.value >= 60
  // ) {
  //   ("Overcast and dreary, but nice and warm today. Let's hope for some sun soon!");
  // } else if (
  //   weather.description === "Overcast" &&
  //   weather.temperature.value <= 59
  // ) {
  //   welcomeMessageElement.innerHTML =
  //     "Overcast, dreary and chilly. Let's hope for some sun soon. Stay warm!";
  // } else if (weather.description === "Overcast") {
  //   welcomeMessageElement.innerHTML =
  //     "Overcast and dreary today. Let's hope for some sun soon!";
  // }

  // // Messages for clear with temp variations
  // if (weather.description === "Clear") {
  //   welcomeMessageElement.innerHTML = "Clear skys and beautiful out today!";
  // } else if (
  //   weather.description === "Clear" &&
  //   weather.temperature.value <= 80 &&
  //   weather.temperature.value >= 60
  // ) {
  //   ("Clear skys and warm and beautiful out today!");
  // } else if (
  //   weather.description === "Clear" &&
  //   weather.temperature.value < 59
  // ) {
  //   ("Clear skys and chilly but sunny out today. Stay warm!");
  // } else if (
  //   weather.description === "Clear" &&
  //   weather.temperature.value < 80
  // ) {
  //   ("Clear skys and hot and sunny out today. Stay like a cucumber!");
  // }

  // // Messages for mostly cloudy with temp variations
  // if (
  //   weather.description === "Mostly Cloudy" &&
  //   weather.temperature.value >= 60 &&
  //   weather.temperature.value <= 80
  // ) {
  //   welcomeMessageElement.innerHTML =
  //     "Lots of happy little clouds and warm out today. Hopefully we'll get some more sun!";
  // } else if (
  //   weather.description === "Mostly Cloudy" &&
  //   weather.temperature.value < 59
  // ) {
  //   welcomeMessageElement.innerHTML =
  //     "Lots of happy little clouds and chilly today. Hopefully we'll get some more sun! Stay warm!";
  // } else if (weather.description === "Mostly Cloudy") {
  //   welcomeMessageElement.innerHTML =
  //     "Lots of happy little clouds today. Hopefully we'll get some more sun!";
  // }

  // // Messages for partly cloudy with temp variations
  // if (
  //   weather.description === "Partly Cloudy" &&
  //   weather.temperature.value >= 65 &&
  //   weather.temperature.value <= 80
  // ) {
  //   welcomeMessageElement.innerHTML =
  //     "Just a few clouds and nice and warm out today. Sunny and beautiful!";
  // } else if (
  //   weather.description === "Partly Cloudy" &&
  //   weather.temperature.value <= 49
  // ) {
  //   welcomeMessageElement.innerHTML =
  //     "A few clouds and chilly today, but nice and sunny! Stay warm!";
  // } else if (weather.description === "Partly Cloudy") {
  //   welcomeMessageElement.innerHTML =
  //     "Just a few clouds today. Sunny and beautiful out!";
  // }
  // locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}

// Side tabs
$(document).ready(function () {
  $(".trigger").click(function () {
    $(".panel").toggle("fast");
    $(this).toggleClass("active");
    return false;
  });
});

$(document).ready(function () {
  $(".trigger-sidebar").click(function () {
    $(".panel-sidebar").toggle("fast");
    $(this).toggleClass("active");
    return false;
  });
});

$(window).load(function () {
  setTimeout(function () {
    $(".fly-in").removeClass("hidden");
  }, 700);
});

// Menu
$(document).ready(function () {
  $(".button a").click(function () {
    $(".overlay").fadeToggle(200);
    $(this).toggleClass("btn-open").toggleClass("btn-close");
  });
});
$(".overlay").on("click", function () {
  $(".overlay").fadeToggle(200);
  $(".button a").toggleClass("btn-open").toggleClass("btn-close");
  open = false;
});

// Easter egg
var hyeh = new Audio("/sounds/hyeeeeh.m4a");
document.addEventListener("keydown", function (event) {
  if (event.key === "h") {
    hyeh.play();
  }
});
