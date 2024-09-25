const jwt = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const auth = function (req, res, next){
    const header = req.headers.authorization;
    if (!header || header.startsWith('Bearer ')) throw new UnauthenticatedError('Access denied, no token')
    try{
        const token = header.split(' ')[1]
        req.user = jwt.verify(token, process.env.JWT_SECRET)
        next()
    } catch (e){
        throw new UnauthenticatedError('Access denied, wrong token')
    }
}

module.exports = auth