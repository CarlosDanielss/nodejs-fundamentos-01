import { buildRoutePath } from "./helpers/build-route-path.js";

import { CreateUserController } from "./controllers/create-user-controller.js";

const createUserController = new CreateUserController();

export const appRoutes = [
  {
    method: "GET",
    path: buildRoutePath("/"),
    handler: (request, response) => response.writeHead(200).end("Deu certo!"),
  },
  {
    method: "POST",
    path: buildRoutePath("/user"),
    handler: (request, response) =>
      createUserController.handle(request, response),
  },
];
