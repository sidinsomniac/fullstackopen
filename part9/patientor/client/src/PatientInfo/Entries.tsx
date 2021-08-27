import React from "react";
import { Entry } from "../types";

function Entries({ entries }: { entries: Entry[] | undefined }): JSX.Element {
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
                entry.diagnosisCodes.map((code, idx) => (
                  <li key={idx}>{code}</li>
                ))}
            </ul>
          </li>
        </ul>
      ))}
    </div>
  );
}

export default Entries;
