import http from "node:http";

const server = http.createServer((request, response) => {
  return response.end("Hello World");
});

//localhost:3333
server.listen(3333);
