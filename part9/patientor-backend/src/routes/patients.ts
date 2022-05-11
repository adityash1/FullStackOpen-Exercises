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

patientRouter.get("/:id", (req: any, res: any) => {
  const patient = service.findById(req.params.id);
  if (patient) {
    res.json(patient);
  } else {
    res.status(404).send("Patient not found");
  }
});

export default patientRouter;
