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
        
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('row', 'text-center');
        favoriteMoviesListDiv.appendChild(movieDiv);

        const movieReleaseDate = document.createElement('div');
        movieReleaseDate.classList.add('col-3', 'themed-grid-col');
        movieReleaseDate.textContent = release_date;
        movieDiv.appendChild(movieReleaseDate);

        const movieTitle = document.createElement('div');
        movieTitle.classList.add('col-3', 'themed-grid-col');
        movieTitle.textContent = title;
        console.log(title);
        console.log(movieTitle);
        movieDiv.appendChild(movieTitle);

        const movieLinks = document.createElement('div');
        const link = document.createElement('a');
        link.textContent = "View Details";
        link.href = `./results.html?movieId=${id}`;
        movieLinks.classList.add('col-3', 'themed-grid-col');
        movieLinks.appendChild(link);
        movieDiv.appendChild(movieLinks);
  
        
  
        
  
        // Create the Remove button
        const removeButton = document.createElement('button');
        removeButton.classList.add('col-3', 'themed-grid-col', 'shadow-sm');
        removeButton.setAttribute("id","removeBtn");
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
          removeFavoriteMovie(id);
          // After removing the movie, update the displayed list of favorite movies
          displayFavoriteMovies();
        });
  
        movieDiv.appendChild(removeButton);
        //favoriteMoviesListDiv.appendChild(movieCard);
      });
    }
  }
  
  function removeFavoriteMovie(movieId) {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
  }
  

