import CreateActor from "./actors/CreateActor";
import EditActor from "./actors/EditActor";
import IndexActors from "./actors/IndexActors";
import Login from "./auth/Login";
import Register from "./auth/Register";
import CreateGenre from "./genres/CreateGenre";
import EditGenre from "./genres/EditGenre";
import IndexGenres from "./genres/IndexGenres";
import CreateMovie from "./movies/CreateMovie";
import EditMovie from "./movies/EditMovie";
import FilterMovies from "./movies/FilterMovies";
import LandingPage from "./movies/LandingPage";
import MovieDetails from "./movies/MovieDetails";
import CreateMovieTheaters from "./movietheaters/CreateMovieTheaters";
import EditMovieTheater from "./movietheaters/EditMovieTheater";
import IndexMovieTheaters from "./movietheaters/IndexMovieTheaters";
import RedirectToLandingPage from "./utils/RedirectToLandingPage";

const routes = [
  //Genres
  {path: "/genres", component: IndexGenres, exact: true, isAdmin: true },
  {path: "/genres/create", component: CreateGenre, isAdmin: true},
  {path: "/genres/edit/:id", component: EditGenre, isAdmin: true},

  //Actors
  {path: "/actors", component: IndexActors, exact: true, isAdmin: true},
  {path: "/actors/create", component: CreateActor, isAdmin: true},
  {path: "/actors/edit/:id", component: EditActor, isAdmin: true},

  //Movie Theaters
  {path: "/movietheaters", component: IndexMovieTheaters, exact: true, isAdmin: true},
  {path: "/movietheaters/create", component: CreateMovieTheaters, isAdmin: true},
  {path: "/movietheaters/edit/:id", component: EditMovieTheater, isAdmin: true},

  //Movie CRUD
  {path: "/movies/create", component: CreateMovie, isAdmin: true},
  {path: "/movies/edit/:id", component: EditMovie, isAdmin: true},
  {path: "/movies/filter", component: FilterMovies},

  //Movie Details
  {path: "/movie/:id", component: MovieDetails},

  //Security
  {path: "/register", component: Register},
  {path: "/login", component: Login},

  //Main Route
  {path: "/", component: LandingPage, exact: true},

  //Catch All parameter
  {path: "*", component: RedirectToLandingPage},
];

export default routes;
