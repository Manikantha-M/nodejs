// Express Router

const express = require('express');
const router = express.Router();
const {getPeople, postPeople, putPerson, deletePerson} = require('../controllers/people');

router.get('/', getPeople);

router.post('/', postPeople);

router.put('/:id', putPerson);

router.delete('/:id', deletePerson);

// Chaining
// router.route('/').get(getPeople).post(postPeople);
// router.route('/:id').put(putPerson).delete(deletePerson);

module.exports = router;