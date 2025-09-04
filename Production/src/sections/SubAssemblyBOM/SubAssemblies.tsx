
import { useState,useEffect } from "react"
import { getSABOM } from "../../API/getRecords";
import { Loader } from "../UtitliyComponents/Loader";

export function SubAssemblies({setSAID}:any){
    const[data,setData]=useState<null | [{"Part_Name":string,"ID":string,"Version":String}]>(null);
    useEffect(()=>{
        (async () => {
            const res=await getSABOM();
            setData(res);
        })();
    },[])
    if(data!=null){
        return(<select onChange={e=>setSAID(e.target.value)}>
            <option value="">Choose a Sub Assembly</option>
            {data?.map((ele,index)=><option key={index} value={ele.ID}>{ele?.Part_Name} - {ele?.Version}</option>)}
        </select>)
    }
    else{
        return <Loader/>
    }
}