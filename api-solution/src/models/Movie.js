import { query } from "../db/index.js";

// function Movie({ Title, Released, Genre, Director }, userId) {
//   this.title = Title;
//   this.released = Released;
//   this.genre = Genre;
//   this.director = Director;
//   this.userId = userId;
// }

// Movie.prototype.createMovie = async () => {
//   try {
//     const { rows } = await query(
//       `INSERT INTO movies(title, released, genre, director, userId)
//             VALUES ($1, $2, $3, $4)`,
//       [this.title, this.released, this.genre, this.director, this.userId]
//     );
//     return rows;
//   } catch (error) {
//     throw error;
//   }
// };

class Movie {
  constructor({ Title, Released, Genre, Director }, userId) {
    this.title = Title;
    this.released = Released;
    this.genre = Genre;
    this.director = Director;
    this.userId = userId;
  }

  async createMovie() {
    try {
      console.dir(this);
      const { rows } = await query(
        `INSERT INTO movies(title, released, genre, director, userId) 
              VALUES ($1, $2, $3, $4, $5)`,
        [this.title, this.released, this.genre, this.director, this.userId]
      );
      return rows;
    } catch (error) {
      throw error;
    }
  }
}

export { Movie };
