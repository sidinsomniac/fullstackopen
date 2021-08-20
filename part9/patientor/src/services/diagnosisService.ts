import diagnosesData from "../../data/diagnoses.json";
import { Diagnoses } from "../types";

const diagnoses: Diagnoses[] = diagnosesData;

const getData = (): Diagnoses[] => diagnoses;

const addData = () => null;

export default {
  getData,
  addData,
};
