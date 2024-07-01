export namespace Types {
    /**
     * interface of rows of database
     * use for queries and database returns
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
    export enum meaningful  {
        shakir = "en_shakir",
        ansarian = "fa_ansarian",
        fooladvand = "fa_fooladvand",
        ghomshei = "fa_ghomshei",
        makarem = "fa_makarem",
        qaraati = "fa_qaraati"
    } 
}
