
import { useState,useEffect, useContext, RefObject, ChangeEvent } from "react"
import { Loader } from "../UtitliyComponents/Loader";

//API
import { getSASequence } from "../../api/getRecords";

//Types
import { SASequence, parts } from "../../types";

//Contexts
import { MasterContext, SetMasterContext, SetScannedContext } from "../../context/context";

export function Stations({stationRef}:{stationRef:RefObject<HTMLSelectElement | null>}){
    const[data,setData]=useState<null | {"Stations":string[],"Main Station":string,"Items":[SASequence]}>(null);
    const master=useContext(MasterContext);
    const setMaster=useContext(SetMasterContext);
    const setScanned=useContext(SetScannedContext)
    useEffect(()=>{
        setData(null);
        (async () => {
            const res=master["Sub Assembly ID"]?await getSASequence(master?.["Sub Assembly ID"]):null;
            console.log(res);
            if(!res){
                setData(null);
                setMaster && setMaster({type:"Reset"});
                return;
            }
            const stations:string[]=[];
            var main="";
            res[0]?.Parts?.forEach((ele)=>{
                if(ele.Traceability=="Yes" && !stations.includes(ele.Station_Number)){
                    stations.push(ele.Station_Number);
                }
                if(ele.Main_Station=="true")main=ele.Station_Number;
                return
            })
            stations.sort();
            setData({"Items":res,"Main Station":main,"Stations":stations})
        })();
    },[master?.["Sub Assembly ID"]])

    function handleChange(e:ChangeEvent<HTMLSelectElement>){
   
        setScanned && setScanned({type:"Reset"})
        const parts:parts[]=new Array<parts>();
        data?.Items[0].Parts.forEach((ele)=>{
            if(ele.Traceability=="Yes" && ele.Station_Number==e.target.value){
                parts.push({"Name":ele.Part_Name.Part_Name,"ID":ele.Part_Name.ID,"Quantity":ele.Quantity,"Sequence":ele.Sequence_Number.length>0?ele.Sequence_Number:data.Items[0].Parts.length.toString()});
            };
        });
        console.log(e.target.value.length);
        parts.sort((a,b)=>(Number.parseInt(a.Sequence)-Number.parseInt(b.Sequence)));
       
        data && parts && setMaster && setMaster({
            type:"Set_Station_Parts",
            data:{"Station":e.target.value,"Parts":parts,"Main Station":data["Main Station"]==e.target.value?"true":e.target.value.length==0?null:"false","Sub Assembly BOM Prefix":data.Items[0].Sub_Assembly_BOM_Prefix}
        })

    }

   if(data!=null){
        return(
            <select onChange={handleChange} ref={stationRef} className="rounded-lg bg-gray-100 p-1.5 text-center
            focus:border-0">
                <option value="" defaultChecked>Choose a Station</option>
                {data?.Stations.map((ele,index)=><option key={index}>{ele}</option>)}
            </select>
        );
    }
    else{
        return <Loader/>
    }

}