

// Get from local storage
// TMDb API: eb27c13c3073bd1a4e7f1f8f94714eaf
// OMDb API: 28a97e2f

const fetchTMDb = async (movieId, apiKeyTMDb) => {
    try {
        const res = await fetch (`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKeyTMDb}`)
        const movieData = await res.json()
        return movieData
    } catch (error) {
        console.error ('Unable to get data', error)
        return null
    }
}

const fetchOMDb = async (title, apiKeyOMDb) => {
    try {
        console.log(movieTitle)
        const res = await fetch (`https://www.omdbapi.com/?apikey=${apiKeyOMDb}&t=${encodeURIComponent(title)}`)
        const movieData = await res.json()
        return movieData
    } catch (error) {
        console.error ('Unable to get data', error)
        return null
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search)
    const movieId = urlParams.get('movieId')
    const apiKeyTMDb = 'eb27c13c3073bd1a4e7f1f8f94714eaf'
    const apiKeyOMDb = '28a97e2f'

    fetchTMDb(movieId, apiKeyTMDb)
    .then((movieDataTMDb) => {
        if (movieDataTMDb) {
            console.log(movieDataTMDb)


            const movieTitle = document.getElementById('movieTitle')
            const moviePoster = document.getElementById('moviePoster')
            const movieOverview = document.getElementById('movieOverview')

            movieTitle.textContent = movieDataTMDb.title
            moviePoster.src = `https://image.tmdb.org/t/p/w500${movieDataTMDb.poster_path}`
            movieOverview.textContent = movieDataTMDb.overview
            
            fetchOMDb(movieTitle.textContent, apiKeyOMDb)
            .then((movieDataOMDb) => {
                if (movieDataOMDb) {
                    console.log(movieDataOMDb)

                    const movieDirector = document.getElementById('movieDirector')
                    const year = document.getElementById('year')
                    const movieGenre = document.getElementById('movieGenre')
                    const movieRating = document.getElementById('movieRating')
                    const movieRuntime = document.getElementById('movieRuntime')
                    const moviePlot = document.getElementById('moviePlot')
                    const mainActors = document.getElementById('mainActors')

                    movieDirector.textContent = movieDataOMDb.Director
                    year.textContent = movieDataOMDb.Year
                    movieGenre.textContent = movieDataOMDb.Genre
                    movieRating.textContent = movieDataOMDb.Rated
                    movieRuntime.textContent = movieDataOMDb.Runtime
                    moviePlot.textContent = movieDataOMDb.Plot

                    if (movieDataOMDb.Actors && typeof movieDataOMDb.Actors === 'string') {
                        const actorList = movieDataOMDb.Actors.split(',').map((actor) => {
                            const actorName = document.createElement('li')
                            actorName.textContent = actor.trim()
                            return actorName
                        })
                        mainActors.innerHTML = ''
                        actorList.forEach((actorName) => {
                            mainActors.appendChild(actorName)
                        })
                    } else {
                        console.error('Unable to get movie actors from OMDb')
                    }
                    
                } else {
                    console.error('Unable to get movie data from OMDb')
                }
            })
            .catch((error) => {
                console.error('Unable to get data from OMDb', error)
            })
        } else {
            console.error('Unable to get data from TMDb')
        }
    })
    .catch((error) => {
        console.error('Unable to get data from TMDb', error)
    })
})

    