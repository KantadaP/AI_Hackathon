import React from "react";

function fBackend1(x, y) {
  // This is a simple functional component that returns a div with the text "Backend1"
  // It can be used as a route in a React Router setup
  // You can add more functionality or styling as needed
  const z = x + y;
  return z;
}

export default function Backend1() {
  return (
    <>
      <div>Backend1</div>
      // You can call the function fBackend1 here if needed
      <div>{fBackend1(2, 3)}</div> // Example of calling the function with
      arguments
    </>
  );
}
