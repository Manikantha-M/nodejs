const {StatusCodes} = require('http-status-codes');
const JobModel = require('../models/Job');
const {BadRequestError, UnauthenticatedError, NotFoundError} = require('../errors');

const getAllJobs = async (req, res) => {
    const jobs = await JobModel.find({createdBy:req.user.userId}).sort('createdAt');
    res.status(StatusCodes.OK).json({jobs, count:jobs.length});
}

const getJob = async (req, res) => {
    const {user:{userId}, params:{id:jobId}} = req;
    const job = await JobModel.findOne({_id:jobId, createdBy:userId});
    if(!job) throw new NotFoundError(`No Job with id: ${jobId} is found`);
    res.status(StatusCodes.OK).json(job);
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