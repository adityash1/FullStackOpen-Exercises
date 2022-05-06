import service from "../services/patientService";

const patientRouter = require("express").Router();

patientRouter.get("/", (_req : any, res : any) => {
  res.send(service.getPatients());
});

export default patientRouter;
