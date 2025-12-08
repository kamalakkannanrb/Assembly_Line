
import { useState,useEffect, useContext, ChangeEvent, RefObject } from "react"
import { Loader } from "../UtitliyComponents/Loader";
//API
import { getSASequences } from "../../api/getRecords";
//Contexts
import { SetMasterContext, SetScannedContext } from "../../context/context";

type SA={"Sub_Assembly":string,"ID":string,"Version":string,"SA_Sequence_ID":string};

export function SubAssemblies({SARef}:{SARef:RefObject<HTMLSelectElement | null>}){
    const[data,setData]=useState<null | SA[]>(null);
    const setMaster=useContext(SetMasterContext);
    const setScanned=useContext(SetScannedContext);
    useEffect(()=>{
        (async () => {
            const res=await getSASequences();
            const sub:SA[]=[];
            if(res){
                res.forEach((ele)=>{
                    sub.push({"Sub_Assembly":ele.Sub_Assembly_BOM.Sub_Assembly,"ID":ele.Sub_Assembly_BOM.ID,"Version":ele.Sub_Assembly_BOM.Version,"SA_Sequence_ID":ele.ID})
                })
            }
            setData(sub);
        })();
    },[])

    function handleChange(e:ChangeEvent<HTMLSelectElement>){
        // setScanned && setScanned({"Already":[],"Current":[],"Pointer":0,"ID":""});
        setScanned && setScanned({type:"Reset"})
        
        // setMaster && setMaster({"Sub Assembly ID":e.target.value.split("@")[0],"Sub Assembly Name":e.target.value.split("@")[1],"Main Line":null});
        setMaster && setMaster({type:"Set_SA_Name_ID_SA_Sequence_ID",data:{"Sub Assembly ID":e.target.value.split("@")[0],"Sub Assembly Name":e.target.value.split("@")[1],"SA Sequence ID":e.target.value.split("@")[2]}})
    }

    if(data!=null){
        return(<select onChange={handleChange} ref={SARef} className="rounded-lg bg-gray-100 p-1.5 text-center w-1/3 
            focus:border-0">
            <option value="" defaultChecked>Choose a Sub Assembly</option>
            {data?.map((ele,index)=><option key={index} value={ele.ID+"@"+ele.Sub_Assembly+"@"+ele.SA_Sequence_ID}>{ele?.Sub_Assembly} - {ele?.Version}</option>)}
        </select>)
    }
    else{
        return <Loader/>
    }
}