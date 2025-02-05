import React,{useState} from 'react';
import { sendContactMessage } from './Apiservice';
import './ContactForm.css'

const ContactForm = ()=>{
    const [formData,setFormData]=useState({
        name:"",
        email:"",
        subject:"",
        message:"",
    });
    const [responseMessage,setResponseMessage]=useState("");
    const handleChange=(e)=>{
        setFormData({...formData,[e.target.name]: e.target.value});
    };
    const handleSubmit = async (e)=>{
        e.preventDefault();
        try{
            const response=await sendContactMessage(formData);
            setResponseMessage(response.message);
            setFormData({name:"",email:"",subject:"",message:""});
        }catch(error){
            setResponseMessage("Failed to send message");
        }
    };

    return(
        <div className="contact-container">
            <div className="contact-box">
                
                <div className="contact-form">
                    <h2>Contact Us</h2>
                    <form onSubmit={handleSubmit}>
                        <label>Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required />

                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />

                        <label>Subject</label>
                        <input type="text" name="subject" value={formData.subject} onChange={handleChange} required />

                        <label>Message</label>
                        <textarea name="message" rows="4" value={formData.message} onChange={handleChange} required />

                        <button type="submit">Submit</button>
                    </form>
                    {responseMessage && <p className="response-message">{responseMessage}</p>}
                </div>

                
                <div className="contact-info">
                    <h3>Weekend Sports</h3>
                    <p>Coimbatore, Tamil Nadu</p>
                    <p>657489</p>
                    <p>📞 9098956010</p>
                    <p>📧 weekendsports@gmail.com</p>

                    <h4>Social Media</h4>
                    <p>Instagram | Twitter | LinkedIn</p>
                </div>
            </div>
        </div>

    );
};
export default ContactForm;