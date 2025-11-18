
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
                const part=mainMaster.Parts[qc[0].Part_Name.ID];
                if(part.Status!="Completed"){
                    let quantity=0;
                    Object.values(part.QC).forEach((ele)=>{
                        if(ele?.Quantity && ele.QC_ID!=qc[0].QC_ID)quantity+=Number.parseFloat(ele.Quantity);
                    })
                    if(quantity==Number.parseFloat(part.Required_Quantity))setToast({status:true,text:"Part already completed"});
                    else if(Number.parseFloat(qc[0].Quantity)<Number.parseFloat(part.Required_Quantity)-quantity){
                        setToast({status:true,text:"Quantity low"});
                        setMainMaster({type:"Add_QC_Status_Pending",data:{"ID":qc[0].ID,"Part ID":qc[0].Part_Name.ID,"QC_ID":qc[0].QC_ID,"Quantity":qc[0].Quantity,"Current_Quantity":(Number.parseFloat(qc[0].Quantity)+quantity).toString()}})
                    }
                    else if(Number.parseFloat(qc[0].Quantity)>=Number.parseFloat(part.Required_Quantity)-quantity){
                        setMainMaster({type:"Add_QC_Status_Completed",data:{"ID":qc[0].ID,"Part ID":qc[0].Part_Name.ID,"QC_ID":qc[0].QC_ID,"Quantity":(Number.parseFloat(part.Required_Quantity)-quantity).toString()}})
                    }
                    else setToast({status:true,text:"Something wrong"});
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
                    setMainMaster({type:"Set_SA_Traceability_ID",data:{"Part ID":sa[0].Sub_Assembly_BOM.ID,"SA_Traceability_ID":sa[0].ID,"SA_Sticker":sa[0].SA_Traceability_ID}});
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