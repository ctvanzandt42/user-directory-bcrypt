const express = require("express");
const profileRoutes = express.Router();
const Robot = require("../models/Robot");

profileRoutes.get("/:id", (req, res) => {
    Robot.findById(req.params.id).then(foundRobot => {
        !foundRobot
            ? res.status(500).send("This robot not found")
            : res.render("profile", { robot: foundRobot });
    });
});

profileRoutes.get("/skills/:skillName", (req, res) => {
    Robot.find({ skills: req.params.skillName }).then(foundRobots => {
        !foundRobots
            ? res.status(500).send("No robots found")
            : res.render("home", { robots: foundRobots });
    });
});

profileRoutes.get("/country/:countryName", (req, res) => {
    Robot.find({
        "address.country": req.params.countryName
    }).then(foundRobots => {
        !foundRobots
            ? res.status(500).send("No robots found")
            : res.render("home", { robots: foundRobots });
    });
});

module.exports = profileRoutes;