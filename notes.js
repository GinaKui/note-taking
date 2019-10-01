const fs = require('fs');
const chalk = require('chalk');
/** 
* @todo async function should be used. Or made an async version of this file
* @todo write better document using JSDoc https://en.wikipedia.org/wiki/JSDoc
*/

/*
* readNote(), addNote(), removeNote(), [updateNote()], listNotes()
*/


/**
 * @param {undefined}
 * @return {undefined}
 */
const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.inverse('Your notes:'));
  notes.forEach( (note, index) => {
    console.log(`${index + 1}. ${note.title}`);
  });
}
/**
 * Find the note by title and display its body in the console
 * @param {string} title 
 * @return {undefined}
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

/**
* @param {string} title
* @param {string} body
* @return {boolean}, true if success, false if title doesn't exist
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

/**
 * @param {string} title
 * @return {boolean} , success or not valid title
 */
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

/**
 * @return {Array}
 */
const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync('notes.json');
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (err) {
    return [];
  }
}

/**
 * @param {Array} notes
 * @returns {undefined}
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