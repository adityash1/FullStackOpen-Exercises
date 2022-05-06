export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: "male" | "female" | "other";
  occupation: string;
}
export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
