import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'

function SignUp() {

      //Setting the state variable for storing the credentials as name,email,password and cpassword...and this setCredentials is is updated in onchange method
    const [credentials, setCredentials] = useState({name: "",email: "", password: "",cpassword: ""}) 

    //use history hook is used to navigate from anywhere and from any component very easily..
    let history = useHistory();

    const handleSubmit = async (e) => {
        const {name,email,password}=credentials;
        //API call
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/auth/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            //email and password is being sent from frontend to backend body as header in thart API ...
            body: JSON.stringify({name,email,password})
        });

        //RResponse from the backend..
        const json = await response.json()
        console.log(json);

        // Saving the auth token and Redirecting to home page..
        localStorage.setItem('token', json.authtoken); 
        history.push("/");

    }


    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" value={credentials.name} onChange={onChange} id="name" name="name" aria-describedby="emailHelp" required minLength={5}/>
                </div>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" required  />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" required minLength={5}/>
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
  )
}
        
export default SignUp
