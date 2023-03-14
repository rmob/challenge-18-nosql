const router = require('express').Router();
const {
  getSingleThought,
  getThoughts,
  createThought,
//   deleteThought,
//   addReaction,
//   removeReaction,
} = require('../../controllers/thoughtControllers');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought);

module.exports = router;