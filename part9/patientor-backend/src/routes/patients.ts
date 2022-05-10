import service from "../services/patientService";
import { toNewPatientEntry } from "../utils";

const patientRouter = require("express").Router();

patientRouter.get("/", (_req: any, res: any) => {
  res.send(service.getPatients());
});

patientRouter.post("/", (req: any, res: any) => {
  const newPatientEntry = toNewPatientEntry(req.body);
  const newEntry = service.addPatient(newPatientEntry);
  res.json(newEntry);
});

export default patientRouter;
