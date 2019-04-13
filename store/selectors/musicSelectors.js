import { createSelector } from "redux-starter-kit";
import { denormalize } from "normalizr";
import { getSelectedId } from "./pageSelectors";
import { songSchema } from "../schemas";

export const getAllArtists = createSelector(
  ["music.artists"],
  artists => Object.values(artists)
);
export const getAllSongs = createSelector(
  ["music.songs", "music.artists"],
  (songs, artists) =>
    Object.values(songs).map(song => denormalize(song, songSchema, { artists }))
);
export const getSelectedArtist = createSelector(
  ["music.artists", getSelectedId],
  (artists, id) => artists[id] || {}
);
export const getSelectedSong = createSelector(
  ["music.songs", getSelectedId, "music.artists"],
  (songs, id, artists) => denormalize(songs[id], songSchema, { artists }) || {}
);
export const getSongsBySelectedArtist = createSelector(
  [getAllSongs, getSelectedArtist],
  (songs, artist) =>
    songs.filter(({ artists }) =>
      artists.map(({ id }) => id).includes(artist.id)
    )
);
