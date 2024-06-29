export namespace Types {
    export interface IAye {
        index?:string
        joz?:string
        pageNo?:string
        sura?:string
        aya?:string
        text?:string
        text_clean?:string
        [k:string]:string|undefined
    }
    export interface IMean {
        index:string
        sura:string
        aya:string
        text:string
    }
    export type TQuery = {
        mean?:string
        query?:{
            index?:string
            joz?:string
            pageNo?:string
            sura?:string
            aya?:string
            find?:string  
        }
    }
}
