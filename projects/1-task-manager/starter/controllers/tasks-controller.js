const TaskModel = require('../models/task-model');

const getAllTasks = (req, res) => {
    res.send('get all tasks');
}

const createTask = async(req, res) => {
    try {
        const task = await TaskModel.create(req.body)
        res.status(201).json(task);
    } catch (error) {
        console.log(error)
        res.status(500).json({error});
    }
   
}

const getTask = (req, res) => {
    res.json({id:req.params.id});
}

const updateTask = (req, res) => {
    res.json({msg:'to be updated', id:req.params.id});
}

const deleteTask = (req, res) => {
    res.json({msg:'to be deleted', id:req.params.id});
}
module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask }