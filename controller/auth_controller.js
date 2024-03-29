let database = require("../database.json");
const passport = require("../middleware/passport");
const userController = require("./user_controller")

let authController = {
    login: (req, res) => {
        res.render("auth/login");
    },

    register: (req, res) => {
        res.render("auth/register");
    },

    loginSubmit: passport.authenticate("local", {
        successRedirect: "/teams",
        failureRedirect: "/login",
    }),

    registerSubmit: (req, res) => {
        const isManager = req.body.isManager == "true" ? true : false;
        const user = {
            id: database.players.length + 1,
            fname: req.body.firstName,
            lname: req.body.lastName,
            gender: req.body.gender,
            sport: req.body.sport,
            skill: req.body.skill,
            dob: req.body.dob,
            email: req.body.email,
            password: req.body.password,
            picture: null,
            social_link: req.body.social_link,
            isManager: isManager,
            requestedTeams: [],
            joinedTeams: []
        };
        database.players.push(user);
        res.redirect("/login");
    },

    logout: (req, res) => {
        req.logout(() => res.redirect("/login"))
    }
}

module.exports = authController;