import { createReducer } from "redux-starter-kit";
import uuidv4 from "uuid/v4";

import {
  addArtist,
  addSong,
  deleteSong,
  duplicateSong,
  updateArtist,
  updateSongDetails,
  updateSongText
} from "../actions/musicActions";

export default createReducer(
  {
    artists: {},
    songs: {}
  },
  {
    [addSong]: ({ songs }, { payload }) => {
      const id = uuidv4();

      songs[id] = { ...payload, id };
    },
    [deleteSong]: ({ songs }, { payload }) => {
      delete songs[payload];
    },
    [duplicateSong]: ({ songs }, { payload }) => {
      const id = uuidv4();

      songs[id] = { ...songs[payload], id };
    },
    [updateSongDetails]: ({ songs }, { payload }) => {
      const { details, id } = payload;
      const { title, artists, year } = details;
      const song = songs[id];

      if (title) {
        song.title = title;
      }

      if (artists) {
        song.artists = artists;
      }

      if (year) {
        song.year = year;
      }
    },
    [updateSongText]: ({ songs }, { payload }) => {
      const { id, text } = payload;

      songs[id].text = text;
    },
    [addArtist]: ({ artists }, { payload }) => {
      const id = uuidv4();

      artists[id] = { ...payload, id };
    },
    [updateArtist]: ({ artists }, { payload }) => {
      const { id, name } = payload;

      artists[id].name = name;
    }
  }
);
