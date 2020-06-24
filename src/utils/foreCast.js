const request = require("request");

const foreCast = (a, b, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${a}&lon=${b}&units=metric&appid=6626ffb6b45d6c6ae656f1c8349aca33`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the weather services", undefined);
    } else if (body.statusCode === 400) {
      callback("Unable to find the location", undefined);
    } else {
      callback(undefined, {
        temperature: body.main.temp,
        minimumTemperature: body.main.temp_min,
        maximunTemperature: body.main.temp_max,
        humidity: body.main.humidity,
      });
    }
  });
};

module.exports = foreCast;
