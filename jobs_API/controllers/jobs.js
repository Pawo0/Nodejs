const getAllJobs = (req, res) =>{
    res.send('get jobs')
}
const getJob = (req, res) =>{
    res.send('get job')
}
const createJob = (req, res) =>{
    res.send('create jobs')
}
const updateJob = (req, res) =>{
    res.send('update jobs')
}
const deleteJob = (req, res) =>{
    res.send('delete jobs')
}

module.exports = {
    getAllJobs,
    getJob,
    createJob,
    updateJob,
    deleteJob,
}