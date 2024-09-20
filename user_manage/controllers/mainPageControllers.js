const getLoginPage = (req, res) => {
    let message = ''
    if (req.logout) message = "Logout"
    res.render('../views/index', {
        formTitle: 'Login',
        buttonValue: 'Log in',
        login: true,
        message: message,
        bad: true
    })
}

const getRegisterPage = (req, res) => {
    let message = ''
    if (req.logout) message = "Logout"
    res.render('../views/index', {
        formTitle: 'Register',
        buttonValue: 'Register',
        login: false,
        message: message,
        bad: true
    })
}

const mainPage = (req, res) => {
    console.log('Here we are')
    res.status(200).render('../views/dashboard', req.user)
}

module.exports = {
    getLoginPage,
    getRegisterPage,
    mainPage
}