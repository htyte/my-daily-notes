const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat.";

const entries = [{title: 'Home', entry: homeStartingContent}];
let post = {}

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req,res) => {
  res.render('home', {homeContent: homeStartingContent, logs: entries});
})

app.get('/about', (req,res) => {
  res.render('about', {about: aboutContent });
})

app.get('/contact', (req,res) => {
  res.render('contact', {contact: contactContent});
})

app.get('/compose', (req,res) => {
  res.render('compose')
})

app.get('/posts/:title', (req, res) => {
  entries.forEach(post => {
    if(_.lowerCase(post.title) === _.lowerCase(req.params.title)) {
      res.render('post', {postTitle: post.title, postEntry: post.entry})
    }
  })
})

app.post('/compose', (req, res) => {
  post = {title: req.body.title, entry: req.body.entry}
  entries.push(post)
  res.redirect('/')
})








app.listen(3000, function() {
  console.log("Server started on port 3000");
});
