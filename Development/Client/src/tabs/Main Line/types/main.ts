
export interface MainSequence{
    "Parts":
        {
            "Sub_Assembly_BOM": {} & {
                "Part_Name": string,
                "ID": string,
                "zc_display_value": string
            },
            "Type_field": "Sub Assembly" | "Part",
            "Quantity": string,
            "ID": string,
            "Sequence": string,
            "Part_Name": {} & {
                "Part_Name": string,
                "ID":string,
                "zc_display_value": string
            },
            "zc_display_value": string
        }[],
    "Bike_Name": {
        "Bike_Name": string,
        "ID": string,
        "zc_display_value": string
    },
    "ID": string,
    "Main_Line_Version": string
}

export interface VIN{
    "Traceability": 
        {
            "Type_field": "Sub Assembly" | "Part",
            "Status": "Completed" | "Pending",
            "QC": {} | {
                "ID": string,
                "QC_ID": string,
                "zc_display_value": string
            },
            "Sub_Assembly_BOM": {} & {
                "Part_Name": string,
                "ID": string,
                "zc_display_value": string
            },
            "Quantity": string,
            "ID": string,
            "Part_Name": {} & {
                "Part_Name": string,
                "ID": string,
                "zc_display_value": string
            },
            "Sub_Assembly_Traceability": {} | {
                "SA_Traceability_ID": string,
                "ID": string,
                "zc_display_value": string
            },
            "zc_display_value":string
        }[],
    "VIN_Number": string,
    "Bike_Name": {
        "Bike_Name": string,
        "ID": string,
        "zc_display_value": string
    },
    "ID": string
}

export interface DataStruct{
    [key:string]:{
        "Part Name":string,
        "Part ID":string,
        "Type_field": "Sub Assembly" | "Part",
        "Quantity": string,
    }
}

export interface MainMasterType{

    "Bike Name":string,
    "Bike ID":string,
    
    "Already":
        {
            "Type_field": "Sub Assembly" | "Part",
            "Status": "Completed",
            "QC": {} | string,
            "Sub_Assembly_BOM": {} | string,
            "Quantity": string,
            "Part_Name": {} | string,
            "Sub_Assembly_Traceability": {} | string,
        }[],

    "Sequence":DataStruct,
        
    "Auxiliary":DataStruct

    
}

export interface MainScannedType{

    [key:string]:
        {
            "Type_field": "Sub Assembly" | "Part",
            "Status": "Completed" | "Pending",
            "QC": {} | string,
            "Sub_Assembly_BOM": {} | string,
            "Quantity": string,
            "Part_Name": {} | string,
            "Sub_Assembly_Traceability": {} | string,
        }
}
