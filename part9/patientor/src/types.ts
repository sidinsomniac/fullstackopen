export type Gender = "male" | "female";

export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type SSNMaskedPatientType = Omit<Patient, 'ssn'>;

export type NewPatientEntry = Omit<Patient, 'id'>;