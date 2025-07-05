const Joi = require('joi');
const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: {type:String, required: true},
    isGold: {type:Boolean, required: true},
    phone: {type:String, required: true}
});

const CustomerModel = mongoose.model('Customer', customerSchema);

function validateCustomer(customer) {
    const schema = Joi.object({
        name: Joi.string().required().min(3),
        isGold: Joi.boolean().required(),
        phone: Joi.string().required().min(3),
    });

    return schema.validate(customer);
}

module.exports.CustomerModel = CustomerModel;
module.exports.validate = validateCustomer;
module.exports.mongoose = mongoose;