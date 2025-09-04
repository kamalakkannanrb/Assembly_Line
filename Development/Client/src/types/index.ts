
export interface SASequence{
    "Status":"Active" | "Inactive",
    "Parts":
        [{
            "Traceability": "Yes" | "No",
            "Type_field": "Bin Part" | "Individual Part",
            "Traceability_Prefix": String,
            "Sequence_Required": "Yes" | "No",
            "Station_Number": String,
            "Quantity": String,
            "Sequence_Number": String,
            "ID": String,
            "Part_Name": 
            {
                "Part_Name": String,
                "ID": String,
                "zc_display_value": String,
                "Part_Number": String
            }
        }],
    "zc_display_value": String,
    "Sub_Assembly_BOM":
    {
        "Part_Name": String,
        "ID": String,
        "zc_display_value": String
    },
    "ID":string
}