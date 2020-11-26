const { response } = require('express');
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const taskRoutes =  require('../routes/taskRoutes');

const server = express();
//for testing without internet

const dbURI = 'mongodb+srv://<username>:<passowrd>@cluster0.3a6id.gcp.mongodb.net/<dbname>?'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result)=>{
      server.listen(3000);
      console.log('connected to db successfully')
      console.log('listening on port 3000')
  })
  .catch((error)=>{
      console.log(error)
  });



server.set('view engine', 'ejs');
server.set('views','../views');
server.locals.moment = require('moment');

server.use(morgan('dev'));
server.use(express.static('../public'));
server.use(express.urlencoded({extended: true}));

//basic routes
server.get('/', (request, response)=>{
    response.redirect('/tasks')
});
server.get('/about', (request, response)=>{
    response.render('about',{title: 'About'});
});


//task route
server.use('/tasks', taskRoutes);


//404 error route
server.use((request, response)=>{
    response.status(404).render('404',{title:'404'});
})