import React from "react";
import { DiagnosisEntry, Entry } from "../types";
import EntrySegment from "../components/EntrySegment";

const HealthCheckEntry = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: DiagnosisEntry;
}) => {
  return (
    <EntrySegment
      color={"orange"}
      icon={"medrt"}
      entry={entry}
      diagnoses={diagnoses}
    />
  );
};

export default HealthCheckEntry;
