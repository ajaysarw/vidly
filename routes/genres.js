const express = require('express');
const genreRouter = express.Router();

const {GenreModel, validate} = require('../models/genre.model');

genreRouter.get('/', async (req, res) => {
    const genres = await GenreModel.find().sort('name')
    res.send(genres);
})

genreRouter.get('/:id', async (req, res) => {
    const genre = await GenreModel.findById(req.params.id);
    if (!genre) {
        res.status(400).send({ message: "Bad Data", data: req.params })
        return;
    }

    res.status(200).send(genre)
    return ;    
})

genreRouter.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details);
        return;
    }

    let  genre = new GenreModel ({name: req.body.name})
    genre = await genre.save(genre);
    res.status(200).send(genre)
    return;
})

genreRouter.delete('/:id', async(req, res) => {
    const genre = await genres.findByIdAndDelete(req.params.id)
    if (!genre) {
        res.status(404).send(" genre not found with given id")
        return;
    }
    res.status(200).send({ message: "DeleteSuccess", data: genre })
});

genreRouter.put('/:id', async (req, res) => {
     if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).send({message:"invalid id"});
        return;
    }

    const { error } = validate(req.body);
    if (error) {
        res.status(400).send(error.details);
        return;
    }

    const genre = await GenreModel.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new:true});
    if (!genre) {
        res.status(400).send({ message: "Invalid Request Data", data: req.params })
        return;
    }

    res.status(200).send(genre);
});

module.exports = genreRouter;