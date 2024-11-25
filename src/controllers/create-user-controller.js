import { UserSchema } from "../schemas/user-schema.js";

export class CreateUserController {
  async handle(request, response) {
    try {
      const data = request.body;

      const fields = ["name", "email", "password"];

      for (const field of fields) {
        if (data[field] === undefined || data[field] === "") {
          return response
            .writeHead(400)
            .end("Alguns campos necessário não foram providos.");
        }
      }

      const validatedData = fields.map((field) => {
        const check = UserSchema[field](data[field]);

        return check;
      });

      const filterInvalidFields = validatedData.filter(
        (field) => field.isValid === false
      );

      if (filterInvalidFields.length !== 0) {
        return response
          .writeHead(400)
          .end(`O(s) campo(s) ${filterInvalidFields[0]} são inválido(s)!`);
      }

      console.log("resultado", filterInvalidFields);
    } catch (error) {
      console.error(error);
      return response.writeHead(500).end("Erro interno do servidor.");
    }
  }
}
