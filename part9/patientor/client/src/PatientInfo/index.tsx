import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { HealthCheckEntry, Patient } from "../types";
import { addEntry, setVisitedPatient, useStateValue } from "../state";
import { apiBaseUrl } from "../constants";
import PatientDisplay from "./PatientDisplay";
import AddEntryModal from "../AddEntryModal";
import { Button } from "semantic-ui-react";

function PatientInfo(): JSX.Element {
  const [{ visitedPatients }, dispatch] = useStateValue();
  const [patient, setPatient]: [
    Partial<Patient>,
    React.Dispatch<React.SetStateAction<Patient>>,
  ] = useState({});
  const id = useParams<{ id: string }>().id;

  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  useEffect(() => {
    const patientFromID = visitedPatients[id];
    if (!patientFromID) void fetchPatient();
    else {
      setPatient(patientFromID);
    }
  }, [visitedPatients]);

  const fetchPatient = async () => {
    try {
      const { data: patientFromApi } = await axios.get<Patient>(
        `${apiBaseUrl}/patients/${id}`,
      );
      dispatch(setVisitedPatient(patientFromApi));
      setPatient(patientFromApi);
    } catch (e) {
      console.error(e);
    }
  };

  const submitEntry = async (values: Omit<HealthCheckEntry, "id">) => {
    try {
      const { data: updatedPatient } = await axios.post<Patient>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values,
      );
      dispatch(addEntry(updatedPatient));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data?.error || "Unknown error");
    }
  };

  return (
    <div>
      {patient.name ? (
        <>
          <PatientDisplay patient={patient} />
          <AddEntryModal
            modalOpen={modalOpen}
            onSubmit={submitEntry}
            error={error}
            onClose={closeModal}
          />
          <Button onClick={() => openModal()}>Add New Entry</Button>
        </>
      ) : (
        <p>Sorry no patients found</p>
      )}
    </div>
  );
}

export default PatientInfo;
