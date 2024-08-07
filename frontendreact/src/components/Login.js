
import React, {useState} from 'react'
import { useHistory } from 'react-router-dom'


const Login = (props) => {

    //Setting the state variable for storing the credentials as email and password...and this setCredentials is is updated in onchange method
    const [credentials, setCredentials] = useState({email: "", password: ""}) 

    //use history hook is used to navigate from anywhere and from any component very easily..
    let history = useHistory();

    const handleSubmit = async (e) => {

        //API call
        e.preventDefault();
        const response = await fetch("http://localhost:8000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },

            //email and password is being sent from frontend to backend body as header in thart API ...
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });

        //RResponse from the backend..
        const json = await response.json()
        console.log(json);

        //success is either true or false which is passed from backend with JSON...
        if (json.success){
            // Saving the auth token and Redirecting to home page..
            localStorage.setItem('token', json.authtoken); 
            history.push("/");

        }
        else{
            alert("Invalid credentials");
        }
    }

    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div>
            <form  onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange} id="email" name="email" aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" />
                </div>

                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
