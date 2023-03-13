const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: {
    type: String,
    required: true,
    min: 1,
    max: 280
  },
  createdAt: {
    type: Date,
    default: Date.now 
  },
  username: {
    type: String,
    required: true
  },
  reactions: [reactionSchema],
  
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

const reactionSchema = new mongoose.Schema({
  reactionId: {
    type: Schema.Types.ObjectId,
    ref: 'thought', 
  },
  reactionBody: {
    type: String,
    required: true,
    max: 280,
  },
  username: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now 
  },
})

module.exports = Thought;