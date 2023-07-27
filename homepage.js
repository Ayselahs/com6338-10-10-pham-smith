//const userSet = document.querySelector(".userSet");
//const myButton = document.getElementById("myButton");
const movieAPI = document.querySelector('.movieList')
//const numberOfUser = document.getElementsByClassName('numberOfUser')
const generateBtn = document.querySelector('.generatebtn')
//const { classList: dropDownMenuClassList} = document.getElementById("dropDownMenu")
//let usersVoted = 0


generateBtn.addEventListener('click',displayMovies)

const movieAPIKey = 'eb27c13c3073bd1a4e7f1f8f94714eaf'

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

const randomizeMovies = (array) => {
 return array.slice().sort(() => Math.random() - 0.5);
}

async function shuffleMovies() {
  const movieList = await getMovies();
  return randomizeMovies(movieList).slice(0,4)
}

async function displayMovies() {
  try {
    generateBtn.disabled = true;
    const movieListDiv = document.querySelector('.movieList');

    const movies = await shuffleMovies();
    console.log(movies);
    localStorage.setItem("randomMovies", JSON.stringify(movies));

    // Clear previous movie list
    movieListDiv.innerHTML = '';

    movies.forEach((movie) => {
      const { poster_path, title, release_date, overview } = movie;

      const movieCard = document.createElement('div');
      movieCard.classList.add('movie-card');

      const moviePoster = document.createElement('img');
      moviePoster.classList.add('moviePoster');
      const posterURL = `https://image.tmdb.org/t/p/w500${poster_path}`;
      moviePoster.src = posterURL;
      movieCard.appendChild(moviePoster);

      const movieTitle = document.createElement('h3');
      movieTitle.textContent = title;
      movieCard.appendChild(movieTitle);

      const movieReleaseDate = document.createElement('p');
      movieReleaseDate.textContent = release_date;
      movieCard.appendChild(movieReleaseDate);

      const movieOverview = document.createElement('p');
      movieOverview.textContent = overview;
      movieCard.appendChild(movieOverview);

      movieListDiv.appendChild(movieCard);

      // Add event listener to each movie card to save it as a favorite on click
      movieCard.addEventListener('click', () => {
        saveFavoriteMovie(movie);
      });
    });
  } catch (error) {
    console.error("unable to get data", error);
  }
}



// Function to save a movie as a favorite
function saveFavoriteMovie(movie) {
  const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
  const existingMovie = favorites.find((favMovie) => favMovie.id === movie.id);

  if (!existingMovie) {
    favorites.push(movie);
    localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
    alert(`"${movie.title}" has been added to your favorites!`);
  } else {
    alert(`"${movie.title}" is already in your favorites.`);
  }
}

   // Add event listener to each movie to add it to favorites on click
   movieListDiv.addEventListener('click', () => {
    saveFavoriteMovie(movie);
  });

localStorage.setItem("randomMovies", JSON.stringify(movies))

// Function to navigate to the favorites page
function goToFavoritesPage() {
  window.location.href = "favorites.html";
}