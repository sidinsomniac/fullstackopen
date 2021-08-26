import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Patient } from "../types";
import { useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import axios from "axios";
import PatientDisplay from "./PatientDisplay";

function PatientInfo(): JSX.Element {
  const [{ visitedPatients }, dispatch] = useStateValue();
  const [patient, setPatient]: [
    Partial<Patient>,
    React.Dispatch<React.SetStateAction<Patient>>,
  ] = useState({});
  const id = useParams<{ id: string }>().id;

  useEffect(() => {
    const patientFromID = visitedPatients[id];
    if (!patientFromID) void fetchPatient();
    else {
      setPatient(patientFromID);
    }
  }, []);

  const fetchPatient = async () => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`,
      );
      dispatch({ type: "SET_VISITED_PATIENT", payload: patientFromApi });
      setPatient(patientFromApi);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      {patient.name ? (
        <PatientDisplay patient={patient} />
      ) : (
        <p>Sorry no patients found</p>
      )}
    </div>
  );
}

export default PatientInfo;
