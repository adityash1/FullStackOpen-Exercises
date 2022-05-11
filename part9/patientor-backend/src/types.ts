export enum Gender {
  male = "male",
  female = "female",
  other = "other",
}
export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Entry {}

export interface Patient {
  name: string;
  ssn: string;
  occupation: string;
  dateOfBirth: string;
  gender: Gender;
  entries: Entry[];
  id: string;
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;
