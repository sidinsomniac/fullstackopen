import { patientData as patients } from "../../data/patientData";
import { NewPatientEntry, Patient, SSNMaskedPatientType } from "../types";
import { v1 as uuid } from 'uuid';

const maskedPatients: SSNMaskedPatientType[] = patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
}));

const getPatients = (): Patient[] => patients;

const getPatient = (id: string): Patient | undefined => patients.find(patient => patient.id === id);

const getMaskedPatients = (): SSNMaskedPatientType[] => maskedPatients;

const getMaskedPatient = (id: string): SSNMaskedPatientType | undefined => maskedPatients.find(patient => patient.id === id);

const addPatients = (newPatientEntry: NewPatientEntry): Patient => {
    const id: string = uuid();
    const newPatient: Patient = {
        id,
        ...newPatientEntry
    };
    patients.push(newPatient);
    return newPatient;
};

export default {
    getPatients,
    getPatient,
    getMaskedPatients,
    getMaskedPatient,
    addPatients
};