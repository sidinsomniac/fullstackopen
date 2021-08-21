import diagnosesData from "../../data/diagnoses.json";
import { Diagnose } from "../types";

const diagnoses: Diagnose[] = diagnosesData as Diagnose[];

const getData = (): Diagnose[] => diagnoses;

const addData = () => null;

export default {
  getData,
  addData,
};
