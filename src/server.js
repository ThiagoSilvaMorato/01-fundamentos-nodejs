import http from "node:http";
import { json } from "./middlewares/json.js";
import { routes } from "./routes.js";
import { extratQueryParams } from "./utils/extract-query-params.js";

// Principais métodos HTTP - GET / POST / PUT / PATCH / DELETE

// GET => Buscar um recurso no back-end
// POST => Criar um recurso no back-end
// PUT => Atualizar um recurso no back-end
// PATCH => Atualizar uma informação específica de um recurso no back-end
// DELETE => Deletar um recurso no back-end

// 1- Query Parameters: URL Stateful -> Filtros, paginação... não-obrigatórios
// 2- Route Parameters: Identificação de recurso
// 3- Request Body: Envio de informações de um formulário (HTTPs)

// 1- http://localhost:3333/users?userId=1&name=Thiago
// 2- GET http://localhost:3333/users/1 (GET by Id por exemplo)
// 2- DELETE http://localhost:3333/users/1
// 3- POST http://localhost:3333/users

const server = http.createServer(async (req, res) => {
  const { method, url } = req;

  await json(req, res);

  const route = routes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = req.url.match(route.path);

    // console.log(extratQueryParams(routeParams.groups.query));

    const { query, ...params } = routeParams.groups;

    req.params = params;
    req.query = query ? extratQueryParams(query) : {};

    return route.handler(req, res);
  }

  return res.writeHead(404).end();
});

//localhost:3333
server.listen(3333);
