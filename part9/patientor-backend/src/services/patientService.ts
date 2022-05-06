import data from "../../data/patients.json";
import { Patient } from '../types';

const patients: Array<Patient> = data as Array<Patient>;

const getPatients = (): Omit<Patient, 'ssn'>[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

export default {
  getPatients
};