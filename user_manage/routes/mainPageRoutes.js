const express = require('express')
const router = express.Router();
const authCookie = require('../middleware/authCookie')
const clearCookie = require('../middleware/clearCookie')
const {
    getLoginPage,
    getRegisterPage,
    mainPage
} = require('../controllers/mainPageControllers')

router.get('/', authCookie, mainPage)

router.get('/login', clearCookie, getLoginPage)

router.get('/register', clearCookie, getRegisterPage)

router.get('/logout', clearCookie, getLoginPage)

module.exports = router