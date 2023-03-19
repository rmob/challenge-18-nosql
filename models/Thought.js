const { Schema, model} = require('mongoose');

const currentTime = () => {
  const stamp = new Intl.DateTimeFormat("en-us", {
    dateStyle: 'short',
    timeStyle: 'short',
  })
  return stamp.format(Date.now()) 
}

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
    default: Date.now,
    get: currentTime
    
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
    default: currentTime(Date.now())
    
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
}
);

thoughtSchema.virtual('reactionCount').get(function () {
  return this.reactions.length;
});

// reactionSchema.virtual.apply('formatReactionDate').get(function () {
//   const reactionTime = Date.now
//   return `${reactionTime.getDate()}`
// })

thoughtSchema.virtual('formatedTimeStamp').get(function () {
  const stamp = new Intl.DateTimeFormat("en-us", {
    dateStyle: 'short',
    timeStyle: 'short',
  })
  return stamp.format(Date.now()) 
}
 
)



const Thought = model('thought', thoughtSchema)

module.exports = Thought;