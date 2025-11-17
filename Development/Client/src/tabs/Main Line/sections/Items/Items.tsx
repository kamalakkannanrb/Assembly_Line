
import { useContext } from "react";
import { Loader } from "../../../../sections/UtitliyComponents/Loader";

//Context 
import { MainMasterContext } from "../../context/mainContext";

export function Items(){
    const mainMaster=useContext(MainMasterContext);
    if(mainMaster=="Loading")return <Loader/>
    return(
        // <Suspense fallback={<h1>Loading...</h1>}>
        <div className="w-9/10 px-10">
            
            <table className="w-full bg-white">
                <thead>
                    <tr>
                        <th>Type</th>
                        <th>Name</th>
                        <th>Required</th>
                        <th>Current</th>
                        <th>QC/Sub</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.values(mainMaster.Parts).map((ele)=>{
                        return(
                            <tr>
                                <td>{ele.Type_field}</td>
                                <td>{ele.Name}</td>
                                <td>{ele.Required_Quantity}</td>
                                <td>{ele.Quantity}</td>
                                <td>{ele.Type_field=="Sub Assembly"?ele.Sub_Assembly_Traceability:Object.values(ele.QC).map((ele)=>`${ele?.QC_ID} - ${ele?.Quantity}`)}</td>
                                <td>{ele.Status}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        // </Suspense>
    )
}