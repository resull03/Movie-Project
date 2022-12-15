import axios from "axios";
import { baseUrl } from "../constants";
import {
  ADD_MOVIE_TO_LIST,
  REMOVE_MOVIE_TO_LIST,
  FILTER_MOVIES,
  SET_LINKACTIVE,
} from "./actions-type";

export const addFilterMovies = (payload) => ({
  type: FILTER_MOVIES,
  payload,
});

export const addMoive = (payload) => ({
  type: ADD_MOVIE_TO_LIST,
  payload,
});

export const removeMovie = (payload) => ({
  type: REMOVE_MOVIE_TO_LIST,
  payload,
});

export const setLinkActive = (payload) => ({
  type: SET_LINKACTIVE,
  payload,
});

export const getMovieList = async (searchLine) => {
  const apiKey = "1fa733f1";
  const res = await axios.get(baseUrl + `?s=${searchLine}&apikey=${apiKey}`);
  const data = res.data.Search;
  if (!data) {
    throw console.log("Error");
  }
  return data;
};
