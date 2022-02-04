import express, { request } from "express";
import { routes } from "./routes";
import YAML from "yamljs";
import swaggerUi from "swagger-ui-express";

const app = express();
app.use(express.json());

const swaggerDocument = YAML.load("src/swagger.yaml");
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(routes);

app.listen(3333, () =>
  console.log("🔥 Server running on http://localhost:3333")
);
