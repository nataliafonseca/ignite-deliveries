import cors from "cors";
import express, { NextFunction, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import { routes } from "./routes";

const app = express();
app.use(cors({ origin: "*", exposedHeaders: ["X-Total-Count"] }));
app.use(express.json());

const swaggerDocument = YAML.load("src/swagger.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

app.use(
  (err: any, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof Error) {
      return response.status(400).json({ error: err.message });
    }
    return response
      .status(500)
      .json({ error: `Internal server error. - ${err.message}` });
  }
);

app.listen(3333, () =>
  console.log("🔥 Server running on http://localhost:3333")
);
