const express = require('express')
const Anime = require('../models/anime')

const animeRouter = express.Router()

animeRouter.get('/buscar', async (req, res) => {
    try {
        const listaAnime = await Anime.find().populate('Anime')

        return res.send( {listaAnime} )
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu um erro ao requisitar anime' });
    }
})

animeRouter.get('/buscas/:id', async (req, res) => {
    try {
        const anime = await Anime.findById(req.params.id).populate('Anime')

        return res.send({ anime })
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu um erro ao requisitar anime' });
    }
})

animeRouter.post('/criar', async (req, res) => {
    try {
        const newAnime = await Anime.create(req.body)

        return res.send( {newAnime})
    } catch (err) {
        return res.status(400).send({ error: 'Ocorreu um erro ao adcionar um anime' });
    }
})

animeRouter.put('/:id', async (req, res) => {
    try{
        const { updateAnime } = req.body

        const anime = await Anime.findByIdAndUpdate(req.params.id, {updateAnime}, {new: true})

        return res.send( {anime} )
    } catch (err) {
        return res.status(400).send({ error: 'Não foi possivel dar update no anime'})
    }
})

animeRouter.delete('/:id', async (req, res) =>{
    try{
        const anime = await Anime.findByIdAndRemove(req.params.id)

        return res.send()
    } catch (err) {
        return res.status(400).send({ error: 'Nao foi possivel deletar o anime'})
    }
})

module.exports = animeRouter