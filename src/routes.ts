import { Router } from "express";
import { AuthenticateClientController } from "./modules/client/useCases/authenticateClient/AuthenticateClientController";
import { CreateClientController } from "./modules/client/useCases/createClient/CreateClientController";

export const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();

routes.post("/client", createClientController.handle);
routes.post("/client/login", authenticateClientController.handle);
