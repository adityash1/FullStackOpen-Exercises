import data from "../../data/patients.json";
import { PublicPatient, Patient } from "../types";

import { v4 as uuidv4 } from "uuid";

const patients: Array<Patient> = data as Array<Patient>;

const getPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const addPatient = (entry: Omit<PublicPatient, "id">): PublicPatient => {
  const id: string = uuidv4();
  const newEntry = { id, ...entry };
  return newEntry;
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  if (patient) {
    return {
      ...patient,
      entries: [],
    };
  }
  return undefined;
};

export default {
  getPatients,
  addPatient,
  findById,
};
