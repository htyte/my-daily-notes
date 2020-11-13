const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const port = process.env.PORT || 3000;

const aboutContent = "A space to quickly right notes and ideas while surfing on the net.";
const placeholderContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Aliquam id diam maecenas ultricies mi eget. Pulvinar sapien et ligula ullamcorper malesuada proin. Pharetra et ultrices neque ornare."

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//DB Connect Local
//mongoose.connect("mongodb://localhost:27017/notesDB", { useNewUrlParser: true, useUnifiedTopology: true });

//DB Connect Prod
mongoose.connect(`mongodb+srv://${process.env.USERNAME}:${process.env.KEY}@cluster0.212ma.mongodb.net/${process.env.DATABASE}`, {useNewUrlParser: true, useUnifiedTopology: true } );

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
})

const Note = mongoose.model('Note', noteSchema);
// For test use
// const note1 = new Note({title: "November 12th, 2020", content: placeholderContent});
// const note2 = new Note({title: "Hmph...", content: placeholderContent});
// const defaultNotes = [note1, note2] 

//Routes
app.get('/', (req,res) => {
  Note.find({}, function(err,results) {
      if(err) {
        console.log(err)
      } else {
        res.render('home', {notes: results});
      }
    // }
  } )
})

app.get('/about', (req,res) => {
  res.render('about', {about: aboutContent });
})

app.get('/contact', (req,res) => {
  res.render('contact', {contact: contactContent});
})

app.get('/posts/:title', (req, res) => {
  const title = req.params.title;
  Note.findOne({title: title}, function(err, result) {
    if(err) {
      console.log(err)
    } else {
      res.render('post', {postTitle: result.title, postEntry: result.content})
    }
  })
})

app.get('/compose', (req,res) => {
  res.render('compose')
})

app.post('/compose', (req, res) => {
  const note = new Note({title: req.body.title, content: req.body.content})
  note.save();
  res.redirect('/')
})

app.post('/delete', (req, res) => {
  const noteId = req.body.noteId;
  Note.findByIdAndRemove(noteId, function(err) {
    if(err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  })
})

app.listen(port, function() {
  console.log("Server started on port 3000");
});
