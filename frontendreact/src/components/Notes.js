import React, {useContext, useEffect,useRef,useState} from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';


const Notes = () => {

    //Syntax for including useContext..
    const context = useContext(noteContext);

    //it is coming from NoteState.js as Context and it will be accessible to all components 
    //..so extracting those state and functions from the Context...
    //getNotes,editNote is also coming from context API from NoteState.js
    const {notes, getNotes,editNote} = context;

    useEffect(()=>{
        getNotes()
    },[])

    // Here We are using getNotes() inside useEffect just to call this function once 
    // so that it doesnot call everytime when the page is rendered..
    

    // useRef hook is used for accessing DOM elements directly and for storing values 
    // that don't impact the rendering of the component eg : can be defined for some button so that it will not re-render the component...
    
    const ref=useRef(null);
    const refClose = useRef(null);
    const [note, setNote] = useState({id: "", etitle: "", edescription: "", etag: ""})



    const updateNote = (currentNote) => {


        //useRef is used when u want to access the element directly so here it is accessing the button named launch demo model below
        //  as it is hidden ,that button cntrols the dialog box form submission so ref.current will return that button and then we apply click over it 
        // to open that dialog box ...  Conclusion it acts as reference to Launch demo Buton ...
        ref.current.click(); 

        //setnote here is written just to update the value in input field before editing it to the new value....
        setNote({id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag:currentNote.tag})    }

    const handleClick = (e)=>{
        console.log("Updating the note...", note)

        //here editNote() is coming from api and as the update button is clicked it will call the editNote Function of NoteState.js 
        // and will make changes in backend and frontend object as well ...
        editNote(note.id, note.etitle, note.edescription, note.etag)

        //It will close the Dialog box without Rendering the Page ..
        refClose.current.click(); 
    }

    const onChange = (e)=>{
        setNote({...note, [e.target.name]: e.target.value})
    }




    return (

    <>

        {/* importing <AddNote> component which contains the form to add notes  */}
        
        <AddNote></AddNote>

        {/* d-none is written to hide the bar in the initial phase..... */}

        <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className="my-3">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} required minLength={3} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} minLength={5} required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} required minLength={3} />
                                </div>
 
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>                           
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3 mx-5">
                <h2 className='text-center'>You Notes</h2>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
    </>
    )
}

export default Notes