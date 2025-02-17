// import React from "react";
import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";
const MovieList = ({ movies }) => {
  const location = useLocation();

  console.log(movies);
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";
  return (
    <ul className={s.list}>
      {movies.map((movie) => (
        <li className={s.item} key={movie.id}>
          <Link to={`/movies/${movie.id.toString()}`} state={location}>
            <img
              src={
                movie.poster_path
                  ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                  : defaultImg
              }
              alt={movie.title}
            />
            {movie.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
