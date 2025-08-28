
import { useState,useEffect } from "react"
import { Loader } from "./Loader";

export function Selector(){
    const[data,setData]=useState<null | [{"SA_Name":string,"ID":string}]>(null);
    // useEffect(()=>{
    //     (async () => {
    //         const res=await getRecords();
    //         setData(res);
    //     })();
    // },[])
    if(data!=null){
        return(<select>
            {data?.map((ele,index)=><option key={index}>{ele?.SA_Name}</option>)}
        </select>)
    }
    else{
        return <Loader/>
    }
}