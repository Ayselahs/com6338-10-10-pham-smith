document.addEventListener("DOMContentLoaded", function() {
    displayFavoriteMovies();
  });
  
  function displayFavoriteMovies() {
    const favoriteMoviesListDiv = document.querySelector('.favoriteMoviesList');
    favoriteMoviesListDiv.innerHTML = ""; // Clear any previously displayed favorite movies
  
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
  
    if (favoriteMovies.length === 0) {
      const message = document.createElement('p');
      message.textContent = "No favorite movies added yet.";
      favoriteMoviesListDiv.appendChild(message);
    } else {
      favoriteMovies.forEach((movie) => {
        const { id, poster_path, title, release_date, overview } = movie;
  
        const movieCard = document.createElement('div');
        movieCard.classList.add('movieCard');
  
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
  
        // Create the Remove button
        const removeButton = document.createElement('button');
        removeButton.setAttribute("id","removeBtn");
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
          removeFavoriteMovie(id);
          // After removing the movie, update the displayed list of favorite movies
          displayFavoriteMovies();
        });
  
        movieCard.appendChild(removeButton);
        favoriteMoviesListDiv.appendChild(movieCard);
      });
    }
  }
  
  function removeFavoriteMovie(movieId) {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
  }
  

