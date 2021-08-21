import patientData from "../../data/patients.json";
import { Patient, SSNMaskedPatientType } from "../types";

const patients: Patient[] = patientData as Patient[];

const maskedPatients: SSNMaskedPatientType[] = (<Patient[]>patientData).map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
}));

const getPatients = () => patients;

const getMaskedPatients = (): SSNMaskedPatientType[] => maskedPatients;

export default {
    getPatients,
    getMaskedPatients
};