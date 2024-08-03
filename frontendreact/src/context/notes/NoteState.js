import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:8000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)

  // Get all Notes
  const getNotes = async () => {
    // API Call 
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NzczNWIyZDQwOGM4MWQyMjkwYWVjIn0sImlhdCI6MTcyMTIwMTc2NH0.6MhskYl7lmak48XZPFb99hEx9T-JMq2yHuOF-kSlSD4"
      }
    });
    const json = await response.json()
    console.log(json)
    setNotes(json)
  }

  // Add a Note

  //Here async (title, description, tag) => all the parameters is coming from AddNote.js 
  // and this addNote function is passed from NoteState.js to AddNote.js as a context

  const addNote = async (title, description, tag) => {
    
    // API Call from frontend to backend ...and here we are supplying the auth token as a 
    // header which we were doing in thunder client....

    
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NzczNWIyZDQwOGM4MWQyMjkwYWVjIn0sImlhdCI6MTcyMTIwMTc2NH0.6MhskYl7lmak48XZPFb99hEx9T-JMq2yHuOF-kSlSD4"
      },

      
      // Storing title, description, tag in body of api call which we were doing in thunderclient previously...
      body: JSON.stringify({title, description, tag})
    });

    console.log("Adding a new note")
    const note = await response.json();
    setNotes(notes.concat(note))
    
  }





  // Delete a Note
  const deleteNote = async (id) => {
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NzczNWIyZDQwOGM4MWQyMjkwYWVjIn0sImlhdCI6MTcyMTIwMTc2NH0.6MhskYl7lmak48XZPFb99hEx9T-JMq2yHuOF-kSlSD4"
          }
        });
        const json = response.json();
        console.log(json)

        console.log("Deleting the note with id" + id);

        // return note._id !== id  means id which is deleted should not be present anymore in the notes array ...
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
  }





  // Edit or Update a Note
  const editNote = async (id, title, description, tag) => {
    // API Call 
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NzczNWIyZDQwOGM4MWQyMjkwYWVjIn0sImlhdCI6MTcyMTIwMTc2NH0.6MhskYl7lmak48XZPFb99hEx9T-JMq2yHuOF-kSlSD4"
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    console.log(json);


    // Since we cannot change the state Variable so here we have created the copy of that state variable named newNotes.
    let newNotes = JSON.parse(JSON.stringify(notes))
    
    //Iterating over the frontend newNotes array so that it will reflect in frontend as well...
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag; 
        break; 
      }
    }  
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;