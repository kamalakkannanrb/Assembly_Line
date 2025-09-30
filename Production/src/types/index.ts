
export interface SASequence{
    "Status":"Active" | "Inactive",
    "Parts":
        {
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
            "zc_display_value": string,
            "Main_Station": "false" | "true"
        }[]
    ,
    "Sub_Assembly_BOM":
    {
        "Part_Name": string,
        "ID": string,
        "zc_display_value": string
    },
    "ID":string
    "Sub_Assembly_BOM_Prefix":string
}

export interface Bin{
    "Parts": [
        {
          "Part_Master": {
            "Part_Name": string,
            "ID": string,
            "zc_display_value": string
            },
          "ID": string,
          "QC_ID":string,
          "zc_display_value": string
        }
    ],
    "Bin": {
    "Bin_ID": string,
    "ID": string,
    "zc_display_value": string
    },
    "BIN_ID": string,
    "ID": string
}


export type parts={
    "Name":string,
    "ID":string,
    "Prefix":string | null,
    "Sequence":string,
    "Type":"in" | "bin"
    "QC":string 
}

export interface ContextItems{
    "Sub Assembly Name":string,
    "Sub Assembly ID":string,
    "Sub Assembly BOM Prefix":string,
    "Station":string,
    "Main Station":"true" | "false",
    "Parts":parts[],
}

export interface ContextCurrentItems{
    "Already":{ "Name": string,"ID":string,"QC": string}[],
    "Current":{ "Name": string,"ID":string,"QC": string}[],
    "Pointer":number,
    "ID":string
}

export type SATraceability={
    "Parts":{
        "ID": string,
        "Part_Name": {
            "Part_Name": string,
            "ID": string,
            "zc_display_value": string
        },
        "QC_ID": string,
        "zc_display_value": string
    }[],
    "ID": string,
    "SA_Traceability_ID": string
}

export type addSAPayload={
    "data": [
        {
            "SA_Traceability_ID": string,
            "Parts":{"Part_Name": string,"QC_ID": string}[]
        }
    ]
}

export type updateSAPayload={
    "data":[
        {
            "Parts":{"Part_Name": string,"QC_ID": string}[]
        }
    ]
}