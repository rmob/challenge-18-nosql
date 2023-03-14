const { Schema, model} = require('mongoose');

const reactionSchema = new Schema({
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
},
{
  toJSON: {
    virtuals: true,
  },
  id: false,
});

const thoughtSchema = new Schema({
  thoughtText: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280
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
},
{
    toJSON: {
      virtuals: true,
    },
    id: false,
});

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// reactionSchema.virtual.apply('formatReactionDate').get(function () {
//   const reactionTime = Date.now
//   return reactionTime.getDate().getDay().getFullYear().getHours().getMinutes()
// })

// thoughtSchema.virtual.apply('formatThoughtDate').get(function () {
//   const thoughtTime = Date.now
//   return thoughtTime.getDate().getDay().getFullYear().getHours().getMinutes()
// })

const Thought = model('thought', thoughtSchema)

module.exports = Thought;