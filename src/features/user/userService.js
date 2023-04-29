import axios from "axios";

import { API_URL } from "../../config/config";

const getProviders = async () => {
    try{
        const response = await axios.get(API_URL + "providers/");
        return response.data;
    }catch(error){
        console.log(error);
    }
};

const getBooking = async (user) => {
    if(!user || user==="null"){
        throw new Error("user not logged in");
    }
    try {
        const response = await axios.get(API_URL + "bookings/", {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + user.token,     
            },
        });
        return response.data;
    }catch(error){
        console.log(error);
    }
};

const createBooking = async (user, provider) => {
    if(!user || user==="null"){
        throw new Error("user not logged in");
    }
    if(!provider){
        throw new Error("invalid provider");
    }
    try {
        
    }catch(error){

    }
};

const userService = {
    getProviders,
    getBooking,
    createBooking,
}

export default userService;