import express from "express";
import { getValidFlights } from "../controllers/flightsController";

const flightsRouter = express.Router();

flightsRouter.get("/", getValidFlights)

export default flightsRouter;