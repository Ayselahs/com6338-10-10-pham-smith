// Voting.js

  
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
    const selectedMovie = document.querySelector(`input[name=user${userNumber}Vote]:checked`);
    if (selectedMovie) {
      alert(`User ${userNumber} voted successfully for "${selectedMovie.value}"!`);
      // Update local storage to indicate that this user has voted
      localStorage.setItem(`user${userNumber}Vote`, selectedMovie.value);

      // Check if all users have voted and send the message if necessary
      const usersVoted = Array.from({ length: numberOfUsers }, (_, i) => i + 1)
        .filter(user => localStorage.getItem(`user${user}Vote`)).length;
        
      if (usersVoted === numberOfUsers) {
        // Send message to homepage to indicate all users have voted
        window.parent.postMessage({ allUsersVoted: true }, '*');
        localStorage.setItem('allUsersVoted', 'true');
        console.log('everyone voted from voting')
      }

      // Close the voting tab after voting
      window.close();
    } else {
      alert("Please select a movie before clicking Done.");
    }
  });

  votingFormPage.appendChild(doneButton);
  votingPageContainer.appendChild(votingFormPage);
});
