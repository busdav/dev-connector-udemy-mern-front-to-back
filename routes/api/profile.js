const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");


const Profile = require("../../models/Profile");
const User = require("../../models/User");


// @route   GET api/profile/me
// @desc    Get current user's profile
// @access  Private
router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }) // `user` pertains to the `user` reference field of the Profile model
      .populate("user", ["name", "avatar"]); // We also want to populate this query with `name` and `avatar` from the `user` model
 
    if(!profile) {
      return res.status(400).json({ msg: "There is no profile for this user" });
    }

    res.json(profile);
 
  } catch(err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// @route   POST api/profile
// @desc    Create or update user profile
// @access  Private
router.post("/", [ auth, [
  check("status", "Status is required").not().isEmpty(),
  check("skills", "Skills is required").not().isEmpty()
  ] 
], 
async (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const {
    company,
    website,
    location,
    bio,
    status,
    githubusername,
    skills,
    youtube,
    facebook,
    twitter,
    instagram,
    linkedin
  } = req.body;

  // Build profile object
  const profileFields = {};

});

module.exports = router;