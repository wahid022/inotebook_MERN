// import NoteContext from "./noteContext";
// import { useState } from "react";


// const NoteState = (props)=>{

//       const host = "http://localhost:5000"
//       const notesInitial = []


//       // Creating State Variable notes and set it as notesInitial ,so that it can be passed to all the component in the project..
//       const [notes, setNotes] = useState(notesInitial)
 
//       // Get all Notes
//       const getNotes = async () => {
//         // API Call 
//         const response = await fetch(`${host}/api/notes/fetchallnotes`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjEzMWRjNWUzZTQwMzdjZDQ3MzRhMDY2In0sImlhdCI6MTYzMDY2OTU5Nn0.hJS0hx6I7ROugkqjL2CjrJuefA3pJi-IU5yGUbRHI4Q"
//           }
//         });
//         const json = await response.json()
//         console.log(json)
//         setNotes(json)
//       }


//      // Add a Note
//      const addNote = async (title, description, tag)=>{
//       // TODO: API Call

//       const response = await fetch(`${host}/api/notes/addnote`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NzczNWIyZDQwOGM4MWQyMjkwYWVjIn0sImlhdCI6MTcyMTIwMTc2NH0.6MhskYl7lmak48XZPFb99hEx9T-JMq2yHuOF-kSlSD4"
//         },
//         body: JSON.stringify({title, description, tag})
//       });

//       console.log("Adding a new note")
//       const note = {
//         "_id": "6697736e2d408c81d2290aee",
//         "user": "6697735b2d408c81d2290aec",
//         "title": title,
//         "description": description,
//         "tag": tag,
//         "date": "2021-09-03T14:20:09.668Z",
//         "__v": 0
//       };

//       //setNotes is a state variable which is updating the notes variable and also concat function is concating into the notes array ,....
//       setNotes(notes.concat(note)) 
//     }


//     // Delete a Note
//     const deleteNote = (id)=>{

//       // TODO: API Call
//       console.log("Deleting the note with id" + id);
//       const newNotes = notes.filter((note) => { return note._id !== id })
//       setNotes(newNotes)

//     }
//     // Edit a Note
//     const editNote = async (id, title, description, tag) => {
//       // API Call 
//       const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY4ZThjYzFhYTNiM2QxOGQ5NTZiNGUyIn0sImlhdCI6MTcyMTM3MzU3MH0.SSyUTabL6BYQO5k6wXC4W-kmHGLwf35Vncl9oXrql-E"
//         },
//         body: JSON.stringify({title, description, tag})
//       });
//       const json = response.json();
  
//       // Logic to edit in client
//       for (let index = 0; index < notes.length; index++) {
//         const element = notes[index];
//         if (element._id === id) {
//           element.title = title;
//           element.description = description;
//           element.tag = tag;
//         }
  
//       }
//     }


//     return (

//         // value={{notes, addnote,deletenode,editnode} same state is passed to all component ... 
//         // also addnote,deletenote and editnodte are passed as function to context API
//         <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>          
//            {props.children}
//         </NoteContext.Provider>
//     )
// }

// export default NoteState;