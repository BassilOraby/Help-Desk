import express from 'express'
import Info from "../models/signUpSchema.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import crypto from "crypto"
import nodemailer from "nodemailer"

const router = express.Router();
const {genSalt, hash, compare} = bcrypt
const {sign, verify} = jwt


// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'margarett.howe75@ethereal.email', // generated ethereal user
    pass: 'D7x4ZwBBVVkwcMeAzc', // generated ethereal password
  },
});

// register

router.post("/signup", async (req, res) => {
  try {
    const {userName, email, password, passwordConfirm, schoolName, mobileNumber, birthDate} = req.body;

    const existingUser = await Info.findOne({email});
    if (existingUser)
      return res.status(400).json({
        errorMessage: "An account with this email already exists, please login with this email",
      });

    // hash the password

    const salt = await genSalt();
    const passwordHash = await hash(password, salt);

    // save a new user account to the db

    const newUser = new Info({
      userName,
      email,
      passwordHash,
      schoolName,
      mobileNumber,
      birthDate
    });

    const savedUser = await newUser.save();

    // sign the token

    const token = sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

// log in

router.post("/login", async (req, res) => {
  try {
    const {email, password} = req.body;

    // validate

    if (!email || !password)
      return res
        .status(400)
        .json({ errorMessage: "Please enter all required fields." });

    const existingUser = await Info.findOne({email})
    if (!existingUser)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    const passwordCorrect = await compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ errorMessage: "Wrong email or password." });

    // sign the token

    const token = sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // send the token in a HTTP-only cookie

    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send(existingUser);
  } catch (err) {
    console.error(err);
    res.status(500).send();
  }
});

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send("Logged out successfully");
});

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) return res.json(false);

    verify(token, process.env.JWT_SECRET);

    res.send(true);
  } catch (err) {
    res.json(false);
  }
})

router.post('/reset-password',(req,res)=>{
  crypto.randomBytes(32,(err,buffer)=>{
      if(err){
          console.log(err)
      }
      const token = buffer.toString("hex")
      Info.findOne({email:req.body.email})
      .then(user=>{
          if(!user){
              return res.status(422).json({error:"User not Found"})
          }
          user.resetToken = token
          user.expireToken = Date.now() + 3600000
          user.save().then((result)=>{
              transporter.sendMail({
                  to:user.email,
                  from:"no-reply@helpdesk.com",
                  subject:"Password reset",
                  html:`
                  <p>You requested for password reset</p>
                  <h5>click on this <a href="http://localhost:3000/reset/${token}">link</a> to reset password</h5>
                  `
              }).then(result => res.json({message:"Please Check your email"}))
          })

      }).catch(err=> res.status(500).json({error: "This email is not registered, please try another one or signup with this email."}))
  })
})

router.put('/new-password',(req,res)=>{
  const newPassword = req.body.password
  const sentToken = req.body.token
  Info.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
  .then(info=>{
      if(!info){
          return res.status(422).json({error:"Try again session expired"})
      }
      bcrypt.hash(newPassword,12).then(hashedpassword=>{
         info.passwordHash = hashedpassword
         info.resetToken = undefined
         info.expireToken = undefined
         info.save().then((saveduser)=>{
             res.status(200).json({message:"password updated successfully"})
         })
      })
  }).catch(err=>{
      console.log(err)
  })
})


export default router;
