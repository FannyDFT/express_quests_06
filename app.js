require("dotenv").config();
const port = process.env.APP_PORT ?? 5001;

const { application } = require("express");
const express = require("express");

const app = express();

app.use(express.json());

//Affiche "Welcome ... " dans le serveur
const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers"); //Importe le fichier "movieHandler"
const usersHandler = require("./usersHandler"); // Import du fichier "userHandlers"

// Méthode GET (movies)
app.get("/api/movies", movieHandlers.getMovies); //Affiche les différents films
app.get("/api/movies/:id", movieHandlers.getMovieById); // Sélectionne un film en particulier

//Métode GET (users)
app.get("/api/users", usersHandler.getUsers);
app.get("/api/users/:id", usersHandler.getUsersById);

//Méthode POST (movies)
app.post("/api/movies", movieHandlers.postMovies);

//Méthode POST (users)
app.post("/api/users", usersHandler.postUser);

//Méthode PUT (movies)
app.put("/api/movies/:id", movieHandlers.putMovie);

//Méthode PUT (users)
app.put("/api/users/:id", usersHandler.putUsers);

//Méthode DELETE (movies)
app.delete("/api/movies/:id", movieHandlers.deleteMovies);

//Méthode DELETE (users)
app.delete("/api/users/:id", usersHandler.deleteUsers);

//Ecoute du port
app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
