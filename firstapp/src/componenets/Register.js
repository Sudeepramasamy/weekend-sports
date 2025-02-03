import React,{useState} from 'react'
import axios from 'axios'
import {useNavigate} from "react-router-dom"

const Register=()=>{
    const[formData,setFormData]=useState({
        username:"",
        email:"",
        password:"",
        confirmPassword:"",
    });
    const[error,setError]=useState("");
    const[success,setSuccess]=useState("");
    const navigate=useNavigate();

    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]:e.target.value});
    };
    const handleSubmit=async(e)=>{
        e.preventDefault();
        const{username,email,password,confirmPassword}=formData;

        if(password!==confirmPassword){
            setError("Password do not match");
            return;
        }
        try{
            const response=await axios.post('http://127.0.0.1:8000/register/',{username,email,password,confirm_password: confirmPassword});
            setSuccess("Registration sucessful!now you can login");
            setError("");
            setFormData({username:"",email:"",password:""});
            setTimeout(()=>navigate("/login"),2000);
        }catch(error){
            console.log(error.response);
            setError(error.response?.data?.error||"registrationfailed");
        }
    };
    return(
        <div className="container mt-5">
        <h2 className="text-center">Register</h2>
        <form onSubmit={handleSubmit} className="p-3 border rounded">
          {error && <p className="text-danger">{error}</p>}
          {success && <p className="text-success">{success}</p>}
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="form-control"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Register
          </button>
        </form>
      </div>
    );
};
export default Register;