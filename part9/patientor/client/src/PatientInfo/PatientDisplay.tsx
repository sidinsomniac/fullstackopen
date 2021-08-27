import React from "react";
import { Icon, Header, Container } from "semantic-ui-react";
import { Patient } from "../types";
import Entries from "./Entries";

function PatientDisplay({
  patient,
}: {
  patient: Partial<Patient>;
}): JSX.Element {
  return (
    <div>
      <Container>
        <Header as="h1">
          {patient.name}
          <Icon name={patient.gender === "male" ? "man" : "woman"} />
        </Header>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
        <Entries entries={patient.entries} />
      </Container>
    </div>
  );
}

export default PatientDisplay;
