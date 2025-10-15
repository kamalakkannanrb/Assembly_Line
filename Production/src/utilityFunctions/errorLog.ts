
//Types
import { addErrorPayload } from "../types";

//API
import { addError } from "../api/addRecords";

export function logError(error:string, form:string="Assembly line dashboard"){
    const data:addErrorPayload={
        "data":[
            {
                "Form_Link_Name":form,
                "Error":error
            }
        ]
    }
    addError(data)
}