// Fetch movie details from TMDB API
const fetchMovieDetails = async (movieId) => {
    const apiKey = 'APIKEY'
    const url = 'URL'

    try {
        const response = await fetch(url)
        const data = await response.json()
        return data
    } catch (error) { 
        console.error('Error fetching movie details: ', error)
    }
}

// Display movie data on the web page
