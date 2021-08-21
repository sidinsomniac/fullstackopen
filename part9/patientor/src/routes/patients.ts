/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import express from 'express';
import patientsService from "../services/patientsService";
const router = express.Router();

router.get('/', (_, res) => {
    const patients = patientsService.getMaskedPatients();
    res.json(patients);
});

router.post('/', (req, res) => {
    const { name, dateOfBirth, gender, occupation, ssn } = req.body;
    const newPatient = patientsService.addPatients({ name, dateOfBirth, gender, occupation, ssn });
    res.json(newPatient);
});

export default router;