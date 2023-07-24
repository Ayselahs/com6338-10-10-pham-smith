let usersVoted = 0;

document.addEventListener("DOMContentLoaded", function() {
  const urlParams = new URLSearchParams(window.location.search);
  const userNumber = urlParams.get('user');
  const votingPageContainer = document.querySelector('.votingPage');


  // Retrieve the number of users and the randomly generated movies from local storage
  const numberOfUsers = parseInt(localStorage.getItem('numberOfUsers'));
  const movies = JSON.parse(localStorage.getItem('randomMovies'));

  // Display the movies and the voting form for the specific user on the voting page
  const votingFormPage = document.createElement('form');

  movies.forEach((movie, index) => {
    const { title } = movie;

    const movieLabel = document.createElement('label');
    movieLabel.innerHTML = title;
    movieLabel.setAttribute('for', `movie${index}`);

    const movieInput = document.createElement('input');
    movieInput.type = 'radio';
    movieInput.name = `user${userNumber}Vote`;
    movieInput.value = title;

    votingFormPage.appendChild(movieInput);
    votingFormPage.appendChild(movieLabel);
    votingFormPage.appendChild(document.createElement('br'));
  });

  const doneButton = document.createElement('button');
  doneButton.innerHTML = 'Done!';
  doneButton.addEventListener("click", () => {
    alert(`User ${userNumber} voted successfully!`);
    usersVoted++;
    
    if (usersVoted === numberOfUsers) {
      
      const getResultButton = document.createElement("button");
      getResultButton.innerHTML = "Get Result";
      getResultButton.addEventListener("click", () => {
        window.location.href = "results.html"
      })
      votingPageContainer.appendChild(getResultButton)
      window.close();
    }
  });

  votingFormPage.appendChild(doneButton);
  votingPageContainer.appendChild(votingFormPage);
});
