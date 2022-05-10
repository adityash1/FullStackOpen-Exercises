import data from "../../data/patients.json";
import { Patient } from "../types";

import { v4 as uuidv4 } from "uuid";

const patients: Array<Patient> = data as Array<Patient>;

const getPatients = (): Omit<Patient, "ssn">[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: Omit<Patient, "id">): Patient => {
  const id: string = uuidv4();
  const newEntry = { id, ...entry };
  return newEntry;
};

export default {
  getPatients,
  addPatient,
};
