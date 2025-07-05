const express = require('express');
const customerRouter = express.Router();
const { CustomerModel, validate } = require('../models/customer.model');

customerRouter.get('/', async (req, res) => {
    const customers = await CustomerModel.find();
    res.status(200).send(customers);
    return;
})

customerRouter.delete('/:id', async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).send({ message: "invalid id" });
        return;
    }
    const result = await CustomerModel.findByIdAndDelete(req.params.id);
    if (!result) {
        res.status(404).send({ message: 'customer not found with given id' });
        return;
    }

    res.status(200).send({ message: "DeleteSuccess", data: result });
    return;
})

customerRouter.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send({ message: "bad data" })
        return;
    }
    
    const customer = new CustomerModel(req.body);
    const result = await customer.save(req.body);
    
    res.status(200).send(result);
    return;
})

customerRouter.put("/:id", async (req, res) => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).send({ message: "invalid id" });
        return;
    }
     
    const { error } = validate(req.body);
    if (error) {
        res.status(400).send({ message: "bad data" })
        return;
    }
    
    const customer = await CustomerModel.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        isGold: req.body.isGold,
        phone: req.body.phone
    });
    if (!customer) {
        res.status(400).send({ message: "Invalid Request Data", data: req.params })
        return;
    }
    
    res.status(200).send(customer);
    return;
})

module.exports = customerRouter;