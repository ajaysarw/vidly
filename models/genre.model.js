const Joi = require('joi');
const mongoose = require('mongoose');

const genresSchema = new mongoose.Schema({
    name: {type:String, required: true}
});
const GenreModel = mongoose.model('GenreModel', genresSchema)

function ValidateGenre(course) {
    const schema = Joi.object({
        name: Joi.string().required().min(3),
    });

    return schema.validate(course);
}

module.exports.GenreModel = GenreModel;
module.exports.validate = ValidateGenre;
module.exports.mongoose = mongoose;