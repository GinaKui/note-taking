const fs = require('fs');
const chalk = require('chalk');
//@@TODO async function should be used. Or made an async version of this file

/*
* addNote(), removeNote(), [updateNote()], listNotes()
*/

//output all note titles to console
//@@param undefined
//@@return undefined
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse('Your notes:'));
  notes.forEach( (note, index) => {
    console.log(`${index + 1}. ${note.title}`);
  });
}

/*
* find one note by title and display the body in the console
* @@param Strint title
* @@return undefined
*/
const readNote = title => {
  const notes = loadNotes();
  const findedNote = notes.find( note => note.title === title );
  if (!findedNote) {
    console.log(chalk.red.inverse("Do not Exist"));
  } else {
    console.log(chalk.white.inverse(title));
    console.log(findedNote.body);
  }
};

/* 
* write one new note to file system 
* @@param title String
* @@param body String
* @@return boolean, true if success, false if title doesn't exist
*/
const addNote = (title, body) => {
  const notes = loadNotes();
  const dupNoteIndex = notes.find( note => note.title === title );
  if (dupNoteIndex) {
    console.log(chalk.red.inverse('this title has been taken.'));
    return false;
  }
  //there isn't duplicate note, checking by the title
  notes.push({
    title,
    body
  });
  saveNotes(notes);
  console.log(chalk.green.inverse('Note added'))
  return true;
};

// remove note from file system
//@@param title string
//@@return boolean, true if success, false if the title is not valid
const removeNote = title => {
  let notes = loadNotes();
  const prevNotesLength = notes.length;
  notes = notes.filter( note => note.title !== title );
  if (prevNotesLength === notes.length) {
    console.log(chalk.red.inverse(`Note with title ${title} does not exist`));
    return false;
  }
  //save the new note list
  saveNotes(notes);
  console.log(chalk.green.inverse('Note is removed'));
  return true;
}

//read data from file system
//@@return Array or [] if no note exists
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
}

/*
* save notes list to file system
* @@param string notes
* @@return undefined
*/
const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync('notes.json', dataJSON);
}

//file system
/*
fs.writeFile('nots.txt', 'this is my first note.', () => {
  fs.appendFile('note.txt', 'Oh let me add another sentence.');
});
*/

module.exports = {
  readNote,
  addNote,
  removeNote,
  listNotes
};