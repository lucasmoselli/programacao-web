const express = require('express')
const Anime = require('../models/anime')
const animeController = require('../controllers/anime')

const animeRouter = express.Router()

animeRouter.route('/buscar').get(animeController.buscar) 

animeRouter.route('/buscar/:id').get(animeController.buscarById)

animeRouter.route('/criar').post(animeController.criar)

animeRouter.route('/:id').put(animeController.update)

animeRouter.route('/:id').delete(animeController.delete)

module.exports = animeRouter