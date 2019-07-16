let request = require('request');

const apikey = "e7dc4b9a1dc2bbc0e44925d9d0436dac";
const city = "Cordoba";
const weather_url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;
const forecast_url = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apikey}`;

const now = new Date();

let forecast_day = 0;

request(weather_url, function (error, response, body) {
	body = JSON.parse(body);
	if (error && response.statusCode != 200) {
		throw error;
	} else {
		const location = document.getElementsByClassName("location");
		location[0].innerHTML = body.name + ", " + body.sys.country;

		const icon = document.getElementsByClassName("icon");
		let icon_name = body.weather[0].icon;
		const icon_url = `http://openweathermap.org/img/wn/${icon_name}@2x.png`;
		icon[0].setAttribute("src", icon_url);

		const temperature = document.getElementsByClassName("temperature");
		temperature[0].innerHTML = (body.main.temp | 0) + "°C";

		const sky = document.getElementsByClassName("sky");
		sky[0].innerHTML = body.weather[0].description;

		const background = document.getElementsByTagName("html");
		switch (body.weather[0].main) {
			case "Clear":
				background[0].style.background = "linear-gradient(to bottom, #81D4FA 0%, #B3E5FC 100%)";
				break;
			case "Clouds":
				background[0].style.background = "linear-gradient(to bottom, #E0E0E0 0%, #EEEEEE 100%)";
				break;
			case "Drizzle":
				background[0].style.background = "linear-gradient(to bottom, #BDBDBD 0%, #E0E0E0 100%)";
				break;
			case "Rain":
				background[0].style.background = "linear-gradient(to bottom, #BDBDBD 0%, #E0E0E0 100%)";
				break;
			case "Snow":
				background[0].style.background = "linear-gradient(to bottom, #F5F5F5 0%, #FAFAFA 100%)";
				break;
			case "Thunderstorm":
				background[0].style.background = "linear-gradient(to bottom, #90A4AE 0%, #B0BEC5 100%)";
				break;
			default:
				break;
		}

		const humidity = document.getElementsByClassName("humidity");
		humidity[0].innerHTML = "Humidity: " + body.main.humidity + "%";

		const wind = document.getElementsByClassName("wind");
		wind[0].innerHTML = "Wind: " + body.wind.speed + " km/h";
	}
});

function updateForecast() {
	request(forecast_url, function (error, response, body) {
		body = JSON.parse(body);
		if (error && response.statusCode != 200) {
			throw error;
		} else {
			const graph = document.getElementsByClassName("graph");
			const bar = graph[0].getElementsByClassName("bar");

			let hoursPassed = (now.getHours() / 3) | 0;
			let hoursOffset = 0;
			if (forecast_day == 0) {
				hoursOffset = -(hoursPassed + 1);
			} else {
				hoursOffset = 7 - hoursPassed;
				hoursOffset += 8 * (forecast_day - 1);
			}

			for (i = 0; i < 8; i++) {
				const progress = bar[i].getElementsByClassName("progress");
				const id = i + hoursOffset;
				if (id >= 0 && id < 40) {
					progress[0].innerHTML = body.list[id].main.temp | 0;
					progress[0].style.height = (body.list[id].main.temp * 100) / 50 + "%";
					progress[0].style.opacity = "1.0";
				} else {
					progress[0].innerHTML = "";
					progress[0].style.height = "0%";
					progress[0].style.opacity = "0.5";
				}
			}
		}
	});
}

updateForecast();

function openDay(event, day) {
	forecast_day = day;
	updateForecast();

	const toggles = document.getElementsByClassName("toggle");
	for (i = 0; i < toggles.length; i++) {
		toggles[i].className = toggles[i].className.replace(" active", "");
	}

	event.currentTarget.className += " active";
}