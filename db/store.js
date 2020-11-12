const util = require("util");
const fs = require("fs");

// This package will be used to generate our unique ids. https://www.npmjs.com/package/uuid
const uuidv1 = require("uuidv1");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }

  write(note) {
    return writeFileAsync("db/db.json", JSON.stringify(note));
  }

  getNotes() {
    return this.read().then((notes) => {
        // here you will write a function that uses the above read function and parses the notes from the file 
      let parsedNotes = JSON.parse(notes);

      // If notes isn't an array or can't be turned into one, send back a new empty array
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (err) {
        parsedNotes = [];
      }

      return parsedNotes;
    })
    
  }

  addNote(note) {
    // set up variables with our notes data here
    const {title, text} = note;

    // Error handle here, if we have no title or text added throw a new error explaining what is wrong
    if (!title || !text) {
      throw new Error("Note 'title' and 'text' cannot be blank");
    }

    // Add a unique id to the note using uuid package
    const new_Note = {title, text, id: uuidv1()};

    // Get all notes, add the new note, write all the updated notes, return the newNote
    return this.getNotes()
    .then((allNotes) => [...allNotes,new_Note])
    .then((newAllNotes) => this.write(newAllNotes))
    .then(() => new_Note);
  }

  removeNote(id) {
    // Get all notes, remove the note with the given id, write the filtered notes
    return this.getNotes()
    .then((note) => note.filter((notes) => notes.id != id))
    .then((filterNotes) => this.write(filterNotes));
  }
}

module.exports = new Store();

