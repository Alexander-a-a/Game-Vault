var express = require("express");
var router = express.Router();
const db = require("../models");
const GameService = require("../services/GameService");

const gameService = new GameService(db);


router.get("/test", async function (req, res, next) {
    try {
        const response = "hello!"

        res.status(200).json({
            status: "success",
            statusCode: 200,
            data: {
                result: response
            }
        });
    } catch (err) {
    next(err);
    }
});


router.get("/t", async function (req, res, next) {
    try {
        const testAPI = await gameService.initGame();

        res.status(200).json({
            status: "success",
            statusCode: 200,
            data: {
                result: testAPI
            }
        });
    } catch (err) {
    next(err);
    }
});



module.exports = router; 