console.log("notes.js稼働");
const fs = require("fs");

let fetchNotes = () =>{
	try{
		let notesString = fs.readFileSync("notes-data.json");
		return JSON.parse(notesString);
	}catch(e){
		return [];
	}
};
let saveNotes = notes =>{
	fs.writeFileSync("notes-data.json",JSON.stringify(notes));
};

let addNote = (title,body) =>{
	let notes = fetchNotes();
	let note = {
		title,
		body
	};

	
	
	let duplicatedNotes = notes.filter(note => note.title === title);
	if(duplicatedNotes.length === 0){
		notes.push(note);
		saveNotes(notes);
		return note;
	}
};
let showAll = () =>{
	return fetchNotes();
};
let readNote = title =>{
	let notes = fetchNotes();
	let filteredNotes = notes.filter(note =>note.title === title);
	return filteredNotes[0];
};
let removeNote = title =>{
	let notes = fetchNotes();
	let filteredNotes = notes.filter(note =>note.title != title);
	saveNotes(filteredNotes);
	return notes.length !== filteredNotes.length;
};

let logNotes = note =>{
	console.log("--------------");
	console.log(`タイトル：${note.title}`);
	console.log(`内容：${note.body}`);
}

module.exports = {
	addNote,
	showAll,
	readNote,
	removeNote,
	logNotes
}