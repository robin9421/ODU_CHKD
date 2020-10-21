var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var sha256 = require('sha256');
var jwt = require('jsonwebtoken');
var User = require('../models/User');
var generator = require('generate-password');



let transporter = nodemailer.createTransport({
    service: 'gmail', // true for 465, false for other ports
    auth: {
        user: 'prajapatirobin123@gmail.com', // generated ethereal user
        pass: 'mvjlzjwdwpzmhnbd' // generated ethereal password
    }
})

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email }).then(user => {
        console.log(user);
        if (user) {
            if (user[0].password == sha256(req.body.password)) {
                var token = jwt.sign({ email: user[0].email, id: user[0]._id, role: user[0].role }, 'secret', { expiresIn: '24h' });
                res.status(200).json({ token, user: user[0] });
            } else {
                res.status(401).json({ message: "Incorrect Password" });
            }
        } else {
            res.status(402).json({ message: "User Doesnt Exist" });
        }
    }).catch(err => {
        console.log(err)
        res.status(403).json(err)
    });
})

router.post('/register', (req, res, next) => {
    console.log(req.body)
    var password = generator.generate({
        length: 6,
        numbers: true
    });
    User.findOne({ email: req.body.email })
        .then(user => {
            if (!user) {
                const userData = new User(req.body)
                userData.password = sha256(password)
                const token = jwt.sign({
                            email: req.body.email,
                            role: req.body.role
                        },
                        'secret', {
                            expiresIn: 180
                        }
                    )
                    //Email Service
                transporter
                    .sendMail({
                        from: 'Robin',
                        to: req.body.email,
                        subject: 'Registered',
                        html: `<h2>Hi  <span style="color:blue;">${userData.name}</span>,</h2><br> 
                               <h3>Welcome to CHKD,</h3><br>
                               <h3>To login, Use the following details:</h3>
                               <h3>USERNAME: ${userData.email}<br>PASSWORD: ${password}</h3><br>
                               <h3>To reset the password,</h3><a href='https://localhost:8080/'>Click here!</a>`
                    })
                    .then(info => {
                        userData
                            .save()
                            .then(user => {
                                res.status(200).json({ message: "success", token });
                            })
                    })
                    .catch(err => {
                        res.status(400).json(err)
                        console.log(err)
                    })
            } else {
                res.status(401).json({ message: "Already exists" });
            }
        })
        .catch(err => {
            res.status(402).json(err)
            console.log(err)
        })
})

router.get('/verify/:email', (req, res, next) => {
    User.updateOne({ email: req.params.email }, { isVerified: true }).then(response => {
        res.status(200).json({ message: "Verified" });
        // res.redirect('http://localhost:8080/auth/login');
    }).catch(err => {
        res.status(402).json(err)
        console.log(err)
    });
})

module.exports = router;