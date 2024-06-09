const {StatusCodes} = require('http-status-codes');
const JobModel = require('../models/Job');
const {BadRequestError, UnauthenticatedError, NotFoundError} = require('../errors');

const getAllJobs = async (req, res) => {
    const {status, jobType, sort, pageIndex, search, limit} = req.query;
    const queryObj = {
        createdBy: req.user.userId
    }
    if(search){
        queryObj.position = {$regex:search, $options:'i'};
    }
    if(status && status !== 'all') {
        queryObj.status = status;
    }
    if(jobType && jobType !== 'all') {
        queryObj.jobType = jobType;
    }
    let result = JobModel.find(queryObj);
    switch(sort){
        case 'latest':
        result = result.sort('-createdAt')
            break;
        case 'oldest':
        result = result.sort('createdAt')
            break;
        case 'a-z':
        result = result.sort('position')
            break;
        case 'z-a':
        result = result.sort('-position')
            break;
    };
    const pageLimit = Number(limit) || 5;
    const skip = (Number(pageIndex) || 0) * pageLimit;

    result = result.skip(skip).limit(pageLimit);

    const jobs = await result;
    // total count of jobs
    const totalJobs = await JobModel.countDocuments(queryObj);

    res.status(StatusCodes.OK).json({jobs, count:totalJobs});
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
    const {user:{userId}, params:{id:jobId}, body:{company,position}} = req;
    if(!company || !position) throw new BadRequestError('Company or Position fields cannot be empty');
    const job = await JobModel.findOneAndUpdate({_id:jobId, createdBy:userId}, req.body, {new:true, runValidators:true});
    if(!job) throw new NotFoundError(`No Job with id: ${jobId} is found`);
    res.status(StatusCodes.OK).json(job);
}

const deleteJob = async (req, res) => {
    const {user:{userId}, params:{id:jobId}} = req;

    const job = await JobModel.findByIdAndDelete({_id:jobId, createdBy:userId});
    if(!job) throw new NotFoundError(`No Job with id: ${jobId} is found`);
    res.status(StatusCodes.OK).json({"msg":"Deleted"});
}


module.exports = {getAllJobs, getJob, createJob, updateJob, deleteJob}