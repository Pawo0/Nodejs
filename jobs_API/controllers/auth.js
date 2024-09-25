const User = require('../models/User')
const { StatusCodes } = require('http-status-codes')
const {
    UnauthenticatedError,
    BadRequestError,
} = require('../errors')


const login = async (req, res) => {
    const {email, password} = req.body
    console.log({email, password})
    if (!email || !password){
        throw new BadRequestError('Please provide email and password')
    }
    const user = await User.findOne({email})
    if (!user){
        throw new UnauthenticatedError('User does not exist')
    }
    const isMatch = await user.comparePassword(password)
    if (!isMatch){
        throw new UnauthenticatedError('Bad password')
    }
    const token = user.createJWT()
    res.status(StatusCodes.OK).json({token})
}

const register = async (req, res) =>{
    const {name, email, password} = req.body

    const user = await User.create({name, email, password})
    const token = user.createJWT();
    res.status(StatusCodes.CREATED).json({token})
}

module.exports = {login, register}