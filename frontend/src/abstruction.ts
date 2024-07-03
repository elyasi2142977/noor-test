export namespace Types {
    /**
     * interface of rows of database
     * use for queries and database returns
     * Table: quran_text
     */
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
    /**
     * Table: quranJOZ
     */
    export interface IJoz {
        id:string
        joz:string
        pageNoSt:string
    }
    /**
     * Table: quranNameList
     */
    export interface ISura {
        id:string
        sura:string
        page:string
    }
    export enum meaningful  {
        shakir = "en_shakir",
        ansarian = "fa_ansarian",
        fooladvand = "fa_fooladvand",
        ghomshei = "fa_ghomshei",
        makarem = "fa_makarem",
        qaraati = "fa_qaraati"
    } 
}
