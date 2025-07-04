const app = require('express')().
    use(require('express').json()).
    use(require('express').static('./public')).
    use(require('express').urlencoded());

const helment = require('helmet');
const homeRoute = require('./routes/home')
const genreRouter = require('./routes/genres')

app.set('view engine', 'ejs');
app.set('views', './views');

app.use('/', homeRoute);
app.use('/api/genres', genreRouter);

const port = process.env.PORT || 8001
app.listen(port, ()=> {
    console.log('listening on port ...', port);    
})    

