import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { fetchMovies, searchMovie } from "../../services/api";
import { useSearchParams } from "react-router-dom";
import s from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  // const { movieId } = useParams();
  // useEffect(() => {
  //   if (!movieId) return;
  // }, [movieId]);
  useEffect(() => {
    const query = searchParams.get("query");
    if (!query) return;
    const getMoviesData = async () => {
      const data = await searchMovie(query);
      setMovies(data);
    };
    getMoviesData();
  }, [searchParams]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.query.value;
    setSearchParams({ query: value });
  };

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit}>
        <input className={s.input} type="text" name="query" />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>
      <MovieList movies={movies} />
    </div>
  );
};

export default MoviesPage;

// Під  на сторінці MoviesPage виконуємо лише в useEffect !!
