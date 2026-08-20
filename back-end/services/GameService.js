class GameService {
  constructor(db) {
    this.axios = require("axios");
    this.dotenv = require("dotenv");
  }

  // Get all games
  async initGame() {
    try {
      const response = await this.axios.post(
        "https://id.twitch.tv/oauth2/token?",
        null,
        {
          params: {
            client_id: process.env.IGDB_CLIENT_ID,
            client_secret: process.env.IGDB_CLIENT_SECRET,
            grant_type: "client_credentials",
          },
        },
      );

      const accesstoken = response.data.access_token;

      const gameReq = await this.axios.post(
        "https://api.igdb.com/v4/games",
        "fields *;",
        {
          headers: {
            "Client-ID": process.env.IGDB_CLIENT_ID,
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );

      return gameReq.data;
    } catch (err) {
      err.httpStatus = err.httpStatus || 500;
      err.code = err.code || "APP_INTERNAL";
      throw err;
    }
  }

  // Get game by Id
  async getGameById(gameId) {
    if (!gameId) {
      const err = new Error("GameId is required");
      err.httpStatus = 400;
      err.code = "APP_BAD_REQUEST";
      throw err;
    }

    const gameIdNorm = Number(gameId);

    if (!Number.isInteger(gameIdNorm) || gameIdNorm <= 0) {
      const err = new Error("GameId must be a positive integer");
      err.httpStatus = 400;
      err.code = "APP_BAD_REQUEST";
      throw err;
    }
    try {
      const response = await this.axios.post(
        "https://id.twitch.tv/oauth2/token?",
        null,
        {
          params: {
            client_id: process.env.IGDB_CLIENT_ID,
            client_secret: process.env.IGDB_CLIENT_SECRET,
            grant_type: "client_credentials",
          },
        },
      );

      const accesstoken = response.data.access_token;
      console.log(accesstoken); // TEST TEST

      const gameReq = await this.axios.post(
        "https://api.igdb.com/v4/games",
        `fields *; where id = ${gameIdNorm};`,
        {
          headers: {
            "Client-ID": process.env.IGDB_CLIENT_ID,
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );

      return gameReq.data;
    } catch (err) {
      err.httpStatus = err.httpStatus || 500;
      err.code = err.code || "APP_INTERNAL";
      throw err;
    }
  }

  // Search all endpoints
  async searchAllCata(payload) {
    const { search } = payload;

    const searchQ = (search || "").trim();

    if (!searchQ) {
      const err = new Error("Search cannot be empty");
      err.httpStatus = 400;
      err.code = "APP_BAD_REQUEST";
      throw err;
    }

    try {
      const response = await this.axios.post(
        "https://id.twitch.tv/oauth2/token?",
        null,
        {
          params: {
            client_id: process.env.IGDB_CLIENT_ID,
            client_secret: process.env.IGDB_CLIENT_SECRET,
            grant_type: "client_credentials",
          },
        },
      );

      const accesstoken = response.data.access_token;

      const gameReq = await this.axios.post(
        "https://api.igdb.com/v4/search",
        `fields *; search "${searchQ}";`,
        {
          headers: {
            "Client-ID": process.env.IGDB_CLIENT_ID,
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );

      return gameReq.data;
    } catch (err) {
      err.httpStatus = err.httpStatus || 500;
      err.code = err.code || "APP_INTERNAL";
      throw err;
    }
  }

  // Search by name

  // Search by genres

  // Search by rating
  async searchByRating(operator, rating) {

    const allowedOps = [">", "<", ">=", "<=", "="];

    if (!operator) {
      const err = new Error("Operator is required");
      err.httpStatus = 400;
      err.code = "APP_BAD_REQUEST";
      throw err;
    }
    if (!rating) {
      const err = new Error("Rating is required");
      err.httpStatus = 400;
      err.code = "APP_BAD_REQUEST";
      throw err;
    }

    if (!allowedOps.includes(operator)) {
      const err = new Error("Operator can only be >, <, >=, <=, =");
      err.httpStatus = 400;
      err.code = "APP_BAD_REQUEST";
      throw err;
    }

    const ratingNorm = Number(rating);

    if (!Number.isInteger(ratingNorm) || ratingNorm < 0) {
      const err = new Error("Rating must be between 0 and 100");
      err.httpStatus = 400;
      err.code = "APP_BAD_REQUEST";
      throw err;
    }

    if (ratingNorm > 100) {
      const err = new Error("Rating cannot be larger than 100");
      err.httpStatus = 400;
      err.code = "APP_BAD_REQUEST";
      throw err;
    }
    try {
      const response = await this.axios.post(
        "https://id.twitch.tv/oauth2/token?",
        null,
        {
          params: {
            client_id: process.env.IGDB_CLIENT_ID,
            client_secret: process.env.IGDB_CLIENT_SECRET,
            grant_type: "client_credentials",
          },
        },
      );

      const accesstoken = response.data.access_token;

      const gameReq = await this.axios.post(
        "https://api.igdb.com/v4/games",
        `fields *; where rating ${operator} ${ratingNorm};`,
        {
          headers: {
            "Client-ID": process.env.IGDB_CLIENT_ID,
            Authorization: `Bearer ${accesstoken}`,
          },
        },
      );

      return gameReq.data;
    } catch (err) {
      err.httpStatus = err.httpStatus || 500;
      err.code = err.code || "APP_INTERNAL";
      throw err;
    }
  }
}

module.exports = GameService;
