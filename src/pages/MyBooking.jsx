import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import userService from "../features/user/userService";

function MyBooking(){

    const navigate = useNavigate();
    const { user } = useSelector(state=>state.auth);

    const getBooking = useCallback( async ()=>{
        try{
            const response = await userService.getBooking(user);
            console.log(response);
        }catch(error){
            console.log(error);
        }
    }, [user]);

    useEffect(()=>{
        if(!user || user==="null"){
            navigate("/login");
            return ;
        }

        getBooking();

    }, [user, getBooking]);

    return(
        <>

        </>
    );
}

export default MyBooking;