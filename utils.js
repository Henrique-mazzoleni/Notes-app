const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  const notes = loadNotes();
  console.log("Your Notes:");
  notes.forEach((note) => console.log(note.title));
};

const addNote = (title, body) => {
  const notes = loadNotes();
  const duplicateNote = notes.find((note) => note.title === title);

  debugger;

  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body,
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("new note added"));
  } else {
    console.log(chalk.red.inverse("Note title taken"));
  }
};

const saveNotes = (notes) =>
  fs.writeFileSync("notes.json", JSON.stringify(notes));

const removeNote = (title) => {
  const notes = loadNotes();
  const filteredList = notes.filter((note) => note.title !== title);
  if (notes.length === filteredList.length) {
    console.log(chalk.red.inverse("No note found!"));
  } else {
    console.log(chalk.green.inverse("Note removed"));
    saveNotes(filteredList);
  }
};

const loadNotes = () => {
  try {
    return JSON.parse(fs.readFileSync("notes.json").toString());
  } catch (e) {
    return [];
  }
};

const readNote = (title) => {
  const notes = loadNotes();
  const note = notes.find((note) => note.title === title);
  if (!note) console.log(chalk.red.inverse("Note not found!"));
  else {
    console.log(chalk.green.bold(note.title));
    console.log(note.body);
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  readNote: readNote,
};
