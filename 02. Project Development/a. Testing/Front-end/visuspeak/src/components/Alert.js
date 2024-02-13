// Importing React
import React from "react";

export default function Alert(props) {
  // Function 'capitalize' to capitalize the first letter of a given word
  // Additionally, it converts 'danger' to 'error' for display purposes
  const capitalize = (word) => {
    if (word === "danger") {
      word = "error";
    }
    const lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };
  return (
    <>
      {props.alert && (
        <div style={{ height: "50px" }}>
          <div
            className={`alert alert-${props.alert.type} alert-dismissable fade show`}
            role="alert"
          >
            <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
          </div>
        </div>
      )}
    </>
  );
}
