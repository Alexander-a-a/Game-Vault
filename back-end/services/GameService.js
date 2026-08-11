class GameService {
  constructor(db) {
    this.axios = require("axios");
    this.dotenv = require("dotenv");
  }

  async initGame() {
    try {

        const response = await this.axios.post("https://id.twitch.tv/oauth2/token?", null, {
            params: {
                client_id: process.env.IGDB_CLIENT_ID,
                client_secret: process.env.IGDB_CLIENT_SECRET,
                grant_type: "client_credentials",
            }
        });

        const accesstoken = response.data.access_token;
        console.log(accesstoken); // TEST TEST 


        const gameReq = await this.axios.post("https://api.igdb.com/v4/games", "fields *;", {
          headers: {
            "Client-ID": process.env.IGDB_CLIENT_ID,
            "Authorization": `Bearer ${accesstoken}`
          }
        });

        console.log(gameReq.data);
        return gameReq.data;

    } catch (err) {
      err.httpStatus = err.httpStatus || 500;
      err.code = err.code || "APP_INTERNAL";
      throw err;
    }
  }
}

module.exports = GameService;