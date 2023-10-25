const express = require('express')
const router = express.Router()
const passport = require('passport')
const Message = require('../models/message')
const User = require('../models/user')

// Post a message
router.post('/dashboard', async (req, res) => {
  const userId = req.user._id
  const messageText = req.body.message

  try {
    const user = await User.findById(userId)
    if (!user) {
      return res.json({ success: false, msg: 'User not found' })
    }

    // Use the postMessage function to save the message
    await Message.postMessage(userId, messageText)

    res.json({ success: true, msg: 'Message saved' })
  } catch (error) {
    console.error('Error while saving the message:', error)
    res.json({ success: false, msg: 'Failed to save the message' })
  }
})

module.exports = router
