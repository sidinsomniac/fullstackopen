import { State } from "./state";
import { Patient } from "../types";

interface SetPatientList {
  type: "SET_PATIENT_LIST";
  payload: Patient[];
}

interface SetVisitedPatient {
  type: "SET_VISITED_PATIENT";
  payload: Patient;
}

interface AddPatient {
  type: "ADD_PATIENT";
  payload: Patient;
}

export type Action = SetPatientList | SetVisitedPatient | AddPatient;

export const setPatientList = (patientList: Patient[]): SetPatientList => ({ type: "SET_PATIENT_LIST", payload: patientList });
export const setVisitedPatient = (patient: Patient): SetVisitedPatient => ({ type: "SET_VISITED_PATIENT", payload: patient });
export const addPatient = (patient: Patient): AddPatient => ({ type: "ADD_PATIENT", payload: patient });

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_VISITED_PATIENT":
      const alreadyAddedPatient = state.visitedPatients[action.payload.id];
      if (alreadyAddedPatient) return state;
      return {
        ...state,
        visitedPatients: {
          ...state.visitedPatients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    default:
      return state;
  }
};
