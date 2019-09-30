//this is note taking app
const yargs = require('yargs');
const notes = require('./notes');

//the yargs version isn't linked to package.json version field
yargs.version('1.0.0');

// Add commond
yargs.command({
  command: 'add',
  describe: 'Add a new note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true, //default valie is false
      type: 'string'   //otherwise boolean true will be default for --title
    },
    body: {
      describe: 'Note body',
      demandOption: true,
      type: 'string',
    },
  },
  handler(argv) {
    notes.addNote(argv.title, argv.body);
    console.log(`Title: ${argv.title}, Notebody: ${argv.body}`);
  }
});

// Delete commond
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true, 
      type: 'string'   
    },
  },
  handler(argv) {
    notes.removeNote(argv.title);
  }
});

// List all
yargs.command({
  command: 'list',
  describe: 'List all note titles',
  handler() {
    notes.listNotes();
  }
});

// Read commond
yargs.command({
  command: 'read',
  describe: 'Read a note',
  builder: {
    title: {
      describe: 'Note title',
      demandOption: true, 
      type: 'string'
    }
  },
  handler(argv) {
    notes.readNote(argv.title)
  }
});

yargs.parse();//so yargs will parse the argv and print out to console
