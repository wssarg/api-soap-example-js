const soap = require("soap");
const http = require("http");
const xml = require("fs").readFileSync("myservice.wsdl", "utf8");

const service = {
    MyService: {
        MyPort: {
            add: function (args, callback) {

                const valor_a = args.a.$value;
                const valor_b = args.b.$value;

                const result = parseInt(valor_a) + parseInt(valor_b);

                const response = {
                    result: {
                        $attibutes: { "xsd:type": "xsd:int" },
                        $value: result,
                    }
                };
                callback(response);
            },
        },
    },
};

// crea un servidor http para escuchar las solicitudes SOAP
const server = http.createServer(
    function (request, response) {
        response.end("404: Not Found: " + request.url)
    }
);

// escuche en el puerto 8000
server.listen(8000);

// crear un servidor SOAP y vincularlo al servidor http
const soapServer = soap.listen(server, "/wsdl", service, xml);