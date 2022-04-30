import fetch from "node-fetch";
import { Movie } from "../models/Movie.js";
import { query } from "../db/index.js";
import { dateFromString } from "../lib/date.js";

const { MOVIES_API_KEY } = process.env;

const addMovie = async (req, res) => {
  console.log("AddMovie controller");

  try {
    //TODO: Provide error handling
    console.dir(req.body);
    const { userId, name, role } = req.encoded;
    const { title } = req.body;
    await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${MOVIES_API_KEY}`)
      .then((fetchResponse) => fetchResponse.json())
      .then((responseJSON) => {
        const { Response } = responseJSON;
        if (Response === "False" || Response === "false") {
          // TODO: Refactor
          return Promise.reject(new Error(`Movie ${title} hasnt been found.`));
        } else {
          const newMovie = new Movie(
            {
              ...responseJSON,
              Released: dateFromString(responseJSON.Released),
            },
            userId
          );
          return newMovie.createMovie();
        }
      })
      .then((rows) => {
        console.dir(rows);
        res.status(201).send(`Successfully added record for ${title}`);
      });
  } catch (error) {
    console.error("addMovie", error);
    res.status(200).send({
      message: `${title} hasn't been found in OMDb database.`,
    });
  }
};

const getAllCreatedByUser = async (req, res) => {
  console.log("getAllCreatedByUser controller");

  const { userId } = req.encoded;
  try {
    const { rows } = await query(
      "SELECT title, released, genre, director, userid, created_at FROM movies WHERE userId=$1",
      [userId]
    );
    if (rows) {
      console.log(rows);
      res.json(rows);
    }
  } catch (error) {
    console.error("getAllCreatedByUser", error);
    res.status(500).send({
      message: "There was an error at getAll controller.",
    });
  }
};

export { addMovie, getAllCreatedByUser };
