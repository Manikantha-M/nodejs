// Express Router

const express = require('express');
const router = express.Router();
const {getPeople, postPeople, putPerson, deletePerson} = require('../controllers/people');

router.get('/', getPeople);

router.post('/', postPeople);

router.put('/:id', putPerson);

router.delete('/:id', deletePerson);

module.exports = router;