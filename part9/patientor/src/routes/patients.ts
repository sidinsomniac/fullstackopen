import express from 'express';
import patientsService from "../services/patientsService";
import toNewPatientEntry from "../services/utils";
const router = express.Router();

router.get('/', (_, res) => {
    const patients = patientsService.getMaskedPatients();
    res.json(patients);
});

router.post('/', (req, res) => {
    try {
        const newPatient = toNewPatientEntry(req.body);
        const addedPatient = patientsService.addPatients(newPatient);
        res.json(addedPatient);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

export default router;