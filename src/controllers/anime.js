const express = require('express')
const Anime = require('../models/anime')

const animeController = {};

animeController.buscar = async (req, res) => {
    const {title, img} = req.body
    try {
        const listaAnime = await Anime.findOne({title: req.body.title})

        return res.send( {listaAnime} )
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu um erro ao requisitar anime' });
    }
}

animeController.buscarById = async (req, res) => {
    try {
        const anime = await Anime.findById(req.params.id).populate('Anime')

        return res.send({ anime })
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu um erro ao requisitar anime' });
    }
}

animeController.criar = async (req, res) => {
    try {
        const newAnime = await Anime.create(req.body)

        return res.send( {newAnime})
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu um erro ao adcionar um anime' });
    }
}

animeController.update = async (req, res) => {
    try{
        const { updateAnime } = req.body

        const anime = await Anime.findByIdAndUpdate(req.params.id, {updateAnime}, {new: true})

        return res.send( {anime} )
    } catch (err) {
        return res.status(400).send({ error: 'Não foi possivel dar update no anime'})
    }
}

animeController.delete = async (req, res) =>{
    try{
        const anime = await Anime.findByIdAndRemove(req.params.id)

        return res.send()
    } catch (err) {
        return res.status(400).send({ error: 'Nao foi possivel deletar o anime'})
    }
}

module.exports = animeController