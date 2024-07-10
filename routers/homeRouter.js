const express = require("express");
const Router = express.Router();
const homeSchema = require("../models/homeSchema");

Router.get("/", (req, res) => {
  res.render("register", { title: "Fill Form", password: "", email: "" });
});

Router.post("/register", async (req, res) => {
  try {
    const { name, number, email, password, cpassword } = req.body;

    if (password === cpassword) {
      const useremail = await homeSchema.findOne({ email: email });

      if (useremail) {
        res.render("register", {
          title: "",
          password: "",
          email: "Email is already in use. Please choose a different one.",
        });
      } else {
        const userData = new homeSchema({
          name,
          number,
          email,
          password,
        });

        await userData.save();
        res.render("register", { title: "Done", password: "", email: "" });
      }
    } else {
      res.render("register", {
        title: "",
        password: "Passwords do not match.",
        email: "",
      });
    }
  } catch (error) {
    console.error(error);
    res.render("register", { title: "Error in Code", password: "", email: "" });
  }
});

// signin

Router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await homeSchema.findOne({ email: email });

    if (result && email === result.email && password === result.password) {
      res.render("dashbord", { name: result.name });
    } else {
      res.render("register", {
        title: "",
        password: "",
        email: "Invalid email or password.",
      });
    }
  } catch (err) {
    console.error(err);
    res.render("register", { title: "Error in Code", password: "", email: "" });
  }
});

module.exports = Router;
