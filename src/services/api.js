// import axios from "axios";
// const url = "https://api.themoviedb.org/3";
// export const fetchTrendingMovies = async (page = 1) => {
//   const results = await axios.get(url, {
//     headers: {
//       // Замість api_read_access_token вставте свій токен
//       Authorization:
//         "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Njk5MzUyYzE0MGExOTExNmUzM2FkMzFjNDc4N2Q1YiIsIm5iZiI6MTczODcwNzI5OS4xMjIsInN1YiI6IjY3YTI5MTYzYWVlZTVjMGUyNTlmYzI5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B56BWVctRpL5Z701VZS4FdsYyExck09jE5fd9RrW5Ws",
//     },
//     params: {
//       key: "8699352c140a19116e33ad31c4787d5b",
//       page: page,
//       per_page: 15,
//     },
//   });
//   return results;
// };
// axios.defaults.baseURL = "https://api.themoviedb.org/3";
// const ACCESS_KEY =
//   "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Njk5MzUyYzE0MGExOTExNmUzM2FkMzFjNDc4N2Q1YiIsIm5iZiI6MTczODcwNzI5OS4xMjIsInN1YiI6IjY3YTI5MTYzYWVlZTVjMGUyNTlmYzI5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B56BWVctRpL5Z701VZS4FdsYyExck09jE5fd9RrW5Ws";

// axios.defaults.headers.common.Authorization = `Bearer ${ACCESS_KEY}`;
// export const fetchMovies = async () => {
//   const { data } = await axios.get("/configuration");
//   console.log(data);

//   return data;
// };

// const options = {
//   headers: {
//     // Замість api_read_access_token вставте свій токен
//     Authorization:
//       "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Njk5MzUyYzE0MGExOTExNmUzM2FkMzFjNDc4N2Q1YiIsIm5iZiI6MTczODcwNzI5OS4xMjIsInN1YiI6IjY3YTI5MTYzYWVlZTVjMGUyNTlmYzI5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B56BWVctRpL5Z701VZS4FdsYyExck09jE5fd9RrW5Ws",
//   },
// };

// axios
//   .get(url, options)
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));

// export const fetchPosters = async () => {
//   try {
//     const response = await axios.get("/configuration");
//     const { images } = response.data;
//     return images.base_url;
//   } catch (error) {
//     console.error("Error fetching image configuration:", error);
//     return null;
//   }
// };
// axios
//   .get(url, options)
//   .then((response) => console.log(response))
//   .catch((err) => console.error(err));
// https://api.themoviedb.org/3/movie/{movie_id}
// https://api.themoviedb.org/3/search/movie
// https://api.themoviedb.org/3/trending/movie/{time_window}
// https://api.themoviedb.org/3/movie/{movie_id}/credits
// https://api.themoviedb.org/3/movie/{movie_id}/reviews

// axios.defaults.baseURL = 'https://dummyjson.com';

// export const fetchUsers = async () => {
//   const { data } = await axios.get('users');
//   return data.users;
// };

// export const fetchUserById = async userId => {
//   const { data } = await axios.get(`users/${userId}`);
//   return data;
// };

// export const fetchPostsByUserId = async userId => {
//   const { data } = await axios.get(`/posts/user/${userId}`);
//   return data.posts;
// };

// export const fetchPosters = async () => {
//   try {
//     const response = await axios.get("/configuration");
//     const { images } = response.data;
//     return images.base_url;
//   } catch (error) {
//     console.error("Error fetching image configuration:", error);
//     return null;
//   }
// };
import axios from "axios";
// const url = "https://api.themoviedb.org/3";
axios.defaults.baseURL = "https://api.themoviedb.org/3";
const ACCESS_KEY =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4Njk5MzUyYzE0MGExOTExNmUzM2FkMzFjNDc4N2Q1YiIsIm5iZiI6MTczODcwNzI5OS4xMjIsInN1YiI6IjY3YTI5MTYzYWVlZTVjMGUyNTlmYzI5OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.B56BWVctRpL5Z701VZS4FdsYyExck09jE5fd9RrW5Ws";

axios.defaults.headers.common.Authorization = `Bearer ${ACCESS_KEY}`;
export const fetchImages = async () => {
  try {
    const response = await axios.get("/configuration");
    const { images } = response.data;
    console.log(images);

    return images.base_url;
    // console.log(images.base_url);
  } catch (error) {
    console.error("Error fetching image configuration:", error);
    return null;
  }
};

export const fetchTrendingMovies = async () => {
  try {
    const base_url = await fetchImages();
    const file_size = "w500";
    const { data } = await axios.get("/trending/movie/day", {
      params: { language: "en-US", page: 1 },
    });
    const moviesWithPosters = data.results.map((movie) => ({
      ...movie,
      posterUrl: movie.poster_path
        ? `${base_url}${file_size}${movie.poster_path}`
        : null,
    }));
    return moviesWithPosters;
  } catch (error) {
    console.error("Error fetching trending movies:", error);
    return [];
  }
};

export const fetchMovies = async () => {
  try {
    const base_url = await fetchImages();
    const file_size = "w500";
    const { data } = await axios.get("/search/movie", {
      params: {
        language: "en-US",
        page: 1,
        include_adult: false,
        query: "world",
        poster_path: "",
      },
    });
    const moviesWithPosters = data.results.map((movie) => ({
      ...movie,
      posterUrl: movie.poster_path
        ? `${base_url}${file_size}${movie.poster_path}`
        : null,
    }));
    // console.log(data);
    return moviesWithPosters;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

export const searchMovie = async (query) => {
  try {
    const { data } = await axios.get("/search/movie", {
      params: {
        language: "en-US",
        page: 1,
        include_adult: false,
        query: query,
      },
    });
    return data.results;
  } catch (error) {
    console.error("Error searching movies:", error);
    return [];
  }
};
//
export const fetchMoviesById = async (movieId) => {
  try {
    const { data } = await axios.get(`movie/${movieId}`, {
      params: {
        language: "en-US",
      },
    });
    return data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

//api.themoviedb.org/3/movie/movie_id?language=en-US";

//api.themoviedb.org/3/movie?movie_id=822119&language=en-US
// http://image.tmdb.org/t/p/w500/pzIddUEMWhWzfvLI3TwxUG2wGoi.jpg

export const fetchReviewsById = async (movieId) => {
  try {
    const { data } = await axios.get(`movie/${movieId}/reviews`, {
      params: {
        language: "en-US",
        // page: 1,
      },
    });
    console.log(data);

    return data.results;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};

export const fetchCastById = async (movieId) => {
  try {
    const { data } = await axios.get(`movie/${movieId}/credits`, {
      params: {
        language: "en-US",
        // page: 1,
      },
    });
    console.log(data);

    return data.cast;
  } catch (error) {
    console.error("Error fetching reviews:", error);
    return [];
  }
};
