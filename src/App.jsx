import "./App.css";
import "modern-normalize";
import { Routes, Route } from "react-router-dom";
// import HomePage from "../src/pages/HomePage/HomePage";
// import MoviesPage from "../src/pages/MoviesPage/MoviesPage";
// import NotFoundPage from "../src/pages/NotFoundPage/NotFoundPage";
// import MovieCast from "../src/components/MovieCast/MovieCast";
// import MovieReviews from "../src/components/MovieReviews/MovieReviews";
import Navigation from "./components/Navigation/Navigation";
import { lazy, Suspense } from "react";
// import MovieDetailsPage from "./pages/MovieDetailsPage/MovieDetailsPage";

const HomePage = lazy(() => import("../src/pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("../src/pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(() =>
  import("../src/pages/NotFoundPage/NotFoundPage")
);
const MovieCast = lazy(() => import("../src/components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../src/components/MovieReviews/MovieReviews")
);

function App() {
  return (
    <div>
      <Navigation />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
            {/* <Route path="/movies/:movieId/cast" element={<MovieCast />} /> */}
            {/* <Route path="/movies/:movieId/reviews" element={<MovieReviews />} /> */}
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
