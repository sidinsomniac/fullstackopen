import express from 'express';
import patientsService from "../services/patientsService";
const router = express.Router();

router.get('/', (_, res) => {
    const patients = patientsService.getMaskedPatients();
    res.json(patients);
});

router.post('/', (_, __) => null);

export default router;