import express, { request } from "express";

const app = express();
app.use(express.json());

app.get("/", (request, response) => {
  return response.json({ message: "Ignite Deliveries" });
});

app.listen(3333, () =>
  console.log("🔥 Server running on http://localhost:3333")
);
