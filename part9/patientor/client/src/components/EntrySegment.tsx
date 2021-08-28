import React from "react";
import { Header, Icon, List, SemanticICONS } from "semantic-ui-react";
import { DiagnosisEntry, Entry } from "../types";

const EntrySegment = ({
  icon,
  color,
  entry,
  diagnoses,
}: {
  icon: SemanticICONS;
  color: string;
  entry: Entry;
  diagnoses: DiagnosisEntry;
}) => {
  return (
    <div className="ui segment">
      <Header as="h3">
        {entry.date} <Icon name={icon} />
      </Header>
      <p>
        <em>{entry.description}</em>
      </p>
      <List>
        {entry.diagnosisCodes?.length &&
          entry.diagnosisCodes.map(code => (
            <List.Item key={code}>
              {code}: {diagnoses[code]?.name}
            </List.Item>
          ))}
      </List>
      <Icon name="heart" style={{ color }} />
    </div>
  );
};

export default EntrySegment;
