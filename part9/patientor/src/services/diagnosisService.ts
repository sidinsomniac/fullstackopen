import diagnosesData from "../../data/diagnoses.json";
import { Diagnosis } from "../types";

const diagnoses: Diagnosis[] = diagnosesData as Diagnosis[];

const getData = (): Diagnosis[] => diagnoses;

const addData = () => null;

export default {
  getData,
  addData,
};
