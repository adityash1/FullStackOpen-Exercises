import service from "../services/diagnoseService";

const diagnoseRouter = require("express").Router();

diagnoseRouter.get("/", (_req : any, res : any) => {
  res.send(service.getDiagnoses());
});

export default diagnoseRouter;
