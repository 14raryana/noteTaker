const router = require("express").Router()
const store = require("../db/store")


router.get("/notes", (req, res) => {
    // this is the GET route where your will you 
    // will utilize the getNMotes() function

    store.getNotes()
    .then((note) => res.json(note))
    .catch((err) => res.json(err));
});

router.post("/notes", (req, res) => {
    // this is the POST route where your will you 
    // will utilize the addNotes() function
    store.addNote(req.body).then(function(note) {
        res.json(note);
    }).catch(function(err) {
        res.status(500).json(err);
    });
})

router.delete("/notes/:id", (req, res) => {
    // this is the delete route where you will
    // utilize the removeNote() function
    store.removeNote(req.params.id)
    .then(() => res.json({ok: true}))
    .catch(function(err) {
        res.status(500).json(err);
    });
})

module.exports = router;

