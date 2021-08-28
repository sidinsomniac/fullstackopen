import React from "react";
import { DiagnosisEntry, Entry } from "../types";
import EntrySegment from "../components/EntrySegment";

const HospitalEntry = ({
  entry,
  diagnoses,
}: {
  entry: Entry;
  diagnoses: DiagnosisEntry;
}) => {
  return (
    <>
      <EntrySegment
        color={"lightgreen"}
        icon={"user doctor"}
        entry={entry}
        diagnoses={diagnoses}
      />
    </>
  );
};

export default HospitalEntry;
