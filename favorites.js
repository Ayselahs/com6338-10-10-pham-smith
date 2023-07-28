// display favorite movies when page is loaded

document.addEventListener("DOMContentLoaded", function() {
    displayFavoriteMovies();
  });
  
  // function to display the favorite movies
  function displayFavoriteMovies() {
    const favoriteMoviesListDiv = document.querySelector('.favoriteMoviesList');
    favoriteMoviesListDiv.innerHTML = ""; // Clear any previously displayed favorite movies
    
    // using localStorage to retrieve the favorite movies
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
  
    // if there is nothing saved, then the message of no favorite movies added yet will be on DOM
    if (favoriteMovies.length === 0) {
      const message = document.createElement('p');
      message.textContent = "No favorite movies added yet.";
      favoriteMoviesListDiv.appendChild(message);
      // if there is any movie saved to favorites, then the display will be the same as the hompage for consistency
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
        // View details will take place in another page (3rd page) to retrieve data from the 2nd API
      
        // Create the Remove button
        const removeButton = document.createElement('button');
        removeButton.classList.add('col-3', 'themed-grid-col', 'shadow-sm', 'removeBtn');
        removeButton.setAttribute("id","removeBtn");
        removeButton.textContent = 'Remove';
        removeButton.addEventListener('click', () => {
          removeFavoriteMovie(id);  // removing the favorite movie based on the individual id just as saving it
          // After removing the movie, update the displayed list of favorite movies
          displayFavoriteMovies();
        });
        
        movieDiv.appendChild(removeButton);
      });
    }
  }
  
  // when removing the movie from favorite list, it will filter the movie list and find the id that needs to be deleted to remove 
  // localStorage will then update the new Favorite List
  function removeFavoriteMovie(movieId) {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const updatedFavorites = favorites.filter((movie) => movie.id !== movieId);
    localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
  }
  

