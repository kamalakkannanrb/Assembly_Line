
import { createContext, ReactNode, useEffect, useContext, useReducer, Dispatch } from "react";

//Context
import { MasterContext } from "../../../context/context";

//Types
import { DataStruct, MainMasterType } from "../types/main";

//API
import { getMainSequence,getVIN } from "../api/getRecords";

const MainMasterContext=createContext<"Loading" | MainMasterType>("Loading");
const SetMainMasterContext=createContext<Dispatch<MainMasterActionType>>(()=>{});
// const MainScannedContext=createContext();
// const SetMainScannedContext=createContext();

type MainMasterActionType=
    | {type:"Set_Loading"}
    | {type:"Set_Data",data:MainMasterType}


function mainMasterReducer(state:"Loading" | MainMasterType,action:MainMasterActionType){
    switch(action.type){

        case "Set_Loading":return "Loading";

        case "Set_Data":{
            return action.data;
        }

    }

}

export function MainMaster({children}:{children:ReactNode}){

    const master=useContext(MasterContext);
    const [masterState,masterDisaptch]=useReducer(mainMasterReducer,"Loading");
    // const [scannedState,scannedDispatch]=useReducer(,);
    useEffect(()=>{
        (async () => {
            const vin=master["Main Line"]?await getVIN(master["Main Line"]):null;
            const main=vin!=null && vin[0]?.Bike_Name?.ID?await getMainSequence(vin[0].Bike_Name.ID):null;
            let sequence=null;
            let already:any=[];
            let auxiliary:DataStruct={};
            if(main!=null){
                sequence=main[0].Parts.reduce((acc:DataStruct,curr)=>{
                    if(curr.Type_field=="Part"){
                        acc[curr.Part_Name.ID]={
                            "Part ID":curr.Part_Name.ID,
                            "Part Name":curr.Part_Name.Part_Name,
                            "Quantity":curr.Quantity,
                            "Type_field":curr.Type_field
                        }
                    }
                    else{
                        acc[curr.Sub_Assembly_BOM.ID]={
                            "Part ID":curr.Sub_Assembly_BOM.ID,
                            "Part Name":curr.Sub_Assembly_BOM.Part_Name,
                            "Quantity":curr.Quantity,
                            "Type_field":curr.Type_field
                        }
                    }
                    return acc;
                },{})
                // console.log(sequence);
            }
            
            if(sequence!=null && vin!=null){
                vin[0].Traceability.forEach((ele)=>{
                    if(ele.Status=="Completed")already.push(ele);
                    else{
                        if(ele.Type_field=="Part"){
                            if(ele.Part_Name.ID in auxiliary){
                                auxiliary[ele.Part_Name.ID].Quantity=(Number.parseFloat(auxiliary[ele.Part_Name.ID].Quantity)+Number.parseFloat(ele.Quantity)).toString();
                            }
                            else{
                                auxiliary[ele.Part_Name.ID]={
                                    "Part ID":ele.Part_Name.ID,
                                    "Part Name":ele.Part_Name.Part_Name,
                                    "Quantity":ele.Quantity,
                                    "Type_field":ele.Type_field
                                }
                            }
                        }
                        else{
                            if(ele.Sub_Assembly_BOM.ID in auxiliary){
                                auxiliary[ele.Sub_Assembly_BOM.ID].Quantity=(Number.parseFloat(auxiliary[ele.Sub_Assembly_BOM.ID].Quantity)+Number.parseFloat(ele.Quantity)).toString();
                            }
                            else{
                                auxiliary[ele.Sub_Assembly_BOM.ID]={
                                    "Part ID":ele.Sub_Assembly_BOM.ID,
                                    "Part Name":ele.Sub_Assembly_BOM.Part_Name,
                                    "Quantity":ele.Quantity,
                                    "Type_field":ele.Type_field
                                }
                            }
                        }
                    }
                })
            }
            
            if(main!=null && sequence!=null && Object.keys(auxiliary).length>0){
                masterDisaptch({type:"Set_Data",data:{
                    "Already":already,
                    "Auxiliary":auxiliary,
                    "Sequence":sequence,
                    "Bike Name":main[0].Bike_Name.Bike_Name,
                    "Bike ID":main[0].Bike_Name.ID
                }})
            }
            else masterDisaptch({type:"Set_Loading"});


        })();
    },[master["Main Line"]]);

    return(
       <MainMasterContext value={masterState}>
            <SetMainMasterContext value={masterDisaptch}>
                {children}
            </SetMainMasterContext>
       </MainMasterContext>
    )
}



