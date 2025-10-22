
import { useState,useEffect, useContext, ChangeEvent, RefObject } from "react"
import { Loader } from "../UtitliyComponents/Loader";
//API
import { getSABOM } from "../../api/getRecords";
//Contexts
import { SetMasterContext, SetScannedContext } from "../../context/context";

export function SubAssemblies({SARef}:{SARef:RefObject<HTMLSelectElement | null>}){
    const[data,setData]=useState<null | {"Part_Name":string,"ID":string,"Version":string}[]>(null);
    const setMaster=useContext(SetMasterContext);
    const setScanned=useContext(SetScannedContext);
    useEffect(()=>{
        (async () => {
            const res=await getSABOM();
            setData(res);
        })();
    },[])

    function handleChange(e:ChangeEvent<HTMLSelectElement>){
        // setScanned && setScanned({"Already":[],"Current":[],"Pointer":0,"ID":""});
        setScanned && setScanned({type:"Reset"})
        
        // setMaster && setMaster({"Sub Assembly ID":e.target.value.split("@")[0],"Sub Assembly Name":e.target.value.split("@")[1],"Main Line":null});
        setMaster && setMaster({type:"Set_SA_Name_ID",data:{"Sub Assembly ID":e.target.value.split("@")[0],"Sub Assembly Name":e.target.value.split("@")[1]}})
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