const express = require("express");
const authRoutes = express.Router();
const Robot = require("../models/Robot");
const bcrypt = require("bcryptjs");

authRoutes.get("/signup", (req, res) => {
    res.render("signup");
});

authRoutes.post("/signup", (req, res) => {
    let newRobot = new Robot(req.body);
    let salt = bcrypt.genSaltSync(10);
    newRobot.password = bcrypt.hashSync(newRobot.password, salt);
    newRobot
        .save()
        .then(
        savedRobot =>
            !savedRobot
                ? res.status(500).send("Error saving Robot!")
                : res.redirect("/auth/login")
        );
});

authRoutes.get("/login", (req, res) => {
    res.render("login");
});

authRoutes.post("/login", (req, res) => {
    let reqUsername = req.body.username;
    let reqPassword = req.body.password;

    Robot.findOne({ username: reqUsername }).then(function (foundRobot) {
        if (!foundRobot) {
            return res.render("login", { errors: ["No Robot found."] });
        }

        const authorized = bcrypt.compareSync(reqPassword, foundRobot.password);

        if (!authorized) {
            return res.render("login", { errors: ["Password does not match."] });
        }

        delete foundRobot.password;
        req.session.user = foundRobot;
        res.redirect("/user/profile");
    });
});

module.exports = authRoutes;