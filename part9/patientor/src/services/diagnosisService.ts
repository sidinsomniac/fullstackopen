import diagnosesData from "../../data/diagnoses.json";
import { Diagnosis, HealthCheckEntry, Patient, SSNMaskedPatientType } from "../types";
import { v1 as uuid } from 'uuid';

const diagnoses: Diagnosis[] = diagnosesData as Diagnosis[];

const getData = (): Diagnosis[] => diagnoses;

const addData = () => null;


const addEntries = (patient: SSNMaskedPatientType, entry: HealthCheckEntry): Patient => {
  const id: string = uuid();
  entry.id = id;
  const updatedPatient: Patient = { ...patient } as Patient;
  updatedPatient.entries.push(entry);
  return updatedPatient;
};

export default {
  getData,
  addData,
  addEntries
};
