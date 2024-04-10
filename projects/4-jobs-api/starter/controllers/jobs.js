const {StatusCodes} = require('http-status-codes');
const JobModel = require('../models/Job');
const {BadRequestError, UnauthenticatedError} = require('../errors');

const getAllJobs = async (req, res) => {
    const jobs = await JobModel.find({createdBy:req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({jobs, count:jobs.length});
}

const getJob = async (req, res) => {
    res.send('get job')
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const job = await JobModel.create(req.body);
    res.status(StatusCodes.CREATED).json(job);
}

const updateJob = async (req, res) => {
    res.send('update job')
}

const deleteJob = async (req, res) => {
    res.send('delete job')
}


module.exports = {getAllJobs, getJob, createJob, updateJob, deleteJob}