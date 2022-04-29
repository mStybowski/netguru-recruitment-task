// const db = require("../config/database.js");
import fetch from "node-fetch";

const { MOVIES_API_KEY } = process.env;

const addMovie = async (req, res) => {
  console.log("AddMovie controller");
  const { userId, name, role } = req.encoded;
  const { title } = req.body;
  try {
    //TODO: Provide error handling
    await fetch(`https://www.omdbapi.com/?t=${title}&apikey=${MOVIES_API_KEY}`)
      .then((fetchResponse) => fetchResponse.json())
      .then(({ Title, Released, Genre, Director }) =>
        res
          .status(201)
          .send(
            `Successfully fetched ${Title} released at ${Released} which is ${Genre} by ${Director}`
          )
      );
  } catch (error) {
    console.error("addMovie", error);
    res.status(500).send({
      message: "There was an error at addMovie controller.",
    });
  }
};

const getAllCreatedByUser = async (req, res) => {
  console.log("getAllCreatedByUser controller");

  const { userId, name, role } = req.decoded;
  try {
    res.status(200).send(`Successfully got all movies created by user ${name}`);
  } catch (error) {
    console.error("getAllCreatedByUser", error);
    res.status(500).send({
      message: "There was an error at getAll controller.",
    });
  }
};

export { addMovie, getAllCreatedByUser };
