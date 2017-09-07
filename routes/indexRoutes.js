const express = require("express");
const indexRoutes = express.Router();
const Robot = require("../models/Robot");

indexRoutes.get("/", (req, res) => {
    Robot.find().then(foundRobots => {
        !foundRobots
            ? res.status(500).send("No Robots Found.")
            : res.render("home", { robots: foundRobots });
    });
});

indexRoutes.get("/forHire", (req, res) => {
    Robot.find({ job: null }).toArray((err, forHireBots) => {
        if (err) res.status(500).send(err);
        res.render("home", { users: forHireBots });
    });
});

indexRoutes.get("/employed", (req, res) => {
    Robot.find({ job: { $ne: null } }).toArray((err, employedBots) => {
        if (err) res.status(500).send(err);
        res.render("home", { users: employedBots });
    });
});

module.exports = indexRoutes;