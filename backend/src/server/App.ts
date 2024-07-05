import ex from "express";
import bp from "body-parser";
import cors from "cors" // fix cors error
import sqlite from "sqlite3"; // SQLite3 driver
import knex, { QueryBuilder } from "knex"; // ORM module
import { Types } from "./abstraction"; // reference to types

/**
 * noor test project (Quran navigator)
 * for military order
 * @author Hamidreza Elyasi
 * @github https://github.com/elyasi2142977
 * @supervisor Alireza Nematollahi 
 * @company noorsoft
 * @see https://www.noorsoft.org/
 */

/**
 * 
 * all execute code encapsulate in App
 * @namespace App
 * 
 */
export namespace App {
    /**
     * base class of App
     * @class main
     */
    export class main {
        /**
         * run App from here!
         * @function run()
         */
        public static run() {
            var app: ex.Express = ex()
            app.set("view engine", "ejs")
            app.set("views", "./views")
            app.use(bp.urlencoded({ extended: true }))
            app.use(bp.json())
            app.use(cors())
            app.get("/", (req, res) => {
                res.send("test noor project worked!...");
            })
            app.use("/api", routers)
            app.listen(3000)
        }
    }
    /**
     * routes of App API
     * @var routers
     */
    var routers : ex.Router = ex.Router({mergeParams:true})
    /**
     * query by page number of quran
     * GET /api/page/{pagenumber} -> Array of Types.IAye[]
     * @param num page number [required!]
     * @returns {Types.IAye[]}
     */
    routers.get("/page/:num",(req:ex.Request,res:ex.Response)=>{
        Data.getText({pageNo:req.params.num},req.query.m?.toString()).then((x)=>{
            if (x.length === 0) {
                console.log(x)
                res.status(404).json([{text:"صفحه مورد نظر وجود ندارد!..."}])
                return 0
            }
            console.log(x)
            res.json(x)
        })
    })
    /**
     * query by search keyword in quran
     * GET /api/search?s={keyword} -> Array of Types.IAye[]
     * @param s keyword to search [required!]
     * @returns {Types.IAye[]}
     */
    routers.get("/search",(req:ex.Request,res:ex.Response)=>{
        if (!req.query.s) {
            res.status(404).send("keyword not found!")
            return 0
        }
        Data.search(req.query.s?.toString(),req.query.m?.toString()).then((x)=>{
            if (x.length === 0) {
                console.log(x)
                res.status(404).json([{text:"موردی در متن قرآن یافت نشد!..."}])
                return 0
            }
            console.log(x)
            res.json(x)
        })
    })
    /**
     * query by sura and aya ids
     * if any parameter is lost, returned sura = 1,aya = 1
     * GET /api/sura?s={suraID}&a={ayaID} -> Array of Types.IAye[]
     * @param s ID of sura
     * @param a ID of aya
     * @returns {Types.IAye[]}
     */
    routers.get("/sura",(req:ex.Request,res:ex.Response)=>{
        var query = (req.query.a != "0") 
        ? {'quran_text.sura':req.query.s?.toString()||"1",'quran_text.aya':req.query.a?.toString()} 
        : {'quran_text.sura':req.query.s?.toString()||"1"}
        Data.getText(query,req.query.m?.toString()).then((x)=>{
            if (x.length === 0) {
                console.log(x)
                res.status(404).json([{text:"آیات مورد نظر یافت نشد!..."}])
                return 0
            }
            console.log(x)
            res.json(x)
        })
    })
    /**
     * query by joz ID between 1 to 30
     * if any parameter is lost, returned 404
     * GET /api/joz/{jozID} -> Array of Types.IAye[]
     * @param j ID of joz [required!]
     * @returns {Types.IAye[]}
     */
    routers.get("/joz/:j",(req:ex.Request,res:ex.Response)=>{
        Data.getText({joz:req.params.j?.toString()},req.query.m?.toString()).then((x)=>{
            if (x.length === 0) {
                console.log(x)
                res.status(404).json([{err:"array empty"}])
                return 0
            }
            console.log(x)
            res.json(x)
        })
    })
    /**
     * API for list of joz 
     * @returns {Types.IJoz[]}
     */
    routers.get("/jozlist",(req:ex.Request,res:ex.Response)=>{
        Data.getJoz().then((x)=>{
            res.json(x)
        })
    })
    /**
     * API for list of sura 
     * @returns {Types.ISura[]}
     */
    routers.get("/suralist",(req:ex.Request,res:ex.Response)=>{
        Data.getSura().then((x)=>{
            res.json(x)
        })
    })
    /**
     * API for list of translates 
     * @returns {Types.ITrans[]}
     */
    routers.get("/translist",(req:ex.Request,res:ex.Response)=>{
        Data.getMeaningfuls().then((x)=>{
            res.json(x)
        })
    })
    /**
     * class for databese control
     * connection,queries,datatype...
     * @database SQLite3
     * @module knex (query Builder)
     */
    export class Data {
        /**
         * connect to DBase in ./database/quran1.db
         * @method connect()
         * @returns {knex.Knex}
         */
        private static connect(): knex.Knex {
            var database : string = "./database/quran1.db";
            var db = knex({
                client: "sqlite3",
                connection: {
                    filename: database,
                },
                useNullAsDefault: true,
            })
            return db
        }
        /**
         * search in quran text in database
         * @param keyword word for search
         * @param meaningful who is meaningful?
         * @returns {Promise<Types.IAye[]>}
         */
        public static async search(keyword: any,meaningful:string = "fa_ansarian"): Promise<Types.IAye[]> {
            var c : knex.Knex = this.connect();
            var arabic = keyword.replaceAll("ک", "ك").replaceAll("ی", "ي")
            var query : knex.Knex.QueryBuilder = c("quran_text").where("text_clean","like",`%${arabic}%`)
            var res: Types.IAye[] = await this.getMeaning(meaningful,query)
            return res
        }
        /**
         * get quran text by query of sura , joz , page or aya IDs
         * @param query query of quran by IAya interface
         * @param meaningful who is meaningful?
         * @returns {Promise<Types.IAye[]>}
         */
        public static async getText(query:Types.IAye,meaningful:string = "fa_ansarian"): Promise<Types.IAye[]> {
            var c : knex.Knex = this.connect()
            var text : knex.Knex.QueryBuilder = c("quran_text").where(query)
            var res: Types.IAye[] = await this.getMeaning(meaningful,text)
            return res
        }
        /**
         * data middleware for add meaning to responses
         * @param meaningful who is make sense?
         * @param query the query is created in other methods by Knex.QueryBuilder
         * @returns {Promise<Types.IAye[]>}
         */
        private static async getMeaning(meaningful:string,query:knex.Knex.QueryBuilder) : Promise<Types.IAye[]> {
            var res : Types.IAye[] = await query.join(meaningful,(j:any)=>{
                j.on(`${meaningful}.sura`,"=","quran_text.sura").andOn(`${meaningful}.aya`,"=","quran_text.aya")
            }).join("quranNameList",(j)=>{
                j.on("quran_text.sura","=","quranNameList.id")
            })
            return res
        }
        /**
         * method of joz list in database
         * @returns {Promise<Types.IJoz[]>}
         */
        public static async getJoz() : Promise<Types.IJoz[]> {
            var c : knex.Knex = this.connect()
            var res : Types.IJoz[] = await c("quranJOZ")
            return res
        }
        /**
         * method of sura list in database
         * @returns {Promise<Types.ISura[]>}
         */
        public static async getSura() : Promise<Types.ISura[]> {
            var c : knex.Knex = this.connect()
            var res : Types.ISura[] = await c("quranNameList")
            return res
        }
        /**
         * method of meaningful list in database
         * @returns {Promise<Types.ITrans[]>}
         */
        public static async getMeaningfuls() : Promise<Types.ITrans[]> {
            var c : knex.Knex = this.connect()
            var res : Types.ITrans[] = await c("tbl_trans")
            return res
        }
        /**
         * method to validity meaningful
         * @param name name of meaningful
         * @returns {Types.meaningful}
         */
        public static meaningful(name:string = "ansarian") : Types.meaningful {
            switch (name) {
                case "shakir":
                    return Types.meaningful.shakir
                break
                case "ansarian":
                    return Types.meaningful.ansarian
                break
                case "fooladvand":
                    return Types.meaningful.fooladvand
                break
                case "ghomshei":
                    return Types.meaningful.ghomshei
                break
                case "makarem":
                    return Types.meaningful.makarem
                break
                case "qaraati":
                    return Types.meaningful.qaraati
                break
                default:
                    return Types.meaningful.ansarian
                break
            }
        }
    }
}
