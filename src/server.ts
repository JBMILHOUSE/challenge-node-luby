import "reflect-metadata";
import express from "express";

import "./container";
import "./database";

import { router } from "./routes";

const app = express();

/**
 * GET => Buscar
 * POST => Salvar
 * PUT => Alterar
 * DELETE => Deletar
 * PATCH => Alteração especifica
 */
app.use(express.json());
app.use(router);

app.listen(3333, () => console.log("Server is running"));