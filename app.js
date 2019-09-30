//this is note taking app

const fs = require('fs');
const yargs = require('yargs');
const chalk = require('chalk');
const getNotes = require('./notes');

//file system
/*
fs.writeFile('nots.txt', 'this is my first note.', () => {
  fs.appendFile('note.txt', 'Oh let me add another sentence.');
});
*/
//this version isn't linked to package.json version field
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
  handler: function (argv) {
    console.log('Adding a new note!')
    console.log(`Title: ${argv.title}, Notebody: ${argv.body}`);
  }
});

// Delete commond
yargs.command({
  command: 'remove',
  describe: 'Remove a note',
  handler: function () {
    console.log('Removing a note!')
  }
});

// List all
yargs.command({
  command: 'list',
  describe: 'List all notes',
  handler: function () {
    console.log('Listing all notes')
  }
});

// Read commond
yargs.command({
  command: 'read',
  describe: 'Read a note',
  handler: function () {
    console.log('Reading a note!')
  }
});

yargs.parse();//so yargs will parse the argv and print out to console
