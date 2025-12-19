
import { useContext } from "react";

//Contexts
import { MasterContext, ScannedContext } from "../../context/context";


export function AssembleItems(){

    const master=useContext(MasterContext)
    const scanned=useContext(ScannedContext);
    
    return(
        <div className="BottomBoxes grow">
            <h1>Assemble Items</h1>
            <div className="h-[90%] p-3 overflow-auto">
                {/* <ol>
                    {scanned?.Parts && scanned.Parts.map((ele,index)=>(<li key={index} className={`text-start font-medium ${ele.Type=="bin"?"text-blue-600":"text-green-600"}`}><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline text-black"><path d="M15.39 4.39a1 1 0 0 0 1.68-.474 2.5 2.5 0 1 1 3.014 3.015 1 1 0 0 0-.474 1.68l1.683 1.682a2.414 2.414 0 0 1 0 3.414L19.61 15.39a1 1 0 0 1-1.68-.474 2.5 2.5 0 1 0-3.014 3.015 1 1 0 0 1 .474 1.68l-1.683 1.682a2.414 2.414 0 0 1-3.414 0L8.61 19.61a1 1 0 0 0-1.68.474 2.5 2.5 0 1 1-3.014-3.015 1 1 0 0 0 .474-1.68l-1.683-1.682a2.414 2.414 0 0 1 0-3.414L4.39 8.61a1 1 0 0 1 1.68.474 2.5 2.5 0 1 0 3.014-3.015 1 1 0 0 1-.474-1.68l1.683-1.682a2.414 2.414 0 0 1 3.414 0z"/></svg> {ele.Name} - {ele.Prefix} - {scanned?.Current[index]?.QC}</li>))}
                </ol> */}
                <table className="w-full table-fixed">
                    <thead>
                        <tr className="font-bold">
                            <td className="w-[50%]">Name</td>
                            <td>Required Quantity</td>
                            <td>Current Quantity</td>
                            <td>QCID</td>
                        </tr>
                    </thead>
                    <tbody>
                        {master?.Parts && Object.keys(master.Parts).map((ele,index)=>{
                            return <tr key={index}>
                                {/*text-blue-600":"text-green-600"*/}
                                <td><span className="inline-block"><svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#00a63e"><path d="M216-96q-29.7 0-50.85-21.15Q144-138.3 144-168v-412q-21-8-34.5-26.5T96-648v-144q0-29.7 21.15-50.85Q138.3-864 168-864h624q29.7 0 50.85 21.15Q864-821.7 864-792v144q0 23-13.5 41.5T816-580v411.86Q816-138 794.85-117T744-96H216Zm0-480v408h528v-408H216Zm-48-72h624v-144H168v144Zm216 240h192v-72H384v72Zm96 36Z"/></svg> </span> {master?.Parts && master.Parts[ele].Name}</td>
                                <td>{master?.Parts && master.Parts[ele].Quantity}</td>
                                <td>{scanned.Current && scanned.Current[ele]?.["Current Quantity"]}</td>
                                <td>{scanned.Current && scanned.Current[ele]?.QC && scanned.Current[ele].QC.map((ele)=>`${ele.QC_Name} - ${ele.Quantity} `) }</td>
                            </tr>
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
        
}