import React from "react";
import { CoursePart } from "../types";

function Content({ courseParts }: { courseParts: CoursePart[] }): JSX.Element {
  return (
    <div>
      {courseParts.map(part => (
        <p>
          {part.name} {part.exerciseCount}
        </p>
      ))}
    </div>
  );
}

export default Content;
