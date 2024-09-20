const User = require('../models/userModel');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const register = async (req, res) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        password: Joi.string().min(3).required(),
    });
    const {error} = schema.validate(req.body)
    if (error) {
        console.log(error.details[0].message)
        return res.status(400).json({message : error.details[0].message});
    }
    console.log('bb')
    console.log(req.body)
    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if (user) return res.status(400).json({message : 'User with that email already exist!'})

        user = new User({name, email, password})
        await user.save()
        const token = jwt.sign({user}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 3600000
        });
        res.status(201).json(user)
    } catch (error) {
        console.log(error)
        res.status(500).json({message: error, place: 'save gone wrong'})
    }
}

const login = async (req, res) =>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
    });
    const {email, password} = req.body;
    const {error} = schema.validate({email, password});
    if (error) return res.status(400).json(error.details[0].message)

    try{
        let user = await User.findOne({email});
        if (!user) return res.status(401).json('Invalid email');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json('Invalid password');

        const token = jwt.sign({user}, process.env.JWT_SECRET, {
            expiresIn: '1h'
        });
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 3600000
        });

        res.header('Authorization', `Bearer ${token}`).status(200).json(`You have logged in, your token ${token}`);
    }catch (e) {
        res.status(500).send(`Server error ${e}`)
    }
}


module.exports = {register, login}