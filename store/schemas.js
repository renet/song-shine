import { schema } from "normalizr";

const artist = new schema.Entity("artists");
export const artistsSchema = [artist];
export const songSchema = { artists: artistsSchema };
export const songsSchema = [songSchema];
