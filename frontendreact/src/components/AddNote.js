import React, {useContext, useState} from 'react'
import noteContext from "../context/notes/noteContext"

const AddNote = () => {

    // using context api ..
    const context = useContext(noteContext);

    // Extracting assNOte function from Context API ..
    const {addNote} = context;

    //Creating the state variable to store the structure of addNote
    const [note, setNote] = useState({title: "", description: "", tag: "default"})


    //handle click function is activated when add note button will be clicked for submission of note ..
    const handleClick = (e)=>{
        e.preventDefault();

        // Adding Note to state variable ... using addNote () function of NoteState and passing the parameter in its argument.. 
        // const addNote = (title, description, tag)=>{ ........} 

        addNote(note.title, note.description, note.tag);
    }


    // setNote is updatating the state while any change in input box ...and updating it simultaneously..
    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }


    return (
        <div className="container my-3">
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" required minLength={3} onChange={onChange} /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" required minLength={5} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" required minLength={3} onChange={onChange} />
                </div>
               
                <button  disabled={note.title.length<3 || note.description<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote;