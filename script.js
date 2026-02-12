// Connect to the APIs and make it happen :)

// DOG API
const dogApi = document.getElementById('dog-api');
const dogOutput = document.getElementById('dog-output');

async function getDogImage() {

    const response = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await response.json();
    const imageUrl = data.message;
    console.log(data);

    dogOutput.innerHTML = `<img src="${imageUrl}" alt="Random Dog Image" />`;
}

// CAT API

const catApi = document.getElementById('cat-api');
const catOutput = document.getElementById('cat-output');

async function getCatImage() {

    const response = await fetch('https://api.thecatapi.com/v1/images/search');
    const data = await response.json();
    const imageUrl = data[0].url;
    console.log(data);

    catOutput.innerHTML = `<img src="${imageUrl}" alt="Random Cat Image" />`;
}

// WEATHER API

const weatherApi = document.getElementById('weather-api');
const weatherOutput = document.getElementById('weather-output');

async function getWeather() {
    const city = document.getElementById('weather-output').value;
    const apiKey = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m'; // Replace with your OpenWeatherMap API key
    const response = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&models=gfs_seamless`);
    const data = await response.json();
    console.log(data);

    if (data.cod === 200) {
        const temp = data.main.temp;
        const description = data.weather[0].description;
        weatherOutput.innerHTML = `<p>Temperature in ${city}: ${temp}°C, ${description}</p>`;
    } else {
        weatherOutput.innerHTML = `<p>City not found. Please try again.</p>`;
    }               

}

// CURRENCY API


const currencyApi = document.getElementById('currency-api');
const currencyOutput = document.getElementById('currency-output');

async function getExchangeRates() {
    const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
    const data = await response.json();
    const rate = data.rates.EUR; // Example: Get USD to EUR rate
    console.log(data);

    currencyOutput.innerHTML = `<p>1 USD = ${rate} EUR</p>`;
}

// MOVIES API

const moviesApi = document.getElementById('movies-api');
const moviesOutput = document.getElementById('movies-output');

async function getMovies() {
    const apiKey = '2bbc11964b3c50192905a64042d333bc'; // Replace with your TMDb API key
    const response = await fetch(`https://api.themoviedb.org/3/account/{account_id}/favorite/movies?api_key=${apiKey}`);

    const data = await response.json();
    const movies = data.results;
    console.log(data);

    moviesOutput.innerHTML = movies.map(movie => `<p>${movie.title}</p>`).join('');
}   

// GITHUB API

const githubApi = document.getElementById('github-api');
const githubOutput = document.getElementById('github-output');

async function getGitHubUser() {
    const usernameInput = document.getElementById('github-username');
    if (!usernameInput) {
        githubOutput.innerHTML = `<p>Error: github-username input element not found</p>`;
        return;
    }
    const username = usernameInput.value;
    if (!username) {
        githubOutput.innerHTML = `<p>Please enter a GitHub username</p>`;
        return;
    }
    
    const response = await fetch(`https://api.github.com/users/${username}`);
    const data = await response.json();
    console.log(data);

    if (data.message === 'Not Found') {
        githubOutput.innerHTML = `<p>User not found</p>`;
    } else {
        githubOutput.innerHTML = `<p>Name: ${data.name}<br>Bio: ${data.bio}<br>Public Repos: ${data.public_repos}</p>`;
    }
}   

// JOKE API

const jokeApi = document.getElementById('joke-api');
const jokeOutput = document.getElementById('joke-output');

async function getJoke() {
    const response = await fetch('https://official-joke-api.appspot.com/random_joke');
    const data = await response.json();
    console.log(data);

    jokeOutput.innerHTML = `<p>${data.setup} - ${data.punchline}</p>`;
}   

// PUBLIC API

const publicApi = document.getElementById('public-api');
const publicApiOutput = document.getElementById('publicapi-output');

async function getPublicApiInfo() {
    try {
        const response = await fetch('https://api.github.com/search/repositories?q=api&sort=stars&per_page=10');
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        const repos = data.items;
        console.log(data);

        publicApiOutput.innerHTML = repos.map(repo => `<p><strong>${repo.name}</strong> - ${repo.description || 'No description'}</p>`).join('');
    } catch (error) {
        console.error('Error fetching APIs:', error);
        // Fallback to mock data if API fails
        const mockApis = [
            { name: 'Dog API', desc: 'Random dog images' },
            { name: 'Cat API', desc: 'Random cat images' },
            { name: 'Weather API', desc: 'Weather forecasts' },
            { name: 'Exchange Rate API', desc: 'Currency exchange rates' },
            { name: 'Joke API', desc: 'Random jokes' },
            { name: 'GitHub API', desc: 'GitHub user and repository data' },
            { name: 'TMDb API', desc: 'Movie database' },
            { name: 'Open-Meteo API', desc: 'Weather data' }
        ];
        publicApiOutput.innerHTML = mockApis.map(api => `<p><strong>${api.name}</strong> - ${api.desc}</p>`).join('');
    }
}   

