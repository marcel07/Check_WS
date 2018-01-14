const express = require('express');
const hbs = require('hbs');
const exphbs = require('express-handlebars');
const path = require('path');
const fs = require('fs');

var app = express();

// app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));

// app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials/');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  
  fs.appendFile('server.log', log + '\n', (err) => {
    if (err) {
      console.log('Unable to append to server.log')
    };
  });
  console.log(log);
  next();
});

// Set Website To Maintenance Mode

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to Home Page!'
  })
});

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
})

app.listen(3000, () => {
  console.log('Server is up on port 3000...');
});