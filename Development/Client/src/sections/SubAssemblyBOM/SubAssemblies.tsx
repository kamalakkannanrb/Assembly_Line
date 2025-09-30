
import { useState,useEffect, useContext, ChangeEvent, RefObject } from "react"
import { Loader } from "../UtitliyComponents/Loader";
//API
import { getSABOM } from "../../api/getRecords";
//Contexts
import { SetItems,SetCurrentItems } from "../../context/context";

export function SubAssemblies({SARef}:{SARef:RefObject<HTMLSelectElement | null>}){
    const[data,setData]=useState<null | {"Part_Name":string,"ID":string,"Version":string}[]>(null);
    const setItems=useContext(SetItems);
    const setCurrentItems=useContext(SetCurrentItems);
    useEffect(()=>{
        (async () => {
            const res=await getSABOM();
            setData(res);
        })();
    },[])

    function handleChange(e:ChangeEvent<HTMLSelectElement>){
        setCurrentItems && setCurrentItems({"Already":[],"Current":[],"Pointer":0,"ID":""});
        //@ts-ignore
        setItems && setItems({"Sub Assembly ID":e.target.value.split("@")[0],"Sub Assembly Name":e.target.value.split("@")[1]});
    }

    if(data!=null){
        return(<select onChange={handleChange} ref={SARef} className="rounded-lg bg-gray-100 p-1.5 text-center
            focus:border-0">
            <option value="" defaultChecked>Choose a Sub Assembly</option>
            {data?.map((ele,index)=><option key={index} value={ele.ID+"@"+ele.Part_Name}>{ele?.Part_Name} - {ele?.Version}</option>)}
        </select>)
    }
    else{
        return <Loader/>
    }
}