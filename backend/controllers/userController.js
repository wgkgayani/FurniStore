import User from "../models/user.js"; //use to import User model
import bcrypt from "bcrypt"; //bcrypt use karanne password hash karanna
import jwt from "jsonwebtoken";

export function createUser(req, res) {
  if (req.body.role == "admin") {
    //when user create account, first check user is admin or not
    if (req.user != null) {
      if (req.User.role != "admin") {
        res.status(403).json({
          massege: "Your are not authorized to create an admin account",
        });
        return; //stop below codes
      }
    } else {
      res.status(403).json({
        massege:
          "You are not authorized to create an admin accounts. Please login first",
      });
      return; //stop below codes
    }
  }

  const hashedPassword = bcrypt.hashSync(req.body.password, 10); //hash karanna password eka 10 times

  const user = new User({
    // methana User thamai model eke anthimt export karpu User
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: hashedPassword, //req.body.password    replace
    email: req.body.email,
    role: req.body.role || "customer", // Default to customer
  });

  user // use to save or not user data to database
    .save()
    .then(() => {
      res.json({
        message: "User ctrated successfuly",
      });
    })
    .catch(() => {
      res.json({
        massege: "Error saving user data",
      });
    });
}

export function loginUser(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  User.findOne({ email: email }).then((user) => {
    // console.log(user);

    if (user == null) {
      res.status(404).json({
        massege: "User not found",
      });
    } else {
      const isPasswordCorrect = bcrypt.compareSync(password, user.password);
      if (isPasswordCorrect) {
        // generate token and sed it to user
        const token = jwt.sign(
          {
            email: user.email,
            role: user.role,
            firstName: user.firstName,
            lastName: user.lastName,
            img: user.img,
          },
          "first.mern.course.encript.password",
        );

        res.json({
          message: "login successful",
          //user: user,               show user details in db
          token: token,
        });
      } else {
        res.status(401).json({
          message: "Invalid password",
        });
      }
    }
  });
}

export function isAdmin(req) {
  if (req.user == null) {
    return false;
  }
  if (req.user.role != "admin") {
    return false;
  }
  return true;
}
