import React from "react";
import CoursePart from "../types";

function Part({ courseParts }: { courseParts: CoursePart[] }): JSX.Element {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`,
    );
  };

  return (
    <div>
      {courseParts.map(part => {
        switch (part.type) {
          case "normal":
            return (
              <>
                <h4>
                  {part.name} {part.exerciseCount}
                </h4>
                <p>
                  <em>{part.description}</em>
                </p>
              </>
            );
          case "groupProject":
            return (
              <>
                <h4>
                  {part.name} {part.exerciseCount}
                </h4>
                <p>
                  <em>project exercises {part.groupProjectCount}</em>
                </p>
              </>
            );
          case "submission":
            return (
              <>
                <h4>
                  {part.name} {part.exerciseCount}
                </h4>
                <p>
                  <em>{part.description}</em>
                </p>
                <p>submit to {part.exerciseSubmissionLink}</p>
              </>
            );
          case "special":
            return (
              <>
                <h4>
                  {part.name} {part.exerciseCount}
                </h4>
                <p>
                  <em>{part.description}</em>
                </p>
                <p>required skills: {part.requirements.join(", ")}</p>
              </>
            );
          default:
            return assertNever(part);
        }
      })}
    </div>
  );
}

export default Part;
