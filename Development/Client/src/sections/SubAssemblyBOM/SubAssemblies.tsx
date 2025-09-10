
import { useState,useEffect, useContext, ChangeEvent, RefObject } from "react"
import { getSABOM } from "../../API/getRecords";
import { Loader } from "../UtitliyComponents/Loader";
import { SetItems } from "../BentoGrid";

export function SubAssemblies({SARef}:{SARef:RefObject<HTMLSelectElement | null>}){
    const[data,setData]=useState<null | [{"Part_Name":string,"ID":string,"Version":string}]>(null);
    const setItems=useContext(SetItems);
    useEffect(()=>{
        (async () => {
            const res=await getSABOM();
            setData(res);
        })();
    },[])

    function handleChange(e:ChangeEvent<HTMLSelectElement>){
        // console.log(e.target.value.split("@")[1]);
        setItems({"Sub Assembly ID":e.target.value.split("@")[0],"Sub Assembly Name":e.target.value.split("@")[1]});
    }

    if(data!=null){
        return(<select onChange={handleChange} ref={SARef}>
            <option value="">Choose a Sub Assembly</option>
            {data?.map((ele,index)=><option key={index} value={ele.ID+"@"+ele.Part_Name}>{ele?.Part_Name} - {ele?.Version}</option>)}
        </select>)
    }
    else{
        return <Loader/>
    }
}