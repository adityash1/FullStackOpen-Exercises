import service from "../services/patientService";

const patientRouter = require("express").Router();

patientRouter.get("/", (_req : any, res : any) => {
  res.send(service.getPatients());
});

patientRouter.post('/', (req: any, res: any) => {
  const { name, dateOfBirth, ssn, gender, occupation } = req.body;
  const newEntry = service.addPatient(
    name, dateOfBirth, ssn, gender, occupation
  );

  res.json(newEntry);
});

export default patientRouter;
