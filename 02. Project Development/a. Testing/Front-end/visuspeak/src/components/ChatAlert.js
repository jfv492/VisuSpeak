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
        // <div className="toast-container position-fixed bottom-0 end-0">
        //   <div
        //     id="liveToast"
        //     className="toast show"
        //     role="alert"
        //     aria-live="assertive"
        //     aria-atomic="true"
        //   >
        //     <div className={`toast-header toast-${props.alert.type}`}>
        //       {props.alert.type === "success" ? (
        //         <i className="fa-solid fa-circle-check me-2 fa-xl"></i>
        //       ) : (
        //         <i className="fa-solid fa-circle-exclamation me-2 fa-xl"></i>
        //       )}
        //       <strong className="me-auto fs-5">{capitalize(props.alert.type)}</strong>
        //       <small></small>
        //       <button
        //         type="button"
        //         className="btn-close"
        //         data-bs-dismiss="toast"
        //         aria-label="Close"
        //       ></button>
        //     </div>
        //     <div className="toast-body fs-6">{props.alert.msg}</div>
        //   </div>
        // </div>
      )}
    </div>
  );
}
