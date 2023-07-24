const userSet = document.querySelector(".userSet");
const myButton = document.getElementById("myButton");
const movieAPI = document.querySelector('.movieList')
const numberOfUser = document.getElementsByClassName('numberOfUser')
const generateBtn = document.querySelector('.generatebtn')
const { classList: dropDownMenuClassList} = document.getElementById("dropDownMenu")
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
    generateBtn.disabled = true
    const movieListDiv = document.querySelector('.movieList');
  

    const movies = await shuffleMovies()
    console.log(movies)
    localStorage.setItem("randomMovies", JSON.stringify(movies))

    shuffleMovies().then((movies) => {
      movies.forEach((movie) => {
        const {poster_path,title,release_date,overview} = movie

        const moviePoster = document.createElement('img')
        moviePoster.classList.add('moviePoster')
        const posterURL = `https://image.tmdb.org/t/p/w500${poster_path}`
        moviePoster.src = posterURL
        movieListDiv.appendChild(moviePoster)


        const movieTitle = document.createElement('h3')
        movieTitle.textContent = title
        movieListDiv.appendChild(movieTitle)
    
        const movieReleaseDate = document.createElement('p')
        movieReleaseDate.textContent = release_date
        movieListDiv.appendChild(movieReleaseDate)
    
        const movieOverview = document.createElement('p')
        movieOverview.textContent = overview
        movieListDiv.appendChild(movieOverview)  
      })
      localStorage.setItem("randomMovies", JSON.stringify(movies));
    })
} catch (error) {
    console.error ("unable to get data", error)
  }
}

// Function to check if all users have voted and update the result button accordingly
const checkAndUpdateResultButton = () => {
  const numberOfUsers = parseInt(localStorage.getItem('numberOfUsers'));
  let usersVoted = 0;
  for (let i = 1; i <= numberOfUsers; i++) {
      const userVote = localStorage.getItem(`user${i}Vote`);
      if (userVote) {
          usersVoted++;
      }
  }

  if (usersVoted === numberOfUsers) {
      console.log('everyone at homepage')
      const getResultButton = document.createElement("button");
      getResultButton.innerHTML = "Get Result";
      getResultButton.addEventListener("click", () => {
          window.location.href = "results.html";
      });
      const movieListDiv = document.querySelector('.movieList');
      movieListDiv.appendChild(getResultButton);
  }
};

// Check if all users have voted when the page loads or when the number of users changes
window.addEventListener('DOMContentLoaded', checkAndUpdateResultButton);
window.addEventListener('storage', checkAndUpdateResultButton);

const toggleDropDown = () => dropDownMenuClassList.toggle("show");
myButton.addEventListener("click", toggleDropDown);

const showButtons = num => {
  
   
  userSet.innerHTML = ""; // Clear any previously displayed buttons

  for (let i = 1; i <= num; i++) {
    const userButton = document.createElement("a");
    userButton.classList.add("userButton");
    userButton.textContent = `User ${i}`;
    userButton.href = `voting.html?user=${i}`;
    userButton.target = "_blank";
    userSet.appendChild(userButton);
  }
  localStorage.setItem("numberOfUsers", num);
}

const dropdowns = document.getElementsByClassName("dropdown-content");
window.addEventListener("click", (event) => {
    if (!event.target.matches('.dropbtn')) {
      const dropdowns = document.querySelectorAll(".dropdown-content");
      dropdowns.forEach((openDropdown) => {
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      });
    }
  });
  

  function handleUserVote(userNumber, movieTitle) {
    localStorage.setItem(`user${userNumber}Vote`, movieTitle);
  }
