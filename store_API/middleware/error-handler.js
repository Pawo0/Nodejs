const errorHandlerMiddleware = (err, req, res, next) =>{
    console.log('errorek heh')
    return res.status(500).json({message: 'jajca se robie ino'})
}

module.exports = errorHandlerMiddleware