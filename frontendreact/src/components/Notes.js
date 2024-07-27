import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"
import Noteitem from './Noteitem';


const Notes = () => {

    //Syntax for including useContext..
    const context = useContext(noteContext);

    //it is coming from NoteState.js as Context and it will be accessible to all components 
    //..so extracting those state into new state of const [notes, setNotes] = useState(notesInitial) of NoteState.js
    const {notes, setNotes} = context;
    return (

    <>
        <h2 className='text-center'>You Notes</h2>
        <div className="my-3 container d-flex flex-row flex-wrap justify-content-around">
             
            {notes.map((note)=>{

                //Including <Noteitem> component for individual note and passing single note as its under the loop ..
                return <Noteitem note={note}/>  
            })}
            </div>
    </>
    )
}

export default Notes