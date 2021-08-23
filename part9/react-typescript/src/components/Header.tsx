import React from "react";

function Header({ courseName }: { courseName: string }): JSX.Element {
  return <h1>{courseName}</h1>;
}

export default Header;
