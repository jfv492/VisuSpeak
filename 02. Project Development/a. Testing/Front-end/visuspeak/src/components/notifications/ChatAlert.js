// Importing React
import React from "react";
import Alert from '@mui/material/Alert';

export default function ChatAlert(props) {
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
    <div className="">
      {props.alert && (
        <Alert severity={props.alert.type}>{props.alert.msg}</Alert>
      )}
    </div>
  );
}
