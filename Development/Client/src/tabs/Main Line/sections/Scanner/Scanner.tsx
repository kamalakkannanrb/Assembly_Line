
import { ChangeEvent, useContext, useState } from "react";
import { Toast } from "../../../../sections/UtitliyComponents/Toast";
import { Loader } from "../../../../sections/UtitliyComponents/Loader";

//API
import { getQC, getSATraceability } from "../../../../api/getRecords";

//Context
import { MainMasterContext, SetMainMasterContext } from "../../context/mainContext";

export function Scanner(){

    const mainMaster=useContext(MainMasterContext);
    const setMainMaster=useContext(SetMainMasterContext);
    const[toast,setToast]=useState({status:false,text:""});
    
    async function handleChange(e:ChangeEvent<HTMLInputElement>){
        if(e.target.value.trim().startsWith("QC")){
            const qc=await getQC(e.target.value.trim());
            if(qc!=null && mainMaster!="Loading" && qc[0].Part_Name.ID in mainMaster.Parts){
                if(mainMaster.Parts[qc[0].Part_Name.ID].Status!="Completed"){
                    let quantity=0;
                    
                }
                else{
                    setToast({status:true,text:"Part already completed"});
                }
            }
            else{
                setToast({status:true,text:"Wrong part"})
            }
        }
        else{
            const sa=await getSATraceability(e.target.value.trim());
            if(sa!=null && mainMaster!="Loading" && sa[0].Sub_Assembly_BOM.ID in mainMaster.Parts){
                if(mainMaster.Parts[sa[0].Sub_Assembly_BOM.ID].Status!="Completed"){
                    setMainMaster({type:"Set_SA_Traceability_ID",data:{"Part ID":sa[0].Sub_Assembly_BOM.ID,"SA_Traceability_ID":sa[0].ID}});
                }
                else{
                    setToast({status:true,text:"Part already completed"})
                }
            }
            else{
                setToast({status:true,text:"Wrong part"})
            }
        }
        e.target.value="";
    }

    if(mainMaster=="Loading")return <Loader/>
    return(
        <div>

            <img src="https://cdn-icons-gif.flaticon.com/7994/7994392.gif" className="w-18 rounded-2xl mx-auto mb-5"/>
            <input className="text-center w-full border bg-white border-gray-400 rounded-2xl p-1" placeholder="Scanner" type="text" autoFocus autoComplete="off"  onChange={handleChange}></input>
            {toast.status && <Toast message={toast.text} close={setToast}/>}
            
        </div>
    )
}