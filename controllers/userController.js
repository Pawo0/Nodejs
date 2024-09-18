const User = require('../models/userModel');
const Joi = require('joi');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
    });
    const {error} = schema.validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    console.log(req.body)
    const {name, email, password} = req.body;

    try {
        let user = await User.findOne({email});
        if (user) return res.status(400).send('User already exist!')

        user = new User({name, email, password})
        await user.save()

        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({message: error, place: 'save gone wrong'})
    }
}

const login = async (req, res) =>{
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(3).required(),
    });
    const {error} = schema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    const {email, password} = req.body;

    try{
        let user = await User.findOne({email});
        if (!user) return res.status(400).send('Invalid email');

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).send('Invalid password');
        res.status(200).send('You have logged in');
    }catch (e) {
        res.status(500).send(`Server error ${e}`)
    }
}


module.exports = {register, login}