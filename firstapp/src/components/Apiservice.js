import axios from 'axios'


const getAuthToken=()=>{
    return localStorage.getItem("access_token");
};

const refreshAccess=async()=>{
    try{
        const refreshToken=localStorage.getItem("refresh_token");
        if(!refreshToken) throw new Error("No refresh token available");

        const response = await axios.post("http://127.0.0.1:8000/token/refresh/",{
            refresh:refreshToken,
        });
        localStorage.setItem("access_token",response.data.access);
        return response.data.access;
    } catch (error){
        console.error("token refresh failed",error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        return null;
    }
};

export async function getturf() {
    let token = getAuthToken();

    if (!token) {
        return Promise.reject(new Error("User is not authenticated"));
    }

    try {
        const response = await axios.get("http://127.0.0.1:8000/turf/", {
            headers: { Authorization: `Bearer ${token}` },
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            console.warn("Token expired, attempting refresh...");
            token = await refreshAccess();
            if (token) {
                return getturf();
            }else {
                console.error("Refresh failed, logging out...");
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");
                window.location.href = "/login"; // Redirect to login page
            }
        }
        throw error;
    }
}


export function getTurfDetails(turfId){

    const token = getAuthToken();

    if (!token){
        return Promise.reject(new Error("user is not authenticated"));
    }
    return axios.get(`http://127.0.0.1:8000/turf/${turfId}/`,{
        headers: { Authorization: `Bearer ${token}`},
    })
    .then(res=>res.data);
}

export function checkAvailable(turfId){

    const token = getAuthToken();

    if(!token){
        return Promise.reject(new Error("User is not authenticated"));
    }
    return axios.get(`http://127.0.0.1:8000/turf/${turfId}/availability/`,{
        headers:{Authorization: `Bearer ${token}`},
    })
    .then(res=>res.data);
}

export function bookTurf(turfId, username,selectedTime) {
    const token = localStorage.getItem("access_token"); // Retrieve token from localStorage

    if (!token) {
        return Promise.reject(new Error("User is not authenticated")); // Reject if no token
    }

    return axios.post(
        `http://127.0.0.1:8000/turf/${turfId}/booking/`,
        { user_name: username,selected_time:selectedTime },
        {
            headers: { Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", }, // Include token in the request headers
        }
    )
    .then(res => res.data)
    .catch(error => {
        console.error("Booking failed:", error);
        throw error;
    });
}

export const sendContactMessage=async (formData)=>{
    try{
        const response=await axios.post("http://127.0.0.1:8000/contact/",formData);
        return response.data;
    }catch(error){
        console.error("error sending message",error)
        throw error;
    }
}

