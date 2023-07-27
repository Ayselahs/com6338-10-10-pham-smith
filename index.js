
//const userSet = document.querySelector(".userSet");
//const myButton = document.getElementById("myButton");
const movieAPI = document.querySelector('.movieList')
//const numberOfUser = document.getElementsByClassName('numberOfUser')
const generateBtn = document.querySelector('.generatebtn')
//const { classList: dropDownMenuClassList} = document.getElementById("dropDownMenu")
//let usersVoted = 0
const movieListDiv = document.getElementById('movieListContainer');


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
    

    const movies = await shuffleMovies();
    console.log(movies);
    localStorage.setItem("randomMovies", JSON.stringify(movies));

    // Clear previous movie list
    movieListDiv.innerHTML = '';

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
      localStorage.setItem("randomMovies", JSON.stringify(movies))
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
  /*
   // Add event listener to each movie to add it to favorites on click
   movieListDiv.addEventListener('click', () => {
    saveFavoriteMovie(movie);
    
  });
  */



// Function to navigate to the favorites page
function goToFavoritesPage() {
  window.location.href = "favorites.html";
}