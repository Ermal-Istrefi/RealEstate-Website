if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const mongoose = require("mongoose");
const flash = require("express-flash");
const session = require("express-session");
const passport = require("passport");
const methodOverride = require("method-override");
const initializePassport = require("./config/passport-config");
const authRoutes = require("./routes/auth");
const { checkAuthenticated } = require("./middleware/auth");

const app = express();


mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });


  initializePassport(passport);

  app.set("view-engine", "ejs");
  app.use(express.urlencoded({ extended: false }));
  app.use(flash());
  app.use(session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(methodOverride("_method"));
  
  app.use("/api/auth", authRoutes);
  
  app.get("/", checkAuthenticated, (req, res) => {
      res.render("index.ejs", { name: req.user.name });
  });
  
  app.delete("/logout", (req, res) => {
      req.logout(req.user, err => {
          if (err) return next(err);
          res.redirect("/");
      });
  });

const PORT = process.env.PORT || 5004;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
