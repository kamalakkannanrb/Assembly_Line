
import { createContext, ReactNode, useEffect, useContext, useReducer, Dispatch } from "react";

//Context
import { MasterContext } from "../../../context/context";

//Types
import { VIN, DataStruct, MainMasterType } from "../types/main";

//API
import { getVIN } from "../api/getRecords";

export const MainMasterContext=createContext<"Loading" | MainMasterType>("Loading");
export const SetMainMasterContext=createContext<Dispatch<MainMasterActionType>>(()=>{});

type MainMasterActionType=
    | {type:"Set_Loading"}
    | {type:"Set_Data",data:MainMasterType}
    | {type:"Set_SA_Traceability_ID",data:{"Part ID":string,"SA_Traceability_ID":string}}


function mainMasterReducer(state:"Loading" | MainMasterType,action:MainMasterActionType){
    switch(action.type){

        case "Set_Loading":return "Loading";

        case "Set_Data":
            return action.data;
        
        case "Set_SA_Traceability_ID":{
            if(state!="Loading"){
                const parts={...state.Parts};
                parts[action.data["Part ID"]].Status="Completed";
                parts[action.data["Part ID"]].Sub_Assembly_Traceability=action.data.SA_Traceability_ID;
                parts[action.data["Part ID"]].Quantity="1.00";
                return{
                    ...state,
                    Parts:parts
                }
            }   
            else return state;
        }
            
        default:return state

    }

}

export function MainMaster({children}:{children:ReactNode}){

    const master=useContext(MasterContext);
    const [masterState,masterDisaptch]=useReducer(mainMasterReducer,"Loading");
    
    useEffect(()=>{
        async function get(){
            console.log("ren");
            const vin:[VIN] | null=master["Main Line"]?await getVIN(master["Main Line"]):null;
            if(vin!=null){
                const parts:DataStruct=vin[0].Traceability.reduce((acc:DataStruct,curr)=>{

                    if(curr.Type_field=="Part"){
                        
                        if(curr.Part_Name.ID in acc){
                            acc[curr.Part_Name.ID].QC[curr.QC.ID]={"QC_ID":curr.QC.QC_ID,"Quantity":curr.Quantity}
                            let quantity=0;
                            Object.values(acc[curr.Part_Name.ID].QC).forEach((ele)=>quantity+=ele?.Quantity?Number.parseFloat(ele.Quantity):0);
                            acc[curr.Part_Name.ID]={
                                ...acc[curr.Part_Name.ID],
                                "Quantity":quantity.toString(),
                                "Status":quantity==Number.parseFloat(acc[curr.Part_Name.ID].Required_Quantity)?"Completed":"Pending"
                            }
                        }
                        else{
                            acc[curr.Part_Name.ID]={
                                "Name":curr.Part_Name.Part_Name,
                                "Type_field":"Part",
                                "Required_Quantity":curr.Required_Quantity,
                                "Status":Number.parseFloat(curr.Quantity)==Number.parseFloat(curr.Required_Quantity)?"Completed":"Pending",
                                "Quantity":curr.Quantity,
                                "QC":curr.QC?.ID?{
                                    [curr.QC.ID]:{
                                        "QC_ID":curr.QC.QC_ID,
                                        "Quantity":curr.Quantity
                                    }
                                }:{},
                                "Sub_Assembly_Traceability":""
                            }
                        }
                    }
                    else{
                        acc[curr.Sub_Assembly_BOM.ID]={
                            "Name":curr.Sub_Assembly_BOM.Part_Name,
                            "Type_field":"Sub Assembly",
                            "Quantity":curr.Quantity,
                            "QC":{},
                            "Status":Number.parseFloat(curr.Quantity)==Number.parseFloat(curr.Required_Quantity)?"Completed":"Pending",
                            "Sub_Assembly_Traceability":curr.Sub_Assembly_Traceability?.ID?curr.Sub_Assembly_Traceability.ID:"",
                            "Required_Quantity":curr.Required_Quantity
                        }
                    }
                    return acc;
                },{});
                masterDisaptch({type:"Set_Data",data:{"Bike Name":vin[0].Bike_Name.Bike_Name,"Bike ID":vin[0].Bike_Name.ID,"Parts":parts}});
            }
            else masterDisaptch({type:"Set_Loading"});
        }
        if(master["Main Line"]!=null)get();
        else masterDisaptch({type:"Set_Loading"});
    },[master["Main Line"]]);

    return(
       <MainMasterContext value={masterState}>
            <SetMainMasterContext value={masterDisaptch}>
                {children}
            </SetMainMasterContext>
       </MainMasterContext>
    )
}



