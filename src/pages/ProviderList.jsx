import { useEffect, useState } from "react";
import userService from "../features/user/userService";
import userServiceMock from "../features/user/userServiec.mock";
import ProviderCard from "../components/provider/provider.card";

function ProviderList(){

    const [providers, serProviders] = useState([]);

    useEffect(()=>{
        const getProviders = async ()=>{
            try{
                const response = await userServiceMock.getProviders();
                serProviders(response);
            }catch(error){
                console.log(error);
            }
        };

        getProviders();
    }, []);

    const renderProviders = ()=>{
        return providers.map((provider)=>{
            return <ProviderCard provider={provider} key={provider._id}/>
        });
    };

    return(
        <>
            <h1>Provider List</h1>
            {renderProviders()}
        </>
    );
}

export default ProviderList;