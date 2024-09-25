const express = require('express');
const router = express.Router()

const {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
} = require('../controllers/jobs')


router.get('/', getAllJobs)
router.route('/:id').get(getJob).post(createJob).put(updateJob).delete(deleteJob)

module.exports = router