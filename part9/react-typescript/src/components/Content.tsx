import React from "react";
import CoursePart from "../types";
import Part from "./Part";

function Content({ courseParts }: { courseParts: CoursePart[] }): JSX.Element {
  return (
    <div>
      <Part courseParts={courseParts} />
    </div>
  );
}

export default Content;
