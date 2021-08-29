import express from 'express';
import { patients } from "../../data/patientData";
import patientsService from "../services/patientsService";
import diagnosisService from "../services/diagnosisService";
import patientService from "../services/utils";
import { HealthCheckEntry } from "../types";
// import { HealthCheckEntry } from "../types";
const router = express.Router();

router.get('/', (_, res) => {
    const patients = patientsService.getMaskedPatients();
    res.json(patients);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    try {
        const [patient,] = patientsService.getPatient(id);
        res.json(patient);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post('/', (req, res) => {
    try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const newPatient = req.body;
        newPatient.entries = [];
        const parsedPatient = patientService.toNewPatientEntry(newPatient);
        const addedPatient = patientsService.addPatients(parsedPatient);
        res.json(addedPatient);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

router.post('/:id/entries', (req, res) => {
    const { id } = req.params;
    try {
        const [patient, idx] = patientsService.getPatient(id);
        if (patient) {
            const newEntry = patientService.toNewEntry(req.body) as HealthCheckEntry;
            const addedPatient = diagnosisService.addEntries(patient, newEntry);
            patients[idx] = addedPatient;
            res.status(200).json(addedPatient);
        } else {
            res.status(400).send("Patient not found");
        }
        // res.json(addedPatient);
    } catch (err) {
        res.status(400).send(err.message);
    }
});


export default router;