// API Configuration
const API_KEY = "e86bc93c"; // Replace with your valid API key
const BASE_URL = "http://www.omdbapi.com/";

// DOM Elements
const movieInput = document.getElementById("movieInput");
const searchButton = document.getElementById("searchButton");
const movieDetails = document.querySelector(".movie-details");

// Fetch movie details by name
async function fetchMovieDetails(movieName) {
  try {
    const response = await fetch(`${BASE_URL}?apikey=${API_KEY}&t=${encodeURIComponent(movieName)}`);
    const data = await response.json();

    if (data.Response === "True") {
      displayMovieDetails(data);
    } else {
      displayError(data.Error);
    }
  } catch (error) {
    console.error("Error fetching movie data:", error);
    displayError("An error occurred. Please try again.");
  }
}

// Display movie details
function displayMovieDetails(movie) {
  movieDetails.innerHTML = `
    <h2>${movie.Title} (${movie.Year})</h2>
    <img src="${movie.Poster !== "N/A" ? movie.Poster : "https://via.placeholder.com/300x450"}" alt="${movie.Title}">
    <p><strong>Genre:</strong> ${movie.Genre}</p>
    <p><strong>Director:</strong> ${movie.Director}</p>
    <p><strong>Cast:</strong> ${movie.Actors}</p>
    <p><strong>Plot:</strong> ${movie.Plot}</p>
    <p><strong>IMDb Rating:</strong> ${movie.imdbRating}</p>
    <p><strong>Runtime:</strong> ${movie.Runtime}</p>
  `;
}

// Display error message
function displayError(message) {
  movieDetails.innerHTML = `<p class="error">${message}</p>`;
}

// Event listener for search button
searchButton.addEventListener("click", () => {
  const movieName = movieInput.value.trim();
  if (movieName) {
    fetchMovieDetails(movieName);
  } else {
    displayError("Please enter a movie name.");
  }
});

// Trigger search when pressing Enter key
movieInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchButton.click();
  }
});
