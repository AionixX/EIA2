"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var L07_Cocktailbar;
(function (L07_Cocktailbar) {
    let orders;
    let port = process.env.port;
    if (port == undefined)
        port = 5001;
    let databaseUrl = "mongodb://localhost:27017";
    /*if (process.argv[2] == "remote")*/
    databaseUrl = "mongodb+srv://admin:admindb@eia2-t8sql.mongodb.net/test?retryWrites=true&w=majority";
    startServer(port);
    connectToDataBase(databaseUrl);
    //mongodb+srv://admin:<password>@eia2-t8sql.mongodb.net/test?retryWrites=true&w=majority
    async function connectToDataBase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        orders = mongoClient.db("Cocktailbar").collection("Orders");
        console.log("Database connection ", orders != undefined);
    }
    function startServer(_port) {
        let server = Http.createServer();
        server.listen(port);
        server.addListener("request", handleRequest);
    }
    function handleRequest(_request, _response) {
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        console.log("Here");
        if (_request.url) {
            console.log(_request.url);
            let url = Url.parse(_request.url, true);
            for (let key in url.query) {
                _response.write(key + ":" + url.query[key] + "<br/>");
            }
            let jsonString = JSON.stringify(url.query);
            _response.write(jsonString);
            storeOrder(url.query);
        }
        _response.end();
    }
    function storeOrder(_order) {
        orders.insert(_order);
    }
})(L07_Cocktailbar = exports.L07_Cocktailbar || (exports.L07_Cocktailbar = {}));
//# sourceMappingURL=server.js.map