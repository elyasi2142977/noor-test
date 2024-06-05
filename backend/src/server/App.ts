import fs from "fs-extra"
import ex from "express"

export namespace App {
    export class main {
        /**
         * name
         */
        public static run() {
            var app : ex.Express = ex()
            app.get("/",(req,res)=>{
                res.send("test worked!...")
            })
            app.listen(3000)
        }
    }
}
