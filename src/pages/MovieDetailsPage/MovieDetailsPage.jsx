import { useEffect, useRef, useState } from "react";
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { fetchMoviesById } from "../../services/api";
import s from "./MovieDetailsPage.module.css";
import clsx from "clsx";

// '/movies/:movieId' – компонент MovieDetailsPage,
// сторінка із детальною інформацією про кінофільм.

// /movies/:movieId/cast – компонент MovieCast, інформація про акторський склад. Рендериться в нижній частині на сторінці MovieDetailsPage.
// /movies/:movieId/reviews – компонент MovieReviews, інформація про огляди. Рендериться в нижній частині на сторінці MovieDetailsPage.

// import React from 'react'

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  // console.log(params);
  const [movie, setMovie] = useState(null);
  // console.log(movie);
  // const navigate = useNavigate();
  const location = useLocation();
  const gobackUrl = useRef(location?.state ?? "/movies");
  useEffect(() => {
    const getData = async () => {
      const data = await fetchMoviesById(movieId);

      setMovie(data);
    };
    getData();
  }, [movieId]);
  if (!movie) return <h2>Loading...</h2>;
  console.log(movie);
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };
  return (
    <div>
      {/* <Link to={location.state?.from ?? "/"}>Go back</Link> */}
      <Link to={gobackUrl.current}>Go back</Link>

      {/* <button onClick={() => navigate(-1)}>Go back</button> */}
      <h2 className={s.title}>{movie.title}</h2>
      <div className={s.container}>
        <div className={s.poster}>
          {/* <p>{movie.poster_path}</p> */}
          <img
            className={s["poster-picture"]}
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : defaultImg
            }
            width={300}
            alt={movie.title}
          />
        </div>
        <div className={s.info}>
          <p>
            <span className={s.span}>Release date:</span> {movie.release_date}
          </p>
          <p>
            <span className={s.span}>User score:</span> {movie.vote_average}
          </p>
          {/* <p>{movie.vote_count}</p> */}
          <p>
            <span className={s.span}>Popularity:</span> {movie.popularity}
          </p>

          <p>
            <span className={s.span}>Genres:</span>{" "}
            {movie.genres.map((genre) => genre.name)}
          </p>
          <p>
            <span className={s.span}>Produced by:</span>{" "}
            {movie.production_companies.map((company) => company.name)}
          </p>
          <p>
            <span className={s.span}>Overwiew:</span> {movie.overview}
          </p>
        </div>
      </div>
      <nav className={s.nav}>
        {/* <NavLink to="cast" className={s["nav-item"]}> */}
        <NavLink to="cast" className={buildLinkClass}>
          Cast
        </NavLink>
        <NavLink to="reviews" className={buildLinkClass}>
          Reviews
        </NavLink>
      </nav>
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
