import http from "node:http";

import { toJson } from "./middlewares/to-json.js";
import { extractQueryParams } from "./helpers/extract-query-params.js";
import { appRoutes } from "./routes.js";

const app = http.createServer(async (request, response) => {
  const { method, url } = request;

  await toJson(request, response);

  const route = appRoutes.find((route) => {
    return route.method === method && route.path.test(url);
  });

  if (route) {
    const routeParams = request.url.match(route.path);
    const { query, ...params } = routeParams.groups;

    request.params = params;
    request.query = query ? extractQueryParams(routeParams.groups.query) : {};

    return route.handler(request, response);
  }

  return response.writeHead(404).end("O caminho não foi encontrado!");
});

app.listen(3333, () => {
  console.log("Server is running!");
});
