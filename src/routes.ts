import { Router } from "express";
import { CreateClientController } from "./modules/client/useCases/createClient/CreateClientController";

export const routes = Router();

const createClientController = new CreateClientController();

routes.post("/client", createClientController.handle);