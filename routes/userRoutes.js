const express = require("express");
const Robot = require("../models/Robot");
const userRoutes = express.Router();

userRoutes.get("/profile", (req, res) => {
    res.render("userPage", { robot: req.session.user });
});

userRoutes.post("/edit/:id", (req, res) => {
    Robot.findByIdAndUpdate(req.params.id, req.body).then(updatedRobot => {
        !updatedRobot
            ? res.send({ msg: "Could not update Robot" })
            : res.redirect("/user/profile");
    });
});
module.exports = userRoutes;