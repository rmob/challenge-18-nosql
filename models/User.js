const { Schema, model } = require('mongoose');

const userSchema = new Schema({
  username: { 
    type: String,
    required: true,
    trim: true,
    unique: true
},
  email: {
    type: String,
    required: true,
    unique: true,
    $regexMatch: '\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}\b',
},
  thoughts: [{
    type: Schema.Types.ObjectId,
    ref: 'thought'
}],
  friends: [{
    type: Schema.Types.ObjectId,
    ref: 'user'
}],
 },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });

const User = model('user', userSchema)

module.exports = User;