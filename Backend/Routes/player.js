'use strict';
const router = require('express').Router();
const { Player } = require("../config/db");

// GET ALL
router.get("/getAll", (req, res, next) => {
    Player.find((err, players) => {
        if (err) {
            next(err);
        }
        res.send(players);
    });
});

// GET ONE
router.get("/get/:id", (req,res,next) => {
    Player.findById(req.params.id, (err,result) => {
        if(err){
            next(err);
        }
        res.status(200).send(result);
    })
})

// CREATE
router.post("/create", (req, res, next) => {
    const item = new Player(req.body);
    item.save()
        .then((result) => {
            res.status(201).send(`${result.firstName} ${result.lastName} has been added to the datatbase!`)
        })
        .catch((err) => next(err));
});

// DELETE
router.delete("/delete/:id", (req, res, next) => {
    Player.findByIdAndDelete(req.params.id, (err) => {
        if(err){
            next(err);
        }
        res.status(204).send(`Player successfully deleted`);
    });
});

// PARTIAL UPDATE
router.patch("/update/:id", (req, res, next) => {
    Player.findByIdAndUpdate(req.params.id, 
     req.body, 
     {new: true}, 
     (err) => {
        if(err){
            next(err);
        }
        res.status(202).send(`Player successfully updated!`);
    })
 });

// REPLACE
router.put("/replace/:id", (req,res,next) => {
    const {firstName, lastName, primaryPosition, secondaryPosition, team, age} = req.query;
    Player.findByIdAndUpdate(req.params.id, {firstName, lastName, primaryPosition, secondaryPosition, team, age}, {new: true}, (err)=>{
        if(err){
            next(err);
        }
        res.status(202).send(`Player successfully replaced!`);
    });
});

module.exports = router;