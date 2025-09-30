
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
                <ol className="rounded-3xl shadow-2xl p-3 bg-white">
                    <h1 className="font-bold text-center text-2xl mb-2">Assemble Items</h1>
                    {items.Parts.map((ele,index)=>(<li key={index} className={`text-start ${ele.Type=="bin"?"text-red-600":"text-green-600"}`}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="inline text-black"><path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/></svg> {ele.Name} - {ele.Prefix} - {currentItems.Current[index]?.QC}</li>))}
                </ol>
            </>
        )
    }
    return(
        <>
            <h1 className="font-bold text-2xl mb-2">Assemble Items</h1>
            <Loader/>
        </>
    ) 
        
}