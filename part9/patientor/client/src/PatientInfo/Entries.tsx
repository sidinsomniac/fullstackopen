import React from "react";
import { useStateValue } from "../state";
import { Entry } from "../types";

function Entries({ entries }: { entries: Entry[] | undefined }): JSX.Element {
  const [{ diagnoses }] = useStateValue();

  return !entries?.length ? (
    <div>No entries</div>
  ) : (
    <div>
      <h3>entries</h3>
      {entries.map(entry => (
        <ul key={entry.id}>
          <li>
            <p>
              {entry.date} <em>{entry.description}</em>
            </p>
            <ul>
              {entry.diagnosisCodes?.length &&
                entry.diagnosisCodes.map(code => (
                  <li key={code}>
                    {code}: {diagnoses[code]?.name}
                  </li>
                ))}
            </ul>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default Entries;
