import { createAction } from "redux-starter-kit";

export const addSong = createAction("song/add");
export const deleteSong = createAction("song/delete");
export const duplicateSong = createAction("song/duplicate");
export const updateSongDetails = createAction("song/details/update");
export const updateSongText = createAction("song/text/update");

export const addArtist = createAction("artist/add");
export const updateArtist = createAction("artist/update");
