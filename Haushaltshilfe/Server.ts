import * as Http from "http";
//import * as Url from "url";
import * as Mongo from "mongodb";

export namespace Haushaltshilfe {

  //#region Data
  export interface Task {
    articles: Article[] | null;
    bank: Bank[] | null;
    work: Work[] | null;
  }

  export interface Article {
    articleName: string;
    amount: number;
    price: number;
    unitType: Unit[];
    preferredShop: string;
  }

  export interface Unit {
    unitName: string;
    unitFactor: number;
  }

  export interface Bank {
    bankTask: string;
    amount: number;
  }

  export interface Work {
    workTask: string;
    price: number;
    amount: number;
  }
  //#endregion


  /*interface Order {
    [type: string]: string | string[] | undefined;
  }*/

  let tasks: Mongo.Collection;

  let port: number | string | undefined = process.env.PORT;

  if (port == undefined)
    port = 5001;

  let databaseUrl: string = "mongodb://localhost:27017";

  //if (process.argv[2] == "remote")
  databaseUrl = "mongodb+srv://admin:admindb@haushaltshilfe-t8sql.mongodb.net/Haushaltshilfe?retryWrites=true&w=majority";

  startServer(port);
  connectToDataBase(databaseUrl);

  //mongodb+srv://admin:<password>@eia2-t8sql.mongodb.net/test?retryWrites=true&w=majority
  async function connectToDataBase(_url: string): Promise<void> {
    let options: Mongo.MongoClientOptions = { useNewUrlParser: true, useUnifiedTopology: true };
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();

    tasks = mongoClient.db("Haushaltshilfe").collection("Tasks");
    console.log("Database connection ", tasks != undefined);
    console.log("Database connection on " + tasks.collectionName);
  }

  function startServer(_port: number | string): void {
    let server: Http.Server = Http.createServer();
    server.listen(port);
    console.log("listening on :" + port);
    server.addListener("request", handleRequest);
  }

  async function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
    console.log("Here");
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");

    let body: string = "";
    _request.on("data", (data) => {
      body += data;
    });
    _request.on("end", () => {
      storeOrder(JSON.parse(body));
      _response.end();
    });

  }
  function storeOrder(_order: Task): void {
    tasks.insert(_order);
  }
}