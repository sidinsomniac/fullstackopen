import React from "react";
import { CoursePart } from "../types";

function Total({ courseParts }: { courseParts: CoursePart[] }) {
  return (
    <p>
      Number of exercises{" "}
      {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
}

export default Total;
