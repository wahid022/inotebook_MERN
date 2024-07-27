import React from 'react'

const Noteitem = (props) => {

    //Extracting note from props passed from Notes.js
    const { note } = props;
    return (
        <div className="col-md-3"> 
            <div class="card my-3"> 
                <div class ="card-body">
                <h5 class ="card-title">{note.title}</h5>
                <p class ="card-text">{note.description}</p> 
                </div>
            </div>
        </div>
    )
}

export default Noteitem;