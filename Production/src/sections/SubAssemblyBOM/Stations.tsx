
import { useState,useEffect } from "react"
import { Loader } from "../UtitliyComponents/Loader";
import { getSASequence } from "../../API/getRecords";
import { SASequence } from "../../types";

export function Stations({setStation,SAID}:any){
    const[data,setData]=useState<null | [SASequence]>(null);
    useEffect(()=>{
        (async () => {
            const res=await getSASequence(SAID);
            console.log(res);
            setData(res);
        })();
    },[SAID])

   if(data!=null){
        return(<select onChange={e=>setStation(e.target.value)}>
            <option value="">Choose a Station</option>
            {data?.[0].Parts.map((ele,index)=><option key={index}>{ele.Station_Number}</option>)}
        </select>)
    }
    else{
        return <Loader/>
    }
}