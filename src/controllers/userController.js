const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userRouter = express.Router()

const authConfig = require('../config/auth.json')


function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

userRouter.post('/registrar', async (req, res) => {
    const { email } = req.body

    try {
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'Este usuário já existe'})

        const user = await User.create(req.body)

        user.password = undefined;

        return res.send({ user, token: generateToken({ id: user.id }) })
    } catch(err) {
        return res.status(400).send({ error: 'Cadastro falhou'})
    }
})

userRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select('+password');
    if (!user)
        return res.status(400).send({ error: 'User not found' });

    if (!await bcrypt.compare(password, user.password))
        return res.status(400).send({ error: 'Invalid password' });

    user.password = undefined;

    res.send({
        user,
        token: generateToken({ id: user.id })
    });
})

module.exports = userRouter