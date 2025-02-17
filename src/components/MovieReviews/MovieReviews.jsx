// /movies/:movieId/reviews – компонент MovieReviews,
// інформація про огляди. Рендериться в нижній частині на
// сторінці MovieDetailsPage.

import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { fetchReviewsById } from "../../services/api";
import s from "./MovieReviews.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  // const { movieId } = useParams();
  // useEffect(() => {
  //   if (!movieId) return;
  // }, [movieId]);
  useEffect(() => {
    const getData = async () => {
      const data = await fetchReviewsById(movieId);
      console.log(data);

      setReviews(data);
    };
    getData();
  }, [movieId]);
  return (
    <div>
      <h2 className={s.title}>Reviews</h2>
      <ul className={s.list}>
        {reviews.map((item) => (
          <li className={s.container} key={item.id}>
            <p className={s.author}>
              <span>Author: </span>
              {item.author}
            </p>
            <p className={s.content}>{item.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieReviews;
