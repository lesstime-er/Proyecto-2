const express = require("express");
const passport = require('passport');
const router = express.Router();
const User = require("../models/User");
const Hospital = require("../models/Hospital");
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
    console.log(req.body)
    console.log(username)
    User.findByIdAndUpdate(req.params.id, { $set: { username, password } }, { new: true })
        .then(users => {
            console.log(req.body)
            res.render("auth/update")
        })
        .catch(err => console.log(err))
})
router.get("/delete", ifYouAuthenticated, (req, res) => res.render("auth/delete"))
    // Middleware de passport**************
function ifYouAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect("/")
    }

}




router.post("/delete", (req, res) => {
    console.log("he pasado por el post del delete")
    const username = req.body.username;
    const password = req.body.password;
    if (username === "" || password === "") {
        res.render("auth/delete", { message: "Indicate username and password" });
        return;
    }
    console.log(req.user)
    User.findById(req.user._id, (err, user) => {
        console.log(req.user)
            // if (password != user.password) {
            //     res.render("auth/delete", { message: "The password is n ot correct" });
            //     return;
            // }
        User.findByIdAndRemove(req.user._id)
            .then(() => {
                res.redirect("/auth/acces")
            })

    })
})



router.get("/show", (req, res) => res.render("auth/show"))
router.get("/update", (req, res) => res.render("auth/update"))
    // router.get("/acces", ifYouAuthenticated, (req, res) => res.render("auth/acces"))

function ifYouAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect("/")
    }

}

router.get("/acces", ifYouAuthenticated, (req, res) => {

    Hospital.find()
        .then(hospitals => {
            res.render('auth/acces', { result: JSON.stringify(hospitals) });
        })
        .catch(err => {
            console.log(err)
        })
})


module.exports = router;