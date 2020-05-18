"use strict";
var L05_Client;
(function (L05_Client) {
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
})(L05_Client || (L05_Client = {}));
//# sourceMappingURL=index.js.map