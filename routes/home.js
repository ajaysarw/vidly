const homeRouter =  require('express').Router();

homeRouter.get('/', (req,res)=> {
    res.render('home', {title: "Vidly: Movie App", page_heading: "Vidly"});
})

module.exports = homeRouter;