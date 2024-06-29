import fs from "fs-extra";
import ex from "express";
import bp from "body-parser";
import sqlite from "sqlite3";
import knex from "knex";
import { Types } from "./abstruction";

export namespace App {
    export class main {
        public static run() {
            var app: ex.Express = ex()
            app.set("view engine", "ejs")
            app.set("views", "./views")
            app.use(bp.urlencoded({ extended: true }))
            app.use(bp.json())
            app.get("/", (req, res) => {
                res.send("test noor project worked!...");
            })
            app.use("/api", routers)
            app.listen(3000)
        }
    }
    var routers : ex.Router = ex.Router({mergeParams:true})
    routers.get("/page/:num",(req,res)=>{
        Data.getText({pageNo:req.params.num},req.query.m?.toString()).then((x)=>{
            res.json(x)
        })
    })
    routers.get("/search",(req,res)=>{
        Data.search(req.query.s?.toString(),req.query.m?.toString()).then((x)=>{
            res.json(x)
        })
    })
    routers.get("/sura/:s-:a",(req,res)=>{
        Data.getText({'quran_text.sura':req.params.s?.toString()||"1",'quran_text.aya':req.params.a?.toString()||"1"},req.query.m?.toString()).then((x)=>{
            res.json(x)
        })
    })
    routers.get("/joz/:j",(req,res)=>{
        Data.getText({joz:req.params.j?.toString()},req.query.m?.toString()).then((x)=>{
            res.json(x)
        })
    })
    export class Data {
        private static database: string = "./database/quran1.db";
        private static connect(): knex.Knex {
            var db = knex({
                client: "sqlite3",
                connection: {
                    filename: this.database,
                },
                useNullAsDefault: true,
            })
            return db
        }
        public static async search(keyword: any,meaningful:string = "fa_ansarian"): Promise<Types.IAye[]> {
            var c = this.connect();
            var arabic = keyword.replaceAll("ک", "ك").replaceAll("ی", "ي")
            var res: Types.IAye[] = await c("quran_text").where("text_clean","like",`%${arabic}%`).join(meaningful,(j)=>{
                j.on(`${meaningful}.sura`,"=","quran_text.sura").andOn(`${meaningful}.aya`,"=","quran_text.aya")
            })
            return res
        }
        public static async getText(query:Types.IAye,meaningful:string = "fa_ansarian") {
            var c = this.connect()
            var res = await c("quran_text").where(query).join(meaningful,(j)=>{
                j.on(`${meaningful}.sura`,"=","quran_text.sura").andOn(`${meaningful}.aya`,"=","quran_text.aya")
            })
            console.log(res)
            return res
        }
    }
}
