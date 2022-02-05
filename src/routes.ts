import { Router } from "express";
import { AuthenticateClientController } from "./modules/client/useCases/authenticateClient/AuthenticateClientController";
import { CreateClientController } from "./modules/client/useCases/createClient/CreateClientController";
import { AuthenticateDeliverymanController } from "./modules/deliveryman/useCases/authenticateDeliveryman/AuthenticateDeliverymanController";
import { CreateDeliverymanController } from "./modules/deliveryman/useCases/createDeliveryman/CreateDeliverymanController";

export const routes = Router();

const createClientController = new CreateClientController();
const authenticateClientController = new AuthenticateClientController();
const createDeliverymanController = new CreateDeliverymanController();
const authenticateDeliverymanController =
  new AuthenticateDeliverymanController();

routes.post("/client", createClientController.handle);
routes.post("/client/login", authenticateClientController.handle);
routes.post("/deliveryman", createDeliverymanController.handle);
routes.post("/deliveryman/login", authenticateDeliverymanController.handle);
