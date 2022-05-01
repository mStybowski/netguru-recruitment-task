import { query } from '../db/index.js';

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
      throw new Error("Couldn't create movie!");
    }
  }
}

export { Movie };
