import { createContext, useEffect, useState } from "react";
import { baseURL } from "../Data/baseURL";
export const APIContext=createContext({
    data:null,
    setData:()=>{},
    isLoading:true,
    setIsLoading:()=>{}
});



export const APIContextProvider=({children})=>{
    const [data,setData]=useState([]);
    const [isLoading,setIsLoading]=useState(true);
    const value={data,setData,isLoading,setIsLoading};

    useEffect(()=>{
        const fetchData=async()=>{
            const response=await fetch(baseURL)
                                .then(res=>res.json())
                                .catch(error=>console.log(error.message))

            const addSelectKeyToData=response.map(info=>{
                    info.selected=false;
                    info.edit=false;
                        return info;
                    });
            setData(addSelectKeyToData);
        };
        fetchData();
    },[])

    return (
        <APIContext.Provider value={value}>
          {children}
        </APIContext.Provider>
      );
}




