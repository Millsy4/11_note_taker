const fs = require('fs');

module.exports = function(app) {
  app.get("/api/notes", function(req, res) {
    fs.readFile('./db/db.json', 'utf8', (err, data) =>  {
      if(err) throw err;
      res.json(JSON.parse(data));
    });
  });

  app.post("/api/notes", function(req, res) {
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if(err) throw err;
      let newNote = JSON.parse(data);
      let id = (newNote.length) + 1;
      let newNoteBody = JSON.stringify(req.body);
      newNoteBody = JSON.parse(newNoteBody);
      newNote.push({...newNoteBody, "id": id});
      newNote = JSON.stringify(newNote);
      fs.writeFile('./db/db.json', newNote, (err, data) => {
        res.sendStatus(200);
      });
    });
  });

  app.delete("/api/notes/:id", function(req, res) {
    let id = req.params.id;
    console.log(id);
    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if(err) throw err;
      let deleteNote = JSON.parse(data);
      console.log(deleteNote);
      deleteNote = deleteNote.filter(notes => notes.id != id);
      console.log(deleteNote);
      deleteNote = JSON.stringify(deleteNote);
      fs.writeFile('./db/db.json', deleteNote, (err, data) => {
        if(err) throw err;
        res.send(deleteNote);
      });
    });
  });
};