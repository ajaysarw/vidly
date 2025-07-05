const app = require('express')().
    use(require('express').json()).
    use(require('express').static('./public')).
    use(require('express').urlencoded());

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/vidly').then(()=>console.log('..... connected to db')).catch(err=>console.log(err));

const helment = require('helmet');
const homeRoute = require('./routes/home');
const genreRouter = require('./routes/genres');
const customerRouter = require('./routes/customers');



app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', homeRoute);
app.use('/api/genres', genreRouter);
app.use('/api/customers', customerRouter);

const port = process.env.PORT || 8001
app.listen(port, ()=> {
    console.log('listening on port ...', port);    
})    

