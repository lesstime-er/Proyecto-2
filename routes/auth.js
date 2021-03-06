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
    successRedirect: "/auth/redirectTo",
    failureRedirect: "/auth/login",
    failureFlash: true,
    passReqToCallback: true
}));

router.get("/redirectTo", (req, res) => {
    if (req.user.role == "Hospital") {
        res.redirect("/auth/Hospital")
        return
    } else if (req.user.role == "Consejeria") {
        res.redirect("/auth/Consejeria")
        return
    } else {
        res.redirect("/auth/acces")
        return
    }
})


router.get("/signup", (req, res, next) => {
    res.render("auth/login");
});

router.post("/signup", (req, res, next) => {

    const { username, password, role } = req.body;

    if (username === "" || password === "") {
        res.render("auth/login", { message: "Indicate username and password" });
        return;
    }

    User.findOne({ username }, "username", (err, user) => {
        if (user !== null) {
            res.render("auth/login", { message: "The username already exists", vista: "signup" });
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            password: hashPass,
            role
        });
        console.log(newUser)
        newUser.save()
            .then(() => {
                res.redirect("/auth/login")
            })
            .catch(err => {
                console.log(err)
                res.render("auth/login", { message: "Something went wrong" });
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
    const saltt = bcrypt.genSaltSync(bcryptSalt);
    const hashPasss = bcrypt.hashSync(password, saltt);
    console.log(req.body)
    console.log(username)
    User.findByIdAndUpdate(req.params.id, { $set: { username, password: hashPasss } }, { new: true })
        .then(users => {
            console.log(req.body)
            res.render("auth/acces")
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

        User.findByIdAndRemove(req.user._id)
            .then(() => {
                res.redirect("/auth/acces")
            })

    })
})



router.get("/show", (req, res) => res.render("auth/show"))
router.get("/update", (req, res) => res.render("auth/update"))
router.get("/Hospitalreviews/:id", (req, res) => {
        const { id } = req.params;
        Hospital.find()
            .then(hospitals => {
                const hospital = hospitals.find(hospital => hospital._id == id)
                console.log(hospital.review)
                res.render("auth/Hospitalreviews", { result: JSON.stringify(hospitals), hospital });
            })
            .catch(err => {
                console.log(err)
            })



    })
    // Post de reviews
router.post("/Hospitalreviews/:id", (req, res) => {
    const review = req.body.review
    console.log(review.length)
    if (review.length >= 140) {
        Hospital.find()
            .then(hospitals => {
                const hospital = hospitals.find(hospital => hospital._id == req.params.id)
                console.log(hospital.review)
                res.render("auth/Hospitalreviews", { result: JSON.stringify(hospitals), hospital, msg: "MAX 140 CHAR" });
            })
        return
    }
    console.log(req.user.username)
    Hospital.findByIdAndUpdate(req.params.id, { $push: { review: { review, author: req.user.username } } }, { new: true })
        .then((hospital) => {
            console.log(hospital.review)
            res.redirect(`/auth/Hospitalreviews/${hospital._id}`)
        })
        .catch(console.log)
})


router.get("/Userreviews", (req, res) => {

    Hospital.find()
        .then(hospitals => {
            res.render("auth/Userreviews", { result: JSON.stringify(hospitals) });
        })
        .catch(err => {
            console.log(err)
        })



})


// router.get("/acces", ifYouAuthenticated, (req, res) => res.render("auth/acces"))

function ifYouAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    } else {
        res.redirect("/")
    }

}

const checkUser = checkRoles('User');

router.get("/acces", [ifYouAuthenticated, checkUser], (req, res) => {

        Hospital.find()
            .then(hospitals => {
                console.log(hospitals)

                res.render('auth/acces', { result: JSON.stringify(hospitals) });

            })
            .catch(err => {
                console.log(err)
            })
    })
    //Roles

function checkRoles(role) {
    return function(req, res, next) {
        console.log(req.user, "user role", role, "role")

        if (req.isAuthenticated() && req.user.role === role) {
            return next();
        } else {
            res.redirect('/auth/login')
        }
    }
}
const checkConsejeria = checkRoles('Consejeria');
const checkHospital = checkRoles('Hospital');





router.get("/Consejeria", checkConsejeria, (req, res) => {
    console.log("entras!!!!!!")
    Hospital.find()
        .then(hospitals => {
            res.render("auth/Consejeria", { result: JSON.stringify(hospitals) });
        })
        .catch(err => {
            console.log(err)
        })

})
router.get("/Hospital", checkHospital, (req, res) => {

    Hospital.find()
        .then(hospitals => {
            res.render("auth/Hospital", { result: JSON.stringify(hospitals) });
        })
        .catch(err => {
            console.log(err)
        })
})






module.exports = router;