const express = require("express");
const employedRoutes = express.Router();
const Robot = require("../models/Robot");

employedRoutes.get("/forhire", (req, res) => {
    Robot.find({ job: null }).then(foundRobots => {
        !foundRobots
            ? res.status(500).send("No matching Robots")
            : res.render("home", { robots: foundRobots });
    });
});

employedRoutes.get("/employed", (req, res) => {
    Robot.find({ job: { $not: { $in: [null] } } }).then(foundRobots => {
        !foundRobots
            ? res.status(500).send("No matching Robots")
            : res.render("home", { robots: foundRobots });
    });
});

module.exports = employedRoutes;