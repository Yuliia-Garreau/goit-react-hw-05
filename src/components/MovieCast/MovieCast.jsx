// /movies/:movieId/cast – компонент MovieCast,
// інформація про акторський склад. Рендериться
// в нижній частині на сторінці MovieDetailsPage.

// import React from 'react'

import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCastById } from "../../services/api";
import s from "./MovieCast.module.css";
const MovieCast = () => {
  // const { movieId } = useParams();
  // useEffect(() => {
  //   if (!movieId) return;
  // }, [movieId]);
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchCastById(movieId);
      console.log(data);

      setCast(data);
    };
    getData();
  }, [movieId]);
  const defaultImg =
    "https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster";
  return (
    <div>
      <h2 className={s.title}>Cast</h2>
      <ul className={s.list}>
        {cast.map((item) => (
          <li className={s.container} key={item.id}>
            <img
              // className={s.profile}
              className={s["profile-picture"]}
              src={
                item.profile_path
                  ? `https://image.tmdb.org/t/p/w500/${item.profile_path}`
                  : defaultImg
              }
              // width={300}
              alt={item.name}
            />
            <div className={s.info}>
              <p className={s.name}>
                <span className={s.span}></span>
                {item.name}
              </p>
              <p className={s.character}>
                <span className={s.span}>Character: </span>
                {item.character}
              </p>
            </div>
            {/* <p className={s.content}>{item.content}</p> */}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
