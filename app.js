var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    mongoose = require("mongoose"),
    Course = require("./modals/course"),
    User = require("./modals/User"),
    asyncLoop = require("node-async-loop");

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);
app.use(express.static("public"));
app.set("view engine", "ejs");

mongoose
    .connect(
        "mongodb+srv://tanvesh01:dedsec01@academia-wysgv.mongodb.net/test?retryWrites=true&w=majority",
        {
            useNewUrlParser: true,
            useCreateIndex: true,
        }
    )
    .then(() => {
        console.log("connected to DB");
    })
    .catch((err) => {
        console.log("ERROR:", err.message);
    });
// Passport Config
app.use(
    require("express-session")({
        secret: "tanu is the best",
        resave: false,
        saveUninitialized: false,
    })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Course.create(
//     {
//         name: "6.046-Intro to algorithms",
//         link:
//             "https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-046j-introduction-to-algorithms-sma-5503-fall-2005/",
//         image:
//             "https://pbs.twimg.com/profile_images/912676696620359680/e-G5lqVs_400x400.jpg",
//         type: "Video lectures",
//     },
//     function (err, course) {
//         if (err) {
//             console.lof(err);
//         } else {
//             console.log(course);
//         }
//     }
// );

// Course.create(
//     {
//         name: "CS50 lectures by Stanford University",
//         link:
//             "https://www.youtube.com/playlist?list=PLhQjrBD2T381L3iZyDTxRwOBuUt6m1FnW",
//         image:
//             "https://prod-discovery.edx-cdn.org/media/course/image/0c675c29-54ee-42ff-ac95-01f53450bc8b-aaffd76ac491.small.jpg",
//         type: "Video lectures",
//     },
//     function (err, course) {
//         if (err) {
//             console.lof(err);
//         } else {
//             console.log(course);
//         }
//     }
// );
//Auth routes ===============================================
app.get("/register", (req, res) => {
    res.render("./authViews/register");
});

app.post("/register", (req, res) => {
    var newUser = new User({
        username: req.body.username,
    });
    User.register(newUser, req.body.password, (err, user) => {
        if (err) {
            console.log(err);
            return res.render("./authViews/register");
        }
        passport.authenticate("local")(req, res, function () {
            res.redirect("/all");
        });
    });
});

app.get("/login", function (req, res) {
    res.render("./authViews/login");
});

app.post(
    "/login",
    passport.authenticate("local", {
        successRedirect: "/all",
        failureRedirect: "/login",
    }),
    function (req, res) {}
);

app.get("/logout", (req, res) => {
    req.logOut();
    res.redirect("/");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

//==========================================================
app.get("/", (req, res) => {
    res.render("home");
});

app.get("/dashboard", isLoggedIn, (req, res) => {
    User.findById(req.user._id)
        .populate("courses")
        .exec(function (err, user) {
            if (err) {
                console.log(err);
            } else {
                //console.log(user.username);
                res.render("dashboard", {
                    courses: user.courses,
                    name: user.username,
                });
            }
        });
});

app.get("/all", isLoggedIn, (req, res) => {
    Course.find({}, function (err, course) {
        if (err) {
            cconsole.log(err);
        } else {
            res.render("all_courses", {
                courses: course,
            });
        }
    });
});

app.get("/all/:id", (req, res) => {
    User.findById(req.user._id, function (err, user) {
        if (err) {
            console.log(err);
        } else {
            console.log(user);
            Course.findById(req.params.id, (err, foundCourse) => {
                if (err) {
                    console.log(err);
                } else {
                    var present = false;
                    //===========================
                    asyncLoop(
                        user.courses,
                        function (item, next) {
                            const e = item;
                            console.log(foundCourse._id);
                            if (e == foundCourse._id) {
                                present = true;
                            }
                            next();
                        },
                        function (err) {
                            if (err) {
                                console.error("Error: " + err.message);
                                return;
                            }

                            console.log("Finished!");
                        }
                    );
                    //===========================
                    console.log(present);
                    if (!present) {
                        user.courses.push(foundCourse);
                        user.save((err, data) => {
                            if (err) {
                                console.log(err);
                            } else {
                                console.log(data);
                                res.redirect("/all");
                            }
                        });
                    }
                }
            });
        }
    });
});

// app.listen(3000, () => {
//     console.log("Academia has started!!");
// });

app.listen(process.env.PORT, process.env.IP, function () {
    console.log("This shit started!!!!!!");
});
