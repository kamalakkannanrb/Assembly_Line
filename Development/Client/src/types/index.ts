
export interface SASequence{
    "Status":"Active" | "Inactive",
    "Parts":
        [{
            "Traceability": "Yes" | "No",
            "Type_field": "Bin Part" | "Individual Part",
            "Traceability_Prefix": string,
            "Sequence_Required": "Yes" | "No",
            "Station_Number": string,
            "Quantity": string,
            "Sequence_Number": string,
            "ID": string,
            "Part_Name": 
            {
                "Part_Name": string,
                "ID": string,
                "zc_display_value": string,
                "Part_Number": string
            }
        }],
    "zc_display_value": string,
    "Sub_Assembly_BOM":
    {
        "Part_Name": string,
        "ID": string,
        "zc_display_value": string
    },
    "ID":string
    "Sub_Assembly_BOM_Prefix":string
}

export interface ContextItems{
    "Sub Assembly Name":string,
    "Sub Assembly ID":string,
    "Sub Assembly BOM Prefix":string,
    "Station":string,
    "Individual Parts":Array<string[]>,
    "Bin Parts":string[]
}