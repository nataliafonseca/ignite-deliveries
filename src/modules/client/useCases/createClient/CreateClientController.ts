import { Request, Response } from "express";
import { CreateClientUseCase } from "./CreateClientUseCase";

export class CreateClientController {
  async handle(request: Request, response: Response) {
    const createClientUseCase = new CreateClientUseCase();

    const { username, password } = request.body;

    try {
      const client = await createClientUseCase.execute({ username, password });
      return response.status(201).json(client);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
