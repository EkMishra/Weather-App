// API key from OpenWeatherMap (sign up on their website to get one)
const apiKey = 'b23a15b7fc9162757efde61bfca6be9f';

// DOM elements
const cityInput = document.getElementById('cityInput');
const searchButton = document.getElementById('searchButton');
const weatherInfo = document.getElementById('weatherInfo');

// Event listener for the button click
searchButton.addEventListener('click', () => {
    const city = cityInput.value;
    getWeatherData(city);
});

// Function to fetch weather data
function getWeatherData(city) {
    // Use the Fetch API to make a GET request to the OpenWeatherMap API
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('City not found or API request issue');
        }
        return response.json();
    })
        .then(data => {
            if (data instanceof Error) {
                throw data; // Re-throw the error
            }
            // Extract and display weather information
            const temperature = data.main.temp;
            const conditions = data.weather[0].description;
            const location = data.name;

            const iconCode=data.weather[0].icon;
            
            const iconUrl=`https://openweathermap.org/img/wn/${iconCode}.png`;
            weatherInfo.innerHTML = `
            <h2>${location}</h2>              
        `;
            document.getElementById("temp").innerHTML = (temperature-273.15).toPrecision(3);
            document.getElementById("conditions").innerHTML = conditions;
            document.getElementById("icon").src = iconUrl;
            document.getElementById("tempimg").src=`celsius.png`;

           
        })
        .catch(error => {
            document.getElementById("temp").innerHTML = '';
            document.getElementById("conditions").innerHTML = '';
            document.getElementById("icon").src = '';
            document.getElementById("tempimg").src=``;
            // Handle errors, e.g., city not found or API request issue 
            weatherInfo.innerHTML = `<p>Error: ${error.message}</p>`;
        });
}
