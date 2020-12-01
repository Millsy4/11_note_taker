var router = require('express').Router();
const fs = require('fs');
var dbData = require('../db/db');

router.get("/api/notes", (_req, res) => {
  fs.readFile(dbData, 'utf8', (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

router.post("/api/notes", function(_req, res) {
  fs.readFile(dbData, "utf8", (err, data) => {
    if (err) throw err;
    let newData = JSON.parse(data);
    let body = JSON.stringify(req.body);
    body = JSON.parse(body);
    let id = data.length + 1;
    console.log(id);
    newData.push({...body, "id": id});
    newData = JSON.stringify(newData);
    fs.writeFile(dbData, newData, (err, data) => {
        res.sendStatus(200);
    });
  });
});

router.delete('/api/notes/:id', function (req, res) {
  let id = req.params.id;
  fs.readFile(dbData, 'utf8', (err, data) => {
    if (err) throw err;
    let newData = JSON.parse(data).filter(each => each.id != id);
    newData = JSON.stringify(newData);
    fs.writeFile(dbData, newData, (err, data) => {
      res.send(newData);
    });
  });
});

module.exports = router;