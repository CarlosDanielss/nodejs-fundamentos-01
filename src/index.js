import http from "node:http";
import { toJson } from "./to-json.js";

const app = http.createServer(async (request, response) => {
  const { method, url } = request;

  await toJson(request, response);

  const routes = [
    {
      method: "GET",
      path: "/",
      handler: (request, response) => response.writeHead(200).end("Deu certo!"),
    },
    {
      method: "POST",
      path: "/products",
      handler: (request, response) => {
        return response.writeHead(200).send({ name: "Daniel" });
      },
    },
  ];

  const route = routes.find((route) => {
    return route.method === method && route.path === url;
  });

  if (route) {
    return route.handler(request, response);
  }

  return response.writeHead(404).end("O caminho não foi encontrado!");
});

app.listen(3333, () => {
  console.log("Server is running!");
});
