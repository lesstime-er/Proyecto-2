const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Hospital= require("../models/Hospital");
// Bcrypt to encrypt passwords
const bcrypt = require("bcrypt");
const bcryptSalt = 10;


router.get("/login", (req, res, next) => {
    res.render("auth/login", { "message": req.flash("error") });
});

router.post("/login", passport.authenticate("local", {
    successRedirect: "/auth/acces",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
}));



router.get("/signup", (req, res, next) => {
    res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username === "" || password === "") {
        res.render("auth/signup", { message: "Indicate username and password" });
        return;
    }

    User.findOne({ username }, "username", (err, user) => {
        if (user !== null) {
            res.render("auth/signup", { message: "The username already exists" });
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hashPass
        });
        console.log(newUser)
        newUser.save()
            .then(() => {
                res.redirect("/auth/acces");
            })
            .catch(err => {
                console.log(err)
                res.render("auth/signup", { message: "Something went wrong" });
            })
    });
});

router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
})

router.get("/update", (req, res) => {
    console.log(req.user, "<--------------")
    res.render("auth/update", { user: req.user })

})

router.post("/update/:id", (req, res) => {
    const { username, password } = req.body
    console.log(req.params.id)
    User.findByIdAndUpdate(req.params.id, { $set: { username, password } }, { new: true })
        .then(users => {
            console.log("Hola caracola")
            res.render("auth/update")
        })
        .catch(err => console.log(err))
})


router.get("/show", (req, res) => res.render("auth/show"))
<<<<<<< HEAD
    // router.get("/update", (req, res) => res.render("auth/update"))
=======
router.get("/update", (req, res) => res.render("auth/update"))
router.get("/acces", (req, res) => 
{
    Hospital.find()
  .then(hospitals => {
    res.render('auth/acces', {result: JSON.stringify(hospitals)});
  })
  .catch(err => {
    console.log(err)
  })
}
)
>>>>>>> cb2470e66adc14c7e01363b4493527b2eae67b99

module.exports = router;