import { useEffect } from "react";
import MovieList from "../../components/MovieList/MovieList";
import { useState } from "react";
import { fetchTrendingMovies } from "../../services/api";
import s from "./HomePage.module.css";
const HomePage = () => {
  const [movies, setMovies] = useState([]);
  // const [error, setError] = useState(null);
  // useEffect(() => {
  //   const getMoviesData = async () => {
  //     const data = await fetchTrendingMovies();
  //     console.log(data);

  //     setMovies(data);
  //     console.log(setMovies(data));
  //   };
  //   getMoviesData();
  // }, []);
  useEffect(() => {
    document.title = "Home";
    const fetchMovies = async () => {
      try {
        const fetchedMovies = await fetchTrendingMovies();
        setMovies(fetchedMovies);
      } catch (err) {
        setError("Failed to load trending movies.");
        console.error(err);
      }
    };

    fetchMovies();
  }, []);
  return (
    <div>
      <h1 className={s.header}>Trending movies</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default HomePage;
