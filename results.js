

// Get from local storage
// TMDb API: eb27c13c3073bd1a4e7f1f8f94714eaf
// OMDb API: 28a97e2f
document.addEventListener('DOMContentLoaded', () => {
    const mostVoted = localStorage.getItem('mostVotes')

    if (mostVoted) {
        const movieTitleEl = document.getElementById('movieTitle')
        const movieOverviewEl = document.getElementById('movieOverview')
        const moviePosterEl = document.getElementById('moviePoster')
        const movieDirectorEl = document.getElementById('movieDirector')
        const yearEl = document.getElementById('year')
        const movieGenreEl = document.getElementById('movieGenre')
        const movieRatingEl = document.getElementById('movieRating')
        const mainActorsEl = document.getElementById('mainActors')
        const movieRuntimeEl = document.getElementById('movieRuntime')
        const moviePlotEl = document.getElementById('moviePlot')

        movieTitleEl.textContent = mostVoted
        
    
        
        const fetchMovieDetails = async (movieId) => {
            const apiKeyTMDb = 'eb27c13c3073bd1a4e7f1f8f94714eaf'
            const apiKeyOMDb = '28a97e2f'
            try {
                let movieData
                
                // Fetch movie details from TMDb API
                const responseTMDb = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${apiKeyTMDb}&query=${encodeURIComponent(movieId)}`)
                const dataTMDb = await responseTMDb.json()

                if (dataTMDb.results && dataTMDb.results.length > 0) {
                    movieData = dataTMDb.results[0]
                } else {
                    const responseOMDb = await fetch(`http://www.omdbapi.com/?apikey=${apiKeyOMDb}&t=${encodeURIComponent(movieId)}`)
                    const dataOMDb = await responseOMDb.json()

                    if (dataOMDb.Title) {
                        movieData = dataOMDb
                    }
                }
                

                // Fetch movie details from OMDb API
                
                

                // Determining witch API to use
                

                if (movieData) {
                    movieOverviewEl.textContent = movieData.overview

                    movieDirectorEl.textContent = movieData.Director
                    yearEl.textContent = movieData.Year
                    movieGenreEl.textContent = movieData.Genre
                    movieRatingEl.textContent = movieData.Rating
                    movieRuntimeEl.textContent = movieData.Runtime
                    moviePlotEl.textContent = movieData.Plot
                    if (movieData.poster_path) {
                        moviePosterEl.src = `https://image.tmdb.org/t/p/w500${movieData.poster_path}`
                    }

                    if (movieData.Actors && typeof movieData.Actors === 'string') {
                        const actorList = movieData.Actors.split(',').map(actor => {
                            const actorItem = document.createElement('li')
                            actorItem.textContent = actor.trim()
                            return actorItem
                        })
                        mainActorsEl.innerHTML = ''
                        actorList.forEach(actorItem => mainActorsEl.appendChild(actorItem))
                    } else {
                        console.error('No actors received')
                    }
                    
                } else {
                    console.error('No movie data received')
                }
            } catch (error) { 
                console.error('Error fetching movie details: ', error)
            }
        }
    

        fetchMovieDetails(mostVoted)
    } else { 
        const errorEl = document.getElementById('error')
        errorEl.textContent = 'No movie received the most votes'
    }

    

})



