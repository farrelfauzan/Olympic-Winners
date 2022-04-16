const models = require("../models")
const olympic_winners = models.OlympicWinners

class OlympicWinnersController {

    static getAllWinners (req,res){
        olympic_winners.findAll()
            .then((result) => {
                res.status(200).json(result)   
            }).catch((err) => {
                res.status(500).json({
                    message:"Internal Server Error"
                })
            });
    }


    static InsertAthlete (req,res){
        let data = req.body

        olympic_winners.create(data)
            .then((result) => {
                res.status(201).json(result)
            }).catch((err) => {
                res.status(500).json(err)
            });
    }

    static deleteAthlete (req,res){
        let id = req.params.id

        olympic_winners.destroy({
            where:{
                id:id
            }
        })
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json(err)
            });
    }

    static updateAthlete (req,res){
        let data = req.body
        let id = req.params.id

        olympic_winners.update(data,{
            where:{
                id:id
            }
        })
            .then((result) => {
                res.status(200).json(result)
            }).catch((err) => {
                res.status(500).json(err)
            });
    }

}

module.exports = OlympicWinnersController