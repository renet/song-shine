import { createSelector } from "redux-starter-kit";
import { getSelectedId } from "./pageSelectors";

export const getAllArtists = createSelector(
  ["music.artists"],
  artists => artists
);
export const getAllSongs = createSelector(
  ["music.songs"],
  songs => songs
);
export const getSelectedArtist = createSelector(
  [getAllArtists, getSelectedId],
  (artists, id) => {
    return artists[id] || {};
  }
);
export const getSelectedSong = createSelector(
  [getAllSongs, getSelectedId],
  (songs, id) => {
    return songs[id] || {};
  }
);
