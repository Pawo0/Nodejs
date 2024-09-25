const {NotFoundError, BadRequestError} = require('../errors')
const {StatusCodes} = require('http-status-codes')
const Job = require('../models/Job')

const getAllJobs = async (req, res) => {
    const {userId} = req.user
    const jobs = await Job.find({createdBy: userId}).sort('createdBy')
    res.status(StatusCodes.OK).json({count: jobs.length, jobs})
}

const getJob = async (req, res) => {
    const {
        user: {userId},
        params: {id: jobId}
    } = req
    const job = await Job.findOne({createdBy: userId, _id: jobId})
    if (!job) throw new NotFoundError(`Job not found with id ${jobId}`)
    res.status(StatusCodes.OK).json({job})
}

const createJob = async (req, res) => {
    req.body.createdBy = req.user.userId
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({job})
}

const updateJob = async (req, res) => {
    const {
        user: {userId},
        params: {id: jobId}
    } = req
    const {company, position} = req.body
    if (company === "" || position === "") throw new BadRequestError('Position or company fields can not be empty')
    const job = await Job.findOneAndUpdate({createdBy: userId, _id: jobId}, {company, position}, {
        new: true,
        runValidators: true
    })
    if (!job) throw new NotFoundError(`No job with id ${jobId}`)
    res.status(StatusCodes.OK).json(job)
}

const deleteJob = async (req, res) => {
    const {
        user: {userId},
        params: {id: jobId}
    } = req
    const job = await Job.findOneAndDelete({createdBy: userId, _id: jobId})
    if (!job) throw new NotFoundError(`No job with id ${jobId}`)
    res.status(StatusCodes.OK).json({job})
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}