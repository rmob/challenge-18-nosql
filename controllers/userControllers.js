const { User } = require('../models');

module.exports = {
  getUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getSingleUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },
  
  createUser(req, res) {
    User.create(req.body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },


updateUser(req, res) {
    User.findOneAndUpdate({ _id: req.params.userId }, {$set: req.body})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },


deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId})
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(500).json(err));
  },

addFriend(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body }},
        { runValidators: true, new: true}
    )
    .then((dbUserData) => {
        if (!dbUserData) {
        return res.status(404).json({message: 'No Friend with this id!'})
    }
        res.json(dbUserData);
     })
     .catch((err) => {
        console.log(err);
        res.status(500).json(err);
     })
 },

removeFriend(req, res) {
    console.log('removeFriend route hit')
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId }}
       
    )
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => res.status(500).json(err))
    
},

};
