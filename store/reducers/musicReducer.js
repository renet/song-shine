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

const addCreatedArtists = (allArtists, songArtists) =>
  songArtists.map(({ id, name }) => {
    if (id === name) {
      const newId = uuidv4();

      allArtists[newId] = { id: newId, name };

      return newId;
    }

    return id;
  });

export default createReducer(
  {
    artists: {},
    songs: {}
  },
  {
    [addSong]: ({ artists, songs }, { payload }) => {
      const { id, artists: songArtists } = payload;
      const song = { ...payload };

      if (songArtists) {
        song.artists = addCreatedArtists(artists, songArtists);
      }

      songs[id] = song;
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
        song.artists = addCreatedArtists(artists, songArtists);
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
