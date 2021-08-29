import { patientData, patients } from "../../data/patientData";
import { NewPatientEntry, Patient, SSNMaskedPatientType } from "../types";
import { v1 as uuid } from 'uuid';

const maskedPatients: SSNMaskedPatientType[] = patientData().map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
}));

const getPatients = (): Patient[] => patientData();

const getPatient = (id: string): [Patient | undefined, number] => {
    const foundPatient = patientData().find(patient => patient.id === id);
    const patientIndex = patientData().findIndex(patient => patient.id === id);
    return [foundPatient, patientIndex];
};

const getMaskedPatients = (): SSNMaskedPatientType[] => maskedPatients;

const getMaskedPatient = (id: string): SSNMaskedPatientType | undefined => maskedPatients.find(patient => patient.id === id);

const addPatients = (newPatientEntry: NewPatientEntry): Patient => {
    const id: string = uuid();
    const newPatient: Patient = {
        id,
        ...newPatientEntry,
        entries: []
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