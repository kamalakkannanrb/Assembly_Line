
import { createContext, Dispatch, ReactNode, useReducer } from "react";

//Types
import { MasterType,ScannedType,parts } from "../types";

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
export const ScannedContext=createContext<ScannedType>({"Already":[],"Current":[],"Pointer":0,"ID":""});
export const SetScannedContext=createContext<Dispatch<ScanActionType> |null>(null);

type MasterActionType=
    | {type:"Reset"}
    | {type:"Set_SA_Name_ID_SA_Sequence_ID",data:{"Sub Assembly Name":string,"Sub Assembly ID":string,"SA Sequence ID":string}}
    | {type:"Set_Station_Parts",data:{"Station":string,"Parts":parts[],"Main Station":"true"|"false"|null,"Sub Assembly BOM Prefix":string}}
    | {type:"Make_Main_Staion_Null"}
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
   | {type:"Set_Already",data:{"Already":{ "Name": string,"ID":string,"QC_Name": string,"QC_ID":string,"Quantity":string}[],"Current":[],"Pointer":0,"ID":string}}
   | {type:"Add_Item_and_QC_Increment_Pointer",data:{"Name":string,"ID":string,"QC":{"QC_Name":string,"QC_ID":string,"Quantity":string}[]}}
   | {type:"Add_Item_and_QC",data:{"Name":string,"ID":string,"QC":{"QC_Name":string,"QC_ID":string,"Quantity":string}[]}}
   | {type:"Add_QC_To_Same_Item" ,data:{"QC_Name":string,"QC_ID":string,"Quantity":string}[]}
   | {type:"Add_QC_To_Same_Item_Increment_Pointer", data:{"QC_Name":string,"QC_ID":string,"Quantity":string}[]}

function scannedReducer(state:ScannedType,action:ScanActionType):ScannedType{
    switch (action.type) {
        case "Reset":return{
            "Already":[],"Current":[],"Pointer":0,"ID":""
        }

        case "Set_Already":{
            return{
                ...action.data
            }
        }

        case "Add_Item_and_QC_Increment_Pointer":{
            
            return{
                ...state,
                "Current":[...state.Current,action.data],
                "Pointer":state.Pointer+1,
            }
        }

        case "Add_Item_and_QC":{
           
            return{
                ...state,
                "Current":[...state.Current,action.data]
            }
        }

        case "Add_QC_To_Same_Item":{
            
            const newCurr=[...state.Current];
            const last=newCurr[state.Pointer];
            newCurr[state.Pointer]={...last,"QC":action.data};

            return{
                ...state,
                "Current":newCurr,
            }

        }

        case "Add_QC_To_Same_Item_Increment_Pointer":{

            const newCurr=[...state.Current];
            const last=newCurr[state.Pointer];
            newCurr[state.Pointer]={...last,"QC":action.data};
            return{
                ...state,
                "Current":newCurr,
                "Pointer":state.Pointer+1
            }

        }

        default:
            return state;
    }
}

export function Scanned({children}:{children:ReactNode}){
    const[state,disaptch]=useReducer(scannedReducer,{"Already":[],"Current":[],"Pointer":0,"ID":""});

    return(
        <ScannedContext value={state}>
            <SetScannedContext value={disaptch}>
                {children}
            </SetScannedContext>
        </ScannedContext>
    )
}