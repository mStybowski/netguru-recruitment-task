import fetch from "node-fetch";
import { Movie } from "../models/Movie.js";
import { query } from "../db/index.js";
import { dateFromString } from "../lib/date.js";
import { respondWithJSON } from "../lib/respond.js";

const { MOVIES_API_KEY } = process.env;

const addMovieController = async (req, res) => {
  const { userId, name } = req.encoded;
  const { title } = req.body;
  try {
    const responseJSON = await fetchMovieData(title);
    await createMovieRecord(responseJSON, userId);
    respondWithJSON(res, 201, `${name} Successfully added record for ${title}`);
  } catch (error) {
    respondWithJSON(res, 404, `We are sorry ${name}, but ${title} could not be added to DB.`);
  }
};

async function createMovieRecord(data, userId) {
  const movie = new Movie(
    {
      ...data,
      Released: dateFromString(data.Released),
    },
    userId
  );
  await movie.createMovie();
}

async function fetchMovieData(title) {
  const response = await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${MOVIES_API_KEY}`);
  const responseJSON = await response.json();
  const { Response } = responseJSON;
  if (!Response || Response === "False" || Response === "false") {
    throw new Error("No movie data at OMDb.");
  } else {
    return responseJSON;
  }
}

const getMoviesController = async (req, res) => {
  const { userId } = req.encoded;
  try {
    const { rows } = await query("SELECT title, released, genre, director, userid, created_at FROM movies WHERE userId=$1", [userId]);
    if (rows) {
      res.status(200).json(rows);
    }
  } catch (error) {
    console.error("getMoviesController", error);
    respondWithJSON(res, 500, "There was an error at getAll controller.");
  }
};

export { addMovieController, getMoviesController };
