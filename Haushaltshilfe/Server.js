"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
//import * as Url from "url";
const Mongo = require("mongodb");
var Haushaltshilfe;
(function (Haushaltshilfe) {
    //#endregion
    /*interface Order {
      [type: string]: string | string[] | undefined;
    }*/
    let tasks;
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    let databaseUrl = "mongodb://localhost:27017";
    //if (process.argv[2] == "remote")
    databaseUrl = "mongodb+srv://admin:admindb@haushaltshilfe-t8sql.mongodb.net/Haushaltshilfe?retryWrites=true&w=majority";
    startServer(port);
    connectToDataBase(databaseUrl);
    //mongodb+srv://admin:<password>@eia2-t8sql.mongodb.net/test?retryWrites=true&w=majority
    async function connectToDataBase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        tasks = mongoClient.db("Haushaltshilfe").collection("Tasks");
        console.log("Database connection ", tasks != undefined);
        console.log("Database connection on " + tasks.collectionName);
    }
    function startServer(_port) {
        let server = Http.createServer();
        server.listen(port);
        console.log("listening on :" + port);
        server.addListener("request", handleRequest);
    }
    async function handleRequest(_request, _response) {
        console.log("Here");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        let body = "";
        _request.on("data", (data) => {
            body += data;
        });
        _request.on("end", () => {
            storeOrder(JSON.parse(body));
            _response.end();
        });
    }
    function storeOrder(_order) {
        tasks.insert(_order);
    }
})(Haushaltshilfe = exports.Haushaltshilfe || (exports.Haushaltshilfe = {}));
//# sourceMappingURL=Server.js.map