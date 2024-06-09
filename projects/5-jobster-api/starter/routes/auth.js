const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');
const checkTestUser = require('../middleware/testuser');

const {login, register, updateUser} = require('../controllers/auth');

router.post('/register', register);
router.post('/login', login);
router.patch('/updateUser', authenticateUser, checkTestUser, updateUser)
module.exports = router;