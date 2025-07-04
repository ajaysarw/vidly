const express = require('express');
const genreRouter = express.Router();

const genres = require('../data/genres');
const Joi = require('joi');

function ValidateGenre(course) {
    const schema = Joi.object({
        name: Joi.string().required().min(3),
    });

    return schema.validate(course);
}

genreRouter.get('/', (req, res) => {
    res.send(genres);
})

genreRouter.get('/:id', (req, res) => {
    const genre = genres.find(genre=>genre.id===parseInt(req.params.id));
    if (!genre) {
        res.status(400).send({ message: "Bad Data", data: req.params })
        return;
    }
    res.send(genre);
})

genreRouter.post('/', (req, res) => {
    const { error } = ValidateGenre(req.body);
    if (error) {
        res.status(400).send(error.details);
        return;
    }

    const genre = {
        id: (genres.length + 1) * Math.ceil(Math.random() * genres.length),
        name: req.body.name
    }
    genres.push(genre);
    res.status(200).send(genres)
})

genreRouter.delete('/:id', (req, res) => {
    const genreIndex = genres.findIndex(genre => genre.id === parseInt(req.params.id))
    if (genreIndex === -1) {
        res.status(404).send(" not found")
        return;
    }

    genres.splice(genreIndex, 1)
    res.status(200).send({ message: "DeleteSuccess", data: genres })
});

genreRouter.put('/:id', (req, res) => {
    const genreExists = genres.find(genre => genre.id === parseInt(req.params.id))
    if (!genreExists) {
        res.status(400).send({ message: "Bad Data", data: req.params })
        return;
    }

    const updatedGenres = genres.map(genre =>
        (genre.id === parseInt(req.params.id)) ? { ...genre, name: req.body.name } : genre
    );

    res.status(200).send(updatedGenres);
});

module.exports = genreRouter;