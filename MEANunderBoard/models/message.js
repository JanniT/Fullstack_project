const mongoose = require('mongoose');
const User = require('../models/user');

// Message schema
const MessageSchema = mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Message = module.exports = mongoose.model('Message', MessageSchema)

// Post a message
module.exports.postMessage = async function (userId, messageText) {
  try {
    const user = await User.findById(userId)
    if (!user) {
      throw new Error('User not found')
    }

    const newMessage = new Message({
      text: messageText,
      user: userId,
    })

    await newMessage.save();
  } catch (err) {
    throw err
  }
}
