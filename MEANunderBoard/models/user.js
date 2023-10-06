const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const config = require('../config/database')

// user schema
const UserSchema = mongoose.Schema({
    firstname: {
        type: String
    },
    lastname: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const User = module.exports = mongoose.model('User', UserSchema)

module.exports.getUserById = async function (id) {
    try {
      const user = await User.findById(id)
      return user
    } catch (err) {
      throw err
    }
  }

module.exports.getUserByUsername = async function(username) {
    try {
        const user = await User.findOne({ username: username })
        return user
    } catch (err) {
        throw err
    }
}

module.exports.addUser = async function(newUser) {
    try {
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newUser.password, salt)
        newUser.password = hash
        await newUser.save()
    } catch (err) {
        throw err
    }
}

module.exports.comparePassword = async function(candidatePassword, hash) {
    try {
        const isMatch = await bcrypt.compare(candidatePassword, hash)
        return isMatch
    } catch (err) {
        throw err
    }
}
