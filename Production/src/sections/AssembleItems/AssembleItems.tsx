
import { useContext} from "react";

//Contexts
import { Items,CurrentItems } from "../../context/context";


export function AssembleItems(){
    const items=useContext(Items);
    const currentItems=useContext(CurrentItems);
    
        return(
            <div className="BottomBoxes">
                <h1 className="font-bold text-center text-2xl mb-2">Assemble Items</h1>
                <ol>
                    {items?.Parts && items.Parts.map((ele,index)=>(<li key={index} className={`text-start font-medium ${ele.Type=="bin"?"text-red-600":"text-green-600"}`}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline text-black"><path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/></svg> {ele.Name} - {ele.Prefix} - {currentItems.Current[index]?.QC}</li>))}
                </ol>
            </div>
        )
        
}