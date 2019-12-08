const router = require("express").Router();
const user = require("../models/registration_model");
router.get("/", function(req, res) {
  user
    .find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json("Error: " + err));
});
router.post("/auth", function(req, res) {
  console.log(req);
  user
    .find({
      email: req.body.useremail,
      password: req.body.userpassword
    })
    .then(users => {
      console.log(users);
      res.json(users);
    })
    .catch(err => res.status(400).json("Error: " + err));
});
router.post("/add", function(req, res) {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const contact = req.body.contact;
  // console.log(req);
  const newuser = new user({
    name,
    email,
    password,
    contact
  });
  // newuser
  //   .save()
  //   .then(() => res.json("user added"))
  //   .catch(err => res.status(400).json("Error: " + err));

  user
    .find({
      email: email
    })
    .then(users => {
      // console.log(users[0]);
      if (users[0]) {
        res.json("user already exists");
      } else {
        newuser
          .save()
          .then(() => res.json("user added"))
          .catch(err => res.status(400).json("Error: " + err));
      }
      // res.json(users);
    })
    .catch(err => res.status(400).json("Error: " + err));
});
router.put("/update/:id", function(req, res) {
  user.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, usr) => {
    // Handle any possible database errors
    if (err) return res.status(500).send(err);
    else return res.send(usr);
  });
  console.log(req.body, req.params.id);
});
module.exports = router;
