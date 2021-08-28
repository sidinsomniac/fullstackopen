import React from "react";
import { DiagnosisEntry, Entry } from "../types";
import EntrySegment from "../components/EntrySegment";

const OccupationalHealthcareEntry = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: DiagnosisEntry;
}) => {
  return (
    <EntrySegment
      color={"slateblue"}
      icon={"stethoscope"}
      entry={entry}
      diagnoses={diagnoses}
    />
  );
};

export default OccupationalHealthcareEntry;
