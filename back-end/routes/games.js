var express = require("express");
var router = express.Router();
const db = require("../models");
const GameService = require("../services/GameService");

const gameService = new GameService(db);


router.get("/", async function (req, res, next) {
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




router.get("/search", async function (req, res, next) {
    try {
        const getAllCate = await gameService.searchAllCata(req.query);

        res.status(200).json({
            status: "success",
            statusCode: 200,
            data: {
                result: getAllCate
            }
        });
    } catch (err) {
    next(err);
    }
});

router.get("/:id", async function (req, res, next) {
    try {
        const getGame = await gameService.getGameById(req.params.id);

        res.status(200).json({
            status: "success",
            statusCode: 200,
            data: {
                result: getGame
            }
        });
    } catch (err) {
    next(err);
    }
});






module.exports = router; 