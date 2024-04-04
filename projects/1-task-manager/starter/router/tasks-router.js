const express = require('express');
const router = express.Router();
const {getAllTasks, createTask, getTask, updateTask, deleteTask, editTask} = require('../controllers/tasks-controller');

router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getTask).patch(updateTask).delete(deleteTask).put(editTask);

module.exports = router;