
import { createContext, Dispatch, ReactNode, useReducer } from "react";

//Types
import { MasterType,ScannedType, QCDetails, parts, ScannedParts } from "../types";

//API
import { getQC } from "../api/getRecords";

export const MasterContext=createContext<MasterType>({
    "Sub Assembly Name":null,
    "Sub Assembly ID":null,
    "Sub Assembly BOM Prefix":null,
    "SA Sequence ID":null,
    "Station":null,
    "Main Station":null,
    "Parts":null,
    "Main Line":null,
    "Red Tag":false
});
export const SetMasterContext=createContext<Dispatch<MasterActionType> | null>(null);
export const ScannedContext=createContext<ScannedType>({"Already":[],"Current":{},"SA_Traceability_Report_ID":"","Submit":false,"Number of Parts":0});
export const SetScannedContext=createContext<Dispatch<ScanActionType> |null>(null);

type MasterActionType=
    | {type:"Reset"}
    | {type:"Set_SA_Name_ID_SA_Sequence_ID",data:Pick<MasterType,"Sub Assembly Name" | "Sub Assembly ID" | "SA Sequence ID">}
    | {type:"Set_Station_Parts",data:Pick<MasterType,"Station" | "Parts" | "Main Station" | "Sub Assembly BOM Prefix">}
    | {type:"Make_Main_Staion_Null"}
    | {type:"Make_Main_Station_false"}
    | {type:"Enable_Main_Line",data:string}
    | {type:"Diable_Main_Line"}
    | {type:"Enable_Red_Tag"}
    | {type:"Disable_Red_Tag"}


function masterReducer(state:MasterType,action:MasterActionType):MasterType{
    switch (action.type) {
        case "Reset":return{
            "Sub Assembly Name":null,
            "Sub Assembly ID":null,
            "Sub Assembly BOM Prefix":null,
            "SA Sequence ID":null,
            "Station":null,
            "Main Station":null,
            "Parts":null,
            "Main Line":null,
            "Red Tag":false
        }
        
        case "Set_SA_Name_ID_SA_Sequence_ID":{
            return{
                ...action.data,
                "Sub Assembly BOM Prefix":null,
                "Station":null,
                "Main Station":null,
                "Parts":null,
                "Main Line":null,
                "Red Tag":false
            }
        }

        case "Set_Station_Parts":{
            return{
                ...state,
                ...action.data
            }
        }

        case "Make_Main_Staion_Null":return{
            ...state,
            "Main Station":null
        }

        case "Make_Main_Station_false":return{
            ...state,
            "Main Station":"false"
        }

        case "Enable_Main_Line":return{
            ...state,
            "Main Line":action.data
        }

        case "Diable_Main_Line":return{
            ...state,
            "Main Line":null
        }

        case "Enable_Red_Tag":return{
            ...state,
            "Red Tag":true
        }

        case "Disable_Red_Tag":return{
            ...state,
            "Red Tag":false
        }
        
        default:
            return state;
    }
}


export function Master({children}:{children:ReactNode}){
    const[state,disaptch]=useReducer(masterReducer,{
        "Sub Assembly Name":null,
        "Sub Assembly ID":null,
        "Sub Assembly BOM Prefix":null,
        "SA Sequence ID":null,
        "Station":null,
        "Main Station":null,
        "Parts":null,
        "Main Line":null,
        "Red Tag":false
    });

    return(
        <MasterContext value={state}>
            <SetMasterContext value={disaptch}>
                {children}
            </SetMasterContext>
        </MasterContext>
    )
        
}

type ScanActionType=
   | {type:"Reset"}
   | {type:"Reset_Set_Part_Size",data:number}
   | {type:"Set_Already",data:Pick<ScannedType,"Already" | "SA_Traceability_Report_ID">}
   | {type:"SA_Traceability_Report_ID",data:string}
   | {type:"Set_Part_and_QC",data:ScannedParts}
   | {type:"After_Submit_Workflows", data:{"Part_ID": string,"QC_ID": string,"QC_Name":string,"Quantity": string}[]} 


function scannedReducer(state:ScannedType,action:ScanActionType):ScannedType{
    switch (action.type) {
        case "Reset":return{
            "Already":[],"Current":{},"SA_Traceability_Report_ID":"","Submit":false,"Number of Parts":0
        }

        case "Reset_Set_Part_Size":return{
            "Already":[],"Current":{},"SA_Traceability_Report_ID":"","Submit":false,"Number of Parts":action.data
        }

        case "Set_Already":{
            return{
                ...state,
                ...action.data
            }
        }

        case "SA_Traceability_Report_ID":return{
            ...state,
            "SA_Traceability_Report_ID":action.data
        }

        case "Set_Part_and_QC":{
            const curr={...state.Current}
            curr[action.data["ID"]]=action.data
            let flag=false;
            const arr=Object.values(curr)
            if(state["Number of Parts"]>0 && state["Number of Parts"]==arr.length){
                for(const values of arr){
                    if(values["Current Quantity"]>=values["Required Quantity"]){
                        flag=true;
                    }
                    else{
                        flag=false;
                        break;
                    }
                }
            }
            return{
                ...state,
                "Current":curr,
                "Submit":flag
            }
        }

        // case "After_Submit_Workflows":{
        //     const curr={...state.Current}
        //     const arr=Object.values(curr)
        //     let flag=true
        //     arr.forEach(async(ele)=>{
        //         const QCs:QCDetails[]=[]
        //         let quants=0;
        //         for(const qc of ele.QC){
        //             const response=await getQC(qc.QC_Name);
        //             if(response && Number.parseFloat(response[0].Quantity)>0){
        //                 QCs.push({"QC_ID":response[0].ID,"QC_Name":response[0].QC_ID,"Quantity":response[0].Quantity});
        //                 quants+=Number.parseFloat(response[0].Quantity);
        //                 if(quants>=ele["Required Quantity"])break;
        //             }
        //         }
        //         if(quants<curr[ele.ID]["Required Quantity"])flag=false
        //         curr[ele.ID].QC=QCs
        //     })
        //     return{
        //         ...state,
        //         "Current":curr,
        //         "Submit":flag
        //     }
        // }

        case "After_Submit_Workflows":{
            const curr={...state.Current};
            console.log(curr);
            Object.values(curr).forEach((ele)=>{
                ele["Current Quantity"]=0;
                ele.QC=[]
            })
            let flag=true;
            for(const qc of action.data){
                if(Number.parseFloat(qc.Quantity)>0){
                    curr[qc.Part_ID]["Current Quantity"]+=Number.parseFloat(qc.Quantity);
                    curr[qc.Part_ID].QC.push({"QC_ID":qc.QC_ID,"QC_Name":qc.QC_Name,"Quantity":qc.Quantity})
                }
            }
            const arr=Object.values(curr);
            for(const part of arr){
                if(part["Current Quantity"]<part["Required Quantity"]){
                    flag=false;
                    break;
                }
            }
            return{
                ...state,
                "Current":curr,
                "Submit":flag
            }
        }


        default:
            return state;
    }
}

export function Scanned({children}:{children:ReactNode}){
    const[state,disaptch]=useReducer(scannedReducer,{"Already":[],"Current":{},"SA_Traceability_Report_ID":"","Submit":false,"Number of Parts":0});

    return(
        <ScannedContext value={state}>
            <SetScannedContext value={disaptch}>
                {children}
            </SetScannedContext>
        </ScannedContext>
    )
}