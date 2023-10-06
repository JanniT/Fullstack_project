const express = require('express')
const router = express.Router()
const passport = require('passport')
const jwt = require('jsonwebtoken')
const config = require('../config/database')
const User = require('../models/user')

// Register
router.post('/register', async (req, res, next) => {
    try {
        const newUser = new User({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phone: req.body.phone,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        });

        await User.addUser(newUser)

        res.json({ success: true, msg: 'User registered' })
    } catch (err) {
        console.error(err)
        res.json({ success: false, msg: 'Failed to register user' })
    }
})

// Authenticate
router.post('/authenticate', async (req, res, next) => {
    const username = req.body.username
    const password = req.body.password

    try {
        const user = await User.getUserByUsername(username);
        if (!user) {
          return res.json({ success: false, msg: 'User not found' });
        }
    
        const isMatch = await User.comparePassword(password, user.password);
        if (isMatch) {
          const token = jwt.sign({ data: user }, config.secret, {
            expiresIn: 604800 // 1 week
          });
          res.json({
            success: true,
            token: 'JWT ' + token,
            user: {
                id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                phone: user.phone,
                email: user.email,
                username: user.username
            }
          });
        } else {
          return res.json({ success: false, msg: 'Wrong password' });
        }
      } catch (error) {
        throw error;
      }
    });
    
//     try {
//         const user = await User.findOne({ username: username })

//         if (!user) {
//             return res.json({ success: false, msg: 'User not found' })
//         }

//         const isMatch = await User.comparePassword(password, user.password)

//         if(isMatch) {
//             const token = jwt.sign({data: user}, config.secret, {
//               expiresIn: 604800 // 1 week
//             });

//             // const token = jwt.sign({ data: { _id: user._id } }, config.secret, {
//             //     expiresIn: 604800 // 1 week
//             // });

//             res.json({
//                 success: true,
//                 token: 'JWT ' + token,
//                 user: {
//                     id: user._id,
//                     firstname: user.firstname,
//                     lastname: user.lastname,
//                     phone: user.phone,
//                     email: user.email,
//                     username: user.username
//                 }
//             })
//         } else {
//             return res.json({ success: false, msg: 'Wrong password' })
//         }
//     } catch (err) {
//         console.error(err);
//         res.json({ success: false, msg: 'Authentication failed' })
//     }
// })

// Profile
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    res.json({ user: req.user })
})

module.exports = router