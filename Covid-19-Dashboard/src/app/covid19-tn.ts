export interface CasesCovid {
    objectIdFieldName: string;
    uniqueIdField: UniqueIdField;
    globalIdFieldName: string;
    geometryType: string;
    spatialReference: SpatialReference;
    fields: Field[];
    features: Feature[];
}
export interface UniqueIdField {
    name: string;
    isSystemMaintained: boolean;
}

export interface SpatialReference {
    wkid: number;
    latestWkid: number;
}

export interface CodedValue {
    name: string;
    code: string;
}

export interface Domain {
    type: string;
    name: string;
    codedValues: CodedValue[];
}

export interface Field {
    name: string;
    type: string;
    alias: string;
    sqlType: string;
    domain: Domain;
    defaultValue?: any;
    length?: number;
}

export interface Attributes {
    FID: number;
    gouvernora: string;
    CODE_GOUV: number;
    Shape__Area: number;
    Shape__Length: number;
    Nb_quarantaine: number;
    Nb_cas: number;
    Nb_importés?: number;
    Nb_locaux?: number;
    Nb_deces: number;
    Nb_retablis: number;
    Cluster?: any;
    Pop_19: number;
}

export interface Feature {
    attributes: Attributes;
}


