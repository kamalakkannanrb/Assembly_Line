
import { useContext} from "react";
import { Loader } from "../UtitliyComponents/Loader";

//Contexts
import { Items,CurrentItems } from "../../context/context";


export function AssembleItems(){
    const items=useContext(Items);
    const currentItems=useContext(CurrentItems);
    // const temp=currentItems[currentItems.length-1];
    if(items?.Parts){
        return(
            <>
                <h1 className="font-bold">Assemble Items</h1>
                <ol>
                    {items.Parts.map((ele,index)=>(<li key={index} className={`text-center ${ele.Type=="bin"?"text-red-600":"text-green-600"}`}>{ele.Name} - {ele.Prefix} - {currentItems[index]?.QC}</li>))}
                </ol>
            </>
        )
    }
    return(
        <>
            <h1 className="font-bold">Assemble Items</h1>
            <Loader/>
        </>
    ) 
        
}