
export type VIN= {
    "Traceability":{
            "Type_field": "Sub Assembly" | "Part",
            "QC":{
                    "ID": string,
                    "QC_ID": string,
                    "zc_display_value": string
            }[],
            "Part"?: {
                "Part_Name": string,
                "ID": string,
                "zc_display_value": string
            },
            "Sub_Assembly_BOM": {
                "Part_Name": string,
                "ID": string,
                "zc_display_value": string
            },
            "ID": string,
            "Sub_Assembly_Traceability": {
                "SA_Traceability_ID": string,
                "ID": string,
                "zc_display_value": string
            },
            "zc_display_value": string
    }[],
    "VIN_Number": string,
    "Bike_Name": {
        "Bike_Name": string,
        "ID": string,
        "zc_display_value": string
    },
    "ID": string
}