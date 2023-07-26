const userSet = document.querySelector(".userSet");
const myButton = document.getElementById("myButton");
const movieAPI = document.querySelector('.movieList')
//const numberOfUser = document.getElementsByClassName('numberOfUser')
const generateBtn = document.querySelector('.generatebtn')
const { classList: dropDownMenuClassList} = document.getElementById("dropDownMenu")



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
    const movieListDiv = document.getElementById('movieListContainer');
    movieListDiv.innerHTML = ""
  

    const movies = await shuffleMovies()
    console.log(movies)
    localStorage.setItem("randomMovies", JSON.stringify(movies))

    shuffleMovies().then((movies) => {
      movies.forEach((movie) => {
        
        const {poster_path,title,release_date,overview} = movie

        // Create a Bootstrap card for each movie
        const movieCard = document.createElement('div')
        movieCard.classList.add('col')

        const cardInner = document.createElement('div')
        cardInner.classList.add('card', 'shadow-sm')


        const moviePoster = document.createElement('img')
        moviePoster.classList.add('bd-placeholder-img', 'card-img-top', 'img-fluid')
        const posterURL = `https://image.tmdb.org/t/p/w500${poster_path}`
        moviePoster.src = posterURL
        cardInner.appendChild(moviePoster)

        const cardBody = document.createElement('div')
        cardBody.classList.add('card-body')


        const movieTitle = document.createElement('h5')
        movieTitle.classList.add('card-title')
        movieTitle.textContent = title
        cardBody.appendChild(movieTitle)
    
        const movieReleaseDate = document.createElement('p')
        movieReleaseDate.classList.add('card-text')
        movieReleaseDate.textContent = release_date
        cardBody.appendChild(movieReleaseDate)
    
        const movieOverview = document.createElement('p')
        movieOverview.classList.add('card-text')
        movieOverview.textContent = overview
        cardBody.appendChild(movieOverview)  

        cardInner.appendChild(cardBody)
        movieCard.appendChild(cardInner)
        movieListDiv.appendChild(movieCard)
      })
      localStorage.setItem("randomMovies", JSON.stringify(movies));
    })
} catch (error) {
    console.error ("unable to get data", error)
  }
}

let resultBtnAppended = false;

const numberOfUsers = parseInt(localStorage.getItem('numberOfUsers'));
let votesReceived = 0

window.addEventListener("message", handleUserMessage);

function handleUserMessage(e) {
  if (e.data.type === "userVote") {
    const { userNumber, selectedMovie } = e.data;
    localStorage.setItem(`user${userNumber}Vote`, selectedMovie)
    console.log("error 1!")
  } else if (e.data.type === "allUsersVoted") {
    checkAndUpdateResultButton()
    console.log("error 2!")
  }
}

// Function to check if all users have voted and update the result button accordingly

// NEED TO FOCUS ON THIS FUNCTION - THIS IS WHERE THE ERROR FOR THE GET RESULT BUTTON IS!
const checkAndUpdateResultButton = () => {
  const numberOfUsers = parseInt(localStorage.getItem('numberOfUsers'));
  let usersVoted = 0;
  for (let i = 1; i <= numberOfUsers; i++) {
      console.log("error 3 (for loop)!")
      const userVote = localStorage.getItem(`user${i}Vote`);
      if (userVote) {
          usersVoted++;
      }
      console.log("error 4 (for loop)!")
  }

  if (usersVoted === numberOfUsers && !resultBtnAppended) {
      resultBtnAppended = true;
      console.log('everyone at homepage')
      const getResultButton = document.createElement("button");
      
      getResultButton.innerHTML = "Get Result";
      getResultButton.classList.add("btn", "btn-primary");
      getResultButton.addEventListener("click", () => {
          window.location.href = "results.html";
          console.log("error 5!")
      });
      const buttonHolder = document.getElementById('buttonHolder');
      
      buttonHolder.appendChild(getResultButton);
      
  }
};

// Check if all users have voted when the page loads or when the number of users changes
//window.addEventListener('DOMContentLoaded', checkAndUpdateResultButton);
window.addEventListener('storage', checkAndUpdateResultButton);


// Dropdown menu functions below, do not need to fixed

const toggleDropDown = () => dropDownMenuClassList.toggle("show");
myButton.addEventListener("click", toggleDropDown);

const showButtons = num => {
  
   
  userSet.innerHTML = ""; // Clear any previously displayed buttons

  for (let i = 1; i <= num; i++) {
    const userButton = document.createElement("a");
    userButton.classList.add("btn", "btn-primary");
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
