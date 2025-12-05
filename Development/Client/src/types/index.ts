
export interface SASequence{
    "Status":"Active" | "Inactive",
    "Parts":
        {
            "Traceability": "Yes" | "No",
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
    [key:string]:{
        "Name":string,
        "Quantity":string,
        "ID":string,
        "Sequence":string
    }
}

export interface MasterType{
    "Sub Assembly Name":string | null,
    "Sub Assembly ID":string | null,
    "Sub Assembly BOM Prefix":string | null,
    "SA_Traceability_Name":string | null,
    "SA_Traceability_ID":string | null,
    "Station":string | null,
    "Main Station":"true" | "false" | null,
    "Parts":parts | null,
    "Main Line":string | null,
    "Red Tag":true | false
    "Already":{ "Name": string,"ID":string,"QC_Name": string,"QC_ID":string,"Quantity":string}[],
}

export interface ScannedType{
    "Current":{ 
        [key:string]:{
            "Name": string,"ID":string,"QC Quantity":string,"QC": {
                [key:string]:{
                    "QC_Name":string,"QC_ID":string,"Quantity":string
                }
            }
        },
    }
    "ID":string
}

export type SATraceability={
    "Parts": {
            "Quantity": string,
            "ID": string,
            "Part_Name": {
                "Part_Name": string,
                "ID": string,
                "zc_display_value": string
            },
            "QC_ID":{
                    "ID": string,
                    "QC_ID": string,
                    "zc_display_value":string
            },
            "zc_display_value":string
    }[],
    "Sub_Assembly_BOM": {
        "Part_Name": string,
        "ID": string,
        "zc_display_value":string
    },
    "ID": string,
    "SA_Traceability_ID":string
}


export type addSAPayload={
    "data": [
        {
            "Sub_Assembly_BOM":string
            "SA_Traceability_ID": string,
            "Parts":{"Part_Name": string,"QC_ID": string,"Quantity":string}[]
        }
    ]
}

export type updateSAPayload={
    "data":[
        {
            "Parts":{"Part_Name": string,"QC_ID": string,"Quantity":string}[]
        }
    ]
}

export type AddRedTagPayload={
    "data":[
        {
            "QC_ID":string,
            "Quantity":number
        }
    ]
}

export type QC={
    "Quantity": string,
    "ID": string,
    "Part_Name": {
    "Part_Name": string,
    "ID": string,
    "zc_display_value": string
    },
    "QC_ID": string 
}

export type addErrorPayload={
    "data":[
        {
            "Form_Link_Name": string,
            "Error": string
        }
    ]
}