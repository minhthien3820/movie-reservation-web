import {
  LIST_MOVIE_FAILED,
  LIST_MOVIE_REQUEST,
  LIST_MOVIE_SUCCESS,
} from "./constant";

let initialState = {
  loading: false,
  listMovieNow: null,
  listMovieComing: null,
  err: null,
};

const listMovieReducer = (state = initialState, action) => {
  switch (action.type) {
    case LIST_MOVIE_REQUEST:
      state.loading = true;
      state.listMovie = null;
      state.err = null;
      return { ...state };
    case LIST_MOVIE_SUCCESS:
      state.loading = false;
      if (action.filmType === "now") {
        state.listMovieNow = action.payload;
      } else {
        state.listMovieComing = action.payload;
      }
      state.err = null;
      return { ...state };
    case LIST_MOVIE_FAILED:
      state.loading = false;
      state.listMovie = null;
      state.err = action.payload;
      return { ...state };

    default:
      return { ...state };
  }
};

export default listMovieReducer;
