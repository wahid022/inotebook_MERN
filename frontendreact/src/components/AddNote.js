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
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} /> 
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote;