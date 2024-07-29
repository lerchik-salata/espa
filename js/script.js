document.addEventListener("DOMContentLoaded", function () {
  function getCurrentTimeInLondon() {
    const now = new Date();
    const options = {
      timeZone: "Europe/London",
      hour12: false,
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    const londonTime = now.toLocaleTimeString("en-US", options);
    return londonTime;
  }

  function updateTime() {
    const londonTimeElement = document.getElementById("london-time");
    const londonTime = getCurrentTimeInLondon();
    londonTimeElement.textContent = `Time in London: ${londonTime}`;
  }

  window.addEventListener("load", function () {
    const lat = 51.5156177;
    const lon = -0.0919983;
    const apiKey = "3555cf6672b071c193d2dece6304ae5e";

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    function getCurrentTemperature() {
      const temperatureElement = document.getElementById("temperature");

      fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
          const temperature = data.main.temp;

          temperatureElement.textContent = `${temperature} °C`;
        })
        .catch((error) => {
          temperatureElement.textContent = "Error";
        });
    }

    getCurrentTemperature();
    updateTime();
    setInterval(updateTime, 1000);
    setInterval(getCurrentTemperature, 10000);
  });
});
