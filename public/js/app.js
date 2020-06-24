const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const messageThree = document.querySelector("#message-3");
const messageFour = document.querySelector("#message-4");
const messageFive = document.querySelector("#message-5");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;

  messageOne.textContent = "loading....";
  messageTwo.textContent = "";
  fetch("http://127.0.0.1:3000/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = data.error;
        } else {
          messageOne.textContent = data.location;
          //messageTwo.textContent = data.forecast;
          const weatherInfo = data.forecast;
          messageTwo.textContent = `Temperature  : ${weatherInfo.temperature} degree celsius`;
          messageThree.textContent = `Minimum Temperature  : ${weatherInfo.minimumTemperature} degree celsius`;
          messageFour.textContent = `Maximum Temperature  : ${weatherInfo.maximumTemperature} degree celsius`;
          messageFive.textContent = `Humidity : ${weatherInfo.humidity} %`;
        }
      });
    }
  );
});
