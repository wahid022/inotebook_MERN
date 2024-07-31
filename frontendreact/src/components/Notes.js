import React, {useContext, useEffect} from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';
import AddNote from './AddNote';


const Notes = () => {

    //Syntax for including useContext..
    const context = useContext(noteContext);

    //it is coming from NoteState.js as Context and it will be accessible to all components 
    //..so extracting those state into new state of const [notes, setNotes] = useState(notesInitial) of NoteState.js
    //addNote is also coming from context API from NoteState.js as addNOte is a function
    const {notes, getNotes} = context;

    useEffect(()=>{
        getNotes()
    },[])
    
    return (

    <>

        {/* importing <AddNote> component which contains the form to add notes  */}
        
        <AddNote></AddNote>
        <h2 className='text-center'>Your Notes</h2>
        <div className="my-3 container d-flex flex-wrap justify-content-between">
             
            {notes.map((note)=>{

                //Including <Noteitem> component for individual note and passing single note as its under the loop ..
                return <Noteitem key={note._id} note={note}/>  
            })}
            </div>
    </>
    )
}

export default Notes