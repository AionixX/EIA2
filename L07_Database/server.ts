import * as Http from "http";
import * as Url from "url";
import * as Mongo from "mongodb";

export namespace L07_Cocktailbar {
  interface Order {
    [type: string]: string | string[] | undefined;
  }
  let orders: Mongo.Collection;

  let port: number | string | undefined = process.env.port;

  if (port == undefined)
    port = 5001;

  let databaseUrl: string = "mongodb://localhost:27017";

  if (process.argv[2] == "remote")
    databaseUrl = "mongodb+srv://admin:admindb@eia2-t8sql.mongodb.net/test?retryWrites=true&w=majority";

  startServer(port);
  connectToDataBase(databaseUrl);

  //mongodb+srv://admin:<password>@eia2-t8sql.mongodb.net/test?retryWrites=true&w=majority
  async function connectToDataBase(_url: string): Promise<void> {
    let options: Mongo.MongoClientOptions = {useNewUrlParser: true, useUnifiedTopology: true};
    let mongoClient: Mongo.MongoClient = new Mongo.MongoClient(_url, options);
    await mongoClient.connect();

    orders = mongoClient.db("Cocktailbar").collection("Orders");
    console.log("Database connection ", orders != undefined);
  }
  function startServer(_port: number | string): void {
    let server: Http.Server = Http.createServer();
    server.listen(port);
    server.addListener("request", handleRequest);
  }
  function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {
    _response.setHeader("content-type", "text/html; charset=utf-8");
    _response.setHeader("Access-Control-Allow-Origin", "*");

    if (_request.url) {
      console.log(_request.url);
      let url: Url.UrlWithParsedQuery = Url.parse(_request.url, true);
      for (let key in url.query) {
        _response.write(key + ":" + url.query[key] + "<br/>");
      }

      let jsonString: string = JSON.stringify(url.query);
      _response.write(jsonString);

      storeOrder(url.query);
    }

    _response.end();
  }
  function storeOrder(_order: Order): void {
    orders.insert(_order);
  }
}