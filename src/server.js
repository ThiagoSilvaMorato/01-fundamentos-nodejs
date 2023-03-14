import http from "node:http";

// Principais métodos HTTP - GET / POST / PUT / PATCH / DELETE

// GET => Buscar um recurso no back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso no back-end

const users = [];

const server = http.createServer((request, response) => {
  const { method, url } = request;

  if (method === "GET" && url === "/users") {
    return response.setHeader("Content-type", "application/json").end(JSON.stringify(users));
  }

  if (method === "POST" && url === "/users") {
    users.push({
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
    });

    return response.writeHead(201).end();
  }

  return response.writeHead(404).end();
});

//localhost:3333
server.listen(3333);
