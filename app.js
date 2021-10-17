/* 
console.log(process.argv);
console.log(process.argv[2]);

const command = process.argv[2];
if (command === "add") {
  console.log("Adding Note.");
} else if (command === "remove") {
  console.log("Removing Note");
}
 */

const { argv, demandOption } = require("yargs");
const yargs = require("yargs");
const notes = require("./utils.js");

// Customize yargs version
yargs.version("1.1.0");

// adding a new command
yargs.command({
  command: "add",
  describe: "add a new note",
  builder: {
    title: {
      describe: "Note Title",
      demandOption: true,
      type: "string",
    },
    body: {
      describe: "Note Body",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
  },
});

yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "title of the note to remove",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  },
});

yargs.command({
  command: "list",
  describe: "lists all the notes",
  handler() {
    notes.getNotes();
  },
});

yargs.command({
  command: "read",
  describe: "reads a chosen note",
  builder: {
    title: {
      describe: "title of the note to be displayed",
      demandOption: true,
      type: "string",
    },
  },
  handler(argv) {
    notes.readNote(argv.title);
  },
});

// console.log(yargs.argv);
yargs.parse();
