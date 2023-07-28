const movieAPI = document.querySelector('.movieList')
const generateBtn = document.querySelector('.generatebtn')
const movieListDiv = document.getElementById('movieListContainer');

// When the user clicks on the Generate Movies button, it will trigger the displayMovies function to show movies
generateBtn.addEventListener('click',displayMovies)

const movieAPIKey = 'eb27c13c3073bd1a4e7f1f8f94714eaf'

// Using async function with await, try and catch to fetch the information from API, to return the results, and to catch any error or unable to retrieve the movies data (from Assignment 8)
async function getMovies(){
    try {
        const res = await fetch (`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${movieAPIKey}`)
        const movieData = await res.json()
        return movieData.results
    } catch (error) {
        console.error ('Unable to get data', error)
        return []
    }
   
}

//  Using ES6 from Assignment 8 and M11, randomizeMovies will take the break up the data array, sort it, and return as random
const randomizeMovies = (array) => {
 return array.slice().sort(() => Math.random() - 0.5);
}

// In this function, it will fetch the data from getMovies, use randomizeMovies to perform the randomization and return the list
// When returning the movies data, it will only show movies with i = 0 to i = 4 since there will only be 4 movies shown at a time
async function shuffleMovies() {
  const movieList = await getMovies();
  return randomizeMovies(movieList).slice(0,4)
}

// display movies will only be triggered when the Generate Movies button is clicked
async function displayMovies() {
  try {
    generateBtn.disabled = true;
    
    // Using localStorage to store the list of movies that are returned (M8)
    const movies = await shuffleMovies();
    localStorage.setItem("randomMovies", JSON.stringify(movies));

    // Clear previous movie list
    movieListDiv.innerHTML = '';

    // Instead of using for loop, we use forEach to perform the same thing, just easier (from M11 and M9)
    // With this, the poster image, title, release data, and overview will be retrieved from the API data (M9 with ES6)
    movies.forEach((movie) => {
      const { poster_path, title, release_date, overview } = movie;

      // Create a Bootstrap card for each movie
      const movieCard = document.createElement('div')
      movieCard.classList.add('col')

      const cardInner = document.createElement('div')
      cardInner.classList.add('card', 'shadow-sm')

      const moviePoster = document.createElement('img')
      moviePoster.classList.add('bd-placeholder-img', 'card-img-top', 'img-fluid', 'movieoster')
      const posterURL = `https://image.tmdb.org/t/p/w500${poster_path}`
      moviePoster.src = posterURL
      cardInner.appendChild(moviePoster)

      const cardBody = document.createElement('div')
      cardBody.classList.add('card-body')

      const movieTitle = document.createElement('h5')
      movieTitle.classList.add('card-title')
      movieTitle.textContent = title
      cardBody.appendChild(movieTitle)

      const movieReleaseDate = document.createElement('p');
      movieReleaseDate.classList.add('card-text')
      movieReleaseDate.textContent = release_date;
      cardBody.appendChild(movieReleaseDate);

      const movieOverview = document.createElement('p');
      movieOverview.classList.add('card-text')
      movieOverview.textContent = overview;
      cardBody.appendChild(movieOverview);

      cardInner.appendChild(cardBody)
      movieCard.appendChild(cardInner)
      movieListDiv.appendChild(movieCard);

      // Add event listener to each movie card to save it as a favorite on click
      movieCard.addEventListener('click', () => {
        saveFavoriteMovie(movie);
      });
      // localStorage is used to store the movies in this display
      localStorage.setItem("randomMovies", JSON.stringify(movies))
    });
  } catch (error) {
    console.error("unable to get data", error);
  }
}



// Function to save a movie as a favorite
// When user clicks on the Favorites tab, localStorage will get the data that was saved from on the Homepage and get them to the Favorites page
function saveFavoriteMovie(movie) {
  const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];

  // This will find the poster img that was clicked on from the homepage and save it to the favorite list using the individual movie id
  const existingMovie = favorites.find((favMovie) => favMovie.id === movie.id);
  
  // If the movie isn't already saved on the Favorites list, then it will save the movie and save to localStorage as favoriteMovies
  // If the movie isn't already saved, then it will alert user that the movie has been added to the list
  // If the movie is already on the list, then it will alert user that the movie is already on the list
  
  if (!existingMovie) {
    favorites.push(movie);
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
    alert(`"${movie.title}" has been added to your favorites!`);
  } else {
    alert(`"${movie.title}" is already in your favorites.`);
  }
}


// Function to navigate to the favorites page
function goToFavoritesPage() {
  window.location.href = "favorites.html";
}