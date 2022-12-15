import {
  ADD_MOVIE_TO_LIST,
  REMOVE_MOVIE_TO_LIST,
  FILTER_MOVIES,
  SET_LINKACTIVE,
} from "../actions/actions-type";

const initialState = {
  listMovies: [],
  movies: [],
  linkActive: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case FILTER_MOVIES:
      return { ...state, movies: payload };
    case ADD_MOVIE_TO_LIST:
      const movie = state.movies.find((item) => item.imdbID === payload);
      const listMovies = [...state.listMovies, { ...movie }];
      return { ...state, listMovies };
    case REMOVE_MOVIE_TO_LIST:
      const newListMovies = state.listMovies.filter(
        (item) => item.imdbID !== payload
      );
      return { ...state, listMovies: newListMovies };
    case SET_LINKACTIVE:
      return { ...state, linkActive: payload };
    default:
      return state;
  }
};
