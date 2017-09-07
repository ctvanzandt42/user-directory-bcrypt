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

module.exports = indexRoutes;