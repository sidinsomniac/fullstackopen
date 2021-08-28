import React from "react";
import { useStateValue } from "../state";
import { Entry } from "../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

function Entries({ entries }: { entries: Entry[] | undefined }): JSX.Element {
  const [{ diagnoses }] = useStateValue();

  const assertNever = (value: never): never => {
    throw new Error(`Unhandled entry: ${JSON.stringify(value)}`);
  };

  return !entries?.length ? (
    <div>No entries</div>
  ) : (
    <div>
      <h3 className="ui header">entries</h3>
      {entries.map(entry => {
        switch (entry.type) {
          case "HealthCheck":
            return (
              <HealthCheckEntry
                key={entry.id}
                entry={entry}
                diagnoses={diagnoses}
              />
            );
          case "Hospital":
            return (
              <HospitalEntry
                key={entry.id}
                entry={entry}
                diagnoses={diagnoses}
              />
            );
          case "OccupationalHealthcare":
            return (
              <OccupationalHealthcareEntry
                key={entry.id}
                entry={entry}
                diagnoses={diagnoses}
              />
            );
          default:
            return assertNever(entry);
        }
      })}
    </div>
  );
}

export default Entries;
