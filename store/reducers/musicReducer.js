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
    [updateSongDetails]: ({ songs, artists }, { payload }) => {
      const { details, id } = payload;
      const { title, artists: songArtists, year } = details;
      const song = songs[id];

      if (title) {
        song.title = title;
      }

      if (songArtists) {
        song.artists = songArtists.map(({ id, name }) => {
          if (id === name) {
            const newId = uuidv4();

            artists[newId] = { id: newId, name };

            return newId;
          }

          return id;
        });
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
