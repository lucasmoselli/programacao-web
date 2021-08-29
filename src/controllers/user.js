const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const authConfig = require('../config/auth.json')

const userController = {};

function generateToken(params = {}) {
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    })
}

userController.registrar = async (req, res) => {
    const { email } = req.body
    console.log('entrou registrar');
    try {
        if (await User.findOne({ email }))
            return res.status(400).send({ error: 'Este usuário já existe'})

        const user = await User.create(req.body)

        user.password = undefined;

        return res.send({ user, token: generateToken({ id: user.id }) })
    } catch(err) {
        return res.status(400).send({ error: 'Cadastro falhou'})
    }
}

userController.login = async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    console.log(email);
    const user = await User.findOne({ email : req.body.email }).select("+password");
    console.log(user);
    if (!user)
        return res.status(400).send({ error: 'User not found' });

    if (req.body.password !== user.password)
        return res.status(400).send({ error: 'Invalid password' });

    user.password = undefined;

    res.send({
        user,
        token: generateToken({ id: user.id })
    });
}

module.exports = userController