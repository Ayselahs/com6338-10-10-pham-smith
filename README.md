# com6338-10-10-pham-smith
Group Project: Movie Planner

Overview:

First page (Homepage): The user can simply click on "Generate Movies" to get four randomized movies from The Movie Database API (1st API). The movies will show the poster image, the release date, and the overview. When the user sees a movie that is interested to them, they can click on the card and it will save to their Favorites list.

Second page (Favorites): On this page, the user can see all the movies that they have added in chronological order. Each movie shows the release date, title, "View Details" option, and remove. If they no longer want to save a movie, they can click "Remove"

Third page (View Details): When the user wants to get more information on a movie that they have added, clicking "View Details" from Favorites will take them to this page which shows the poster img, title, overview, details such as genre, rating, runtim, plot, and main actors. This page is receiving the information from Rotten Tomatoes API (2nd API)


Notes: 

Initially, the plan was to create an app where the user can generate the movies, select number of users, and the users can vote on which movie from the list they would like to see on a separate tab. Once all the users are done, the data would be sent back to the homepage notifying all votes are in and trigger a Get Result button. From the Get Result button, it will take the user(s) to a new page that shows the winning movie along with the movie details. Any winning movie will then be added to the History page. 

As the application was developing, a major setback was the voting data being sent to Homepage. The very first vote would trigger the Get Result button because it counted the first vote as the all the votes. If there were three users, the first vote would registered that the remainder two users also vote on the same movie and trigger the Get Result button to appear on DOM. After many attempts throughout a few days, the voting process was removed due to limited time. 



