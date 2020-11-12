"use strict";
var L06_Server;
(function (L06_Server) {
    window.addEventListener("load", handleLoad);
    function handleLoad(_event) {
        let url = "https://jirkadelloro.github.io/EIA2-Inverted/L05_Client/Material/Test.txt";
        console.log("Start");
        communicate(url);
        console.log("End");
    }
    async function communicate(_url) {
        let response = await fetch(_url);
        console.log("Response", response);
        let text = await response.text();
        console.log(text);
    }
})(L06_Server || (L06_Server = {}));
//mongodb+srv://admin:<password>@eia2-s2nov.mongodb.net/test?retryWrites=true&w=majority
//# sourceMappingURL=index.js.map