module.exports = function (req, res, next){
    req.logout = !!req.cookies.token
    res.cookie('token', '', {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 0
    });
    next();

}