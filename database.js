const mongoose = require('mongoose');


const PartSchema = new mongoose.Schema({
  text: { type: String, required: true }
});

const MessageSchema = new mongoose.Schema({
  role: { type: String, enum: ['user', 'model'], required: true },
  parts: [PartSchema]
});

const ChatSchema = new mongoose.Schema({
  history: [MessageSchema]
}, { timestamps: true });

const Chat= mongoose.model('Chat', ChatSchema);
module.exports =Chat