const OlympicWinnersController = require("../controllers/OlympicWinnerController")
const express = require("express")
const router = express.Router()

router.get("/allWinners", OlympicWinnersController.getAllWinners)
router.post("/addAthlete", OlympicWinnersController.InsertAthlete)
router.put("/updateAthlete/:id", OlympicWinnersController.updateAthlete)
router.delete("/deleteAthlete/:id", OlympicWinnersController.deleteAthlete)

module.exports = router