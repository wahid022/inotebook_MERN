import React from 'react'

export default function Alert(props) {

     const changeTypeText=(word)=>{
        
                const lower=word.toLowerCase();
                return lower.charAt(0).toUpperCase() + lower.slice(1);
     }

  
  return (

    <div className={`alert alert-${props.alert.type}`} role={props.alert.role}>
           <p>{changeTypeText(props.alert.type)} : {props.alert.message}</p>  
    </div>
  )
}

//props.alert && means if props.alert is null then nothing will execute otherwise rest of the statement will execute