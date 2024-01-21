// import "../WebCam.css"
// import React from 'react'
// import {
//     GestureRecognizer,
//     FilesetResolver,
//     DrawingUtils
//   } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
 
//  const WebCam = () => {
//     const demosSection = document.getElementById("demos");
// let gestureRecognizer: GestureRecognizer;
// let runningMode = "IMAGE";
// let enableWebcamButton: HTMLButtonElement;
// let webcamRunning: Boolean = false;
// const videoHeight = "360px";
// const videoWidth = "480px";

// // Before we can use HandLandmarker class we must wait for it to finish
// // loading. Machine Learning models can be large and take a moment to
// // get everything needed to run.
// const createGestureRecognizer = async () => {
//   const vision = await FilesetResolver.forVisionTasks(
//     "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
//   );
//   gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
//     baseOptions: {
//       modelAssetPath:
//         "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
//       delegate: "GPU"
//     },
//     runningMode: runningMode
//   });
//   demosSection.classList.remove("invisible");
// };
// createGestureRecognizer();

// const video = document.getElementById("webcam");
// const canvasElement = document.getElementById("output_canvas");
// const canvasCtx = canvasElement.getContext("2d");
// const gestureOutput = document.getElementById("gesture_output");

// // Check if webcam access is supported.
// function hasGetUserMedia() {
//   return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
// }

// // If webcam supported, add event listener to button for when user
// // wants to activate it.
// if (hasGetUserMedia()) {
//   enableWebcamButton = document.getElementById("webcamButton");
//   enableWebcamButton.addEventListener("click", enableCam);
// } else {
//   console.warn("getUserMedia() is not supported by your browser");
// }

// // Enable the live webcam view and start detection.
// function enableCam(event) {
//   if (!gestureRecognizer) {
//     alert("Please wait for gestureRecognizer to load");
//     return;
//   }

//   if (webcamRunning === true) {
//     webcamRunning = false;
//     enableWebcamButton.innerText = "ENABLE PREDICTIONS";
//   } else {
//     webcamRunning = true;
//     enableWebcamButton.innerText = "DISABLE PREDICTIONS";
//   }

//   // getUsermedia parameters.
//   const constraints = {
//     video: true
//   };

//   // Activate the webcam stream.
//   navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
//     video.srcObject = stream;
//     video.addEventListener("loadeddata", predictWebcam);
//   });
// }

// let lastVideoTime = -1;
// let results = undefined;
// async function predictWebcam() {
//   const webcamElement = document.getElementById("webcam");
//   // Now let's start detecting the stream.
//   if (runningMode === "IMAGE") {
//     runningMode = "VIDEO";
//     await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
//   }
//   let nowInMs = Date.now();
//   if (video.currentTime !== lastVideoTime) {
//     lastVideoTime = video.currentTime;
//     results = gestureRecognizer.recognizeForVideo(video, nowInMs);
//   }

//   canvasCtx.save();
//   canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
//   const drawingUtils = new DrawingUtils(canvasCtx);

//   canvasElement.style.height = videoHeight;
//   webcamElement.style.height = videoHeight;
//   canvasElement.style.width = videoWidth;
//   webcamElement.style.width = videoWidth;

//   if (results.landmarks) {
//     for (const landmarks of results.landmarks) {
//       drawingUtils.drawConnectors(
//         landmarks,
//         GestureRecognizer.HAND_CONNECTIONS,
//         {
//           color: "#00FF00",
//           lineWidth: 5
//         }
//       );
//       drawingUtils.drawLandmarks(landmarks, {
//         color: "#FF0000",
//         lineWidth: 2
//       });
//     }
//   }
//   canvasCtx.restore();
//   if (results.gestures.length > 0) {
//     gestureOutput.style.display = "block";
//     gestureOutput.style.width = videoWidth;
//     const categoryName = results.gestures[0][0].categoryName;
//     const categoryScore = parseFloat(
//       results.gestures[0][0].score * 100
//     ).toFixed(2);
//     const handedness = results.handednesses[0][0].displayName;
//     gestureOutput.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %\n Handedness: ${handedness}`;
//   } else {
//     gestureOutput.style.display = "none";
//   }
//   // Call this function again to keep predicting when the browser is ready.
//   if (webcamRunning === true) {
//     window.requestAnimationFrame(predictWebcam);
//   }
// }
//    return (
//      <div>
//        <h1>Recognize hand gestures using the MediaPipe HandGestureRecognizer task</h1>

//         <section id="demos" class="invisible">

//         <h2><br/>Demo: Webcam continuous hand gesture detection</h2>
//         <p>Use your hand to make gestures in front of the camera to get gesture classification. <br/>Click <b>enable webcam</b> below and grant access to the webcam if prompted.</p>

//         <div id="liveView" class="videoView">
//             <button id="webcamButton" class="mdc-button mdc-button--raised">
//             <span class="mdc-button__ripple"></span>
//             <span class="mdc-button__label">ENABLE WEBCAM</span>
//             </button>
//             <div style={{position: "relative"}}>
//             <video id="webcam" autoplay playsinline></video>
//             https://codepen.io/mediapipe-preview/pen/zYamdVd
//             <canvas class="output_canvas" id="output_canvas" width="1280" height="720" style={{ position: "absolute", left: "0px", top: "0px" }}></canvas>

//             <p id='gesture_output' class="output" />
//             </div>
//         </div>
//         </section>
//      </div>
//    )
//  }
 
//  export default WebCam

import React, { useEffect, useRef, useState } from 'react';
import "../WebCam.css";
import {
    GestureRecognizer,
    FilesetResolver,
    DrawingUtils
  } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";

const WebCam = async () => {
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);
//     const gestureOutputRef = useRef(null);
//     const enableWebcamButtonRef = useRef(null);
//     const [webcamRunning, setWebcamRunning] = useState(false);
//     const [gestureRecognizer, setGestureRecognizer] = useState(null);
//     let lastVideoTime = useRef(-1).current;
//     let results = useRef(undefined).current;


  
//     useEffect(() => {
//         const createGestureRecognizer = async () => {
//           try {
//             const vision = await FilesetResolver.forVisionTasks(
//                 "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
//             );
//             const recognizer = await GestureRecognizer.createFromOptions(vision, {
//               baseOptions: {
//                 modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
//                 delegate: "GPU"
//               },
//               runningMode: "IMAGE"
//             });
//             setGestureRecognizer(recognizer);
//           } catch (error) {
//             console.error("Error setting up GestureRecognizer:", error);
//           }
//         };
//         createGestureRecognizer();
//       }, []);
  

//   const hasGetUserMedia = () => {
//     return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
//   };

//   const enableCam = async () => {
//     if (!gestureRecognizer) {
//         console.log("GestureRecognizer not initialized yet");
//       alert("Please wait for gestureRecognizer to load");
//       return;
//     }

//     setWebcamRunning(!webcamRunning);

//     if (!webcamRunning) {
//       try {
//         const stream = await navigator.mediaDevices.getUserMedia({ video: true });
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//           await predictWebcam();
//         }
//       } catch (error) {
//         console.error("Error accessing webcam:", error);
//       }
//     }
//   };

//   const predictWebcam = async () => {
//     if (gestureRecognizer && webcamRunning && videoRef.current) {
//       // Get the current time in milliseconds
//       let nowInMs = Date.now();
  
//       // Check if the video has advanced since last frame
//       if (videoRef.current.currentTime !== lastVideoTime) {
//         lastVideoTime = videoRef.current.currentTime;
  
//         // Perform gesture recognition
//         try {
//           results = await gestureRecognizer.recognizeForVideo(videoRef.current, nowInMs);
          
//           // Process and display results
//           const canvasCtx = canvasRef.current.getContext('2d');
//           canvasCtx.save();
//           canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  
//           // Assuming you have a DrawingUtils class or similar for rendering
//           const drawingUtils = new DrawingUtils(canvasCtx);
  
//           if (results && results.landmarks) {
//             for (const landmarks of results.landmarks) {
//               drawingUtils.drawConnectors(
//                 landmarks,
//                 GestureRecognizer.HAND_CONNECTIONS,
//                 { color: "#00FF00", lineWidth: 5 }
//               );
//               drawingUtils.drawLandmarks(landmarks, { color: "#FF0000", lineWidth: 2 });
//             }
//           }
  
//           canvasCtx.restore();
  
//           // Update gesture output
//           if (results && results.gestures.length > 0) {
//             const categoryName = results.gestures[0][0].categoryName;
//             const categoryScore = parseFloat(results.gestures[0][0].score * 100).toFixed(2);
//             const handedness = results.handednesses[0][0].displayName;
//             gestureOutputRef.current.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore}%\n Handedness: ${handedness}`;
//           } else {
//             gestureOutputRef.current.innerText = '';
//           }
//         } catch (error) {
//           console.error('Error in gesture recognition:', error);
//         }
//       }
  
//       // Request the next frame
//       window.requestAnimationFrame(predictWebcam);
//     }
//   };
const videoRef = useRef(null);
const canvasRef = useRef(null);
const gestureOutputRef = useRef(null);
const [webcamRunning, setWebcamRunning] = useState(false);
const [gestureRecognizer, setGestureRecognizer] = useState(null);
const [runningMode, setRunningMode] = useState("IMAGE");
let lastVideoTime = useRef(-1);

  useEffect(() => {
    const createGestureRecognizer = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
            "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
        );
        const recognizer = await GestureRecognizer.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
            delegate: "GPU"
          },
          runningMode: "IMAGE"
        });
        setGestureRecognizer(recognizer);
      } catch (error) {
        console.error("Error setting up GestureRecognizer:", error);
      }
    };
    createGestureRecognizer();
  }, []);

  const enableCam = async () => {
    if (!gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }

    setWebcamRunning(!webcamRunning);

    if (!webcamRunning) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await predictWebcam();
        }
      } catch (error) {
        console.error("Error accessing webcam:", error);
      }
    }
  };

const predictWebcam = async () => {
  if (!gestureRecognizer || !webcamRunning || !videoRef.current || !canvasRef.current) return;

  const videoElement = videoRef.current;
  const canvasElement = canvasRef.current;
  const gestureOutputElement = gestureOutputRef.current;
  const canvasCtx = canvasElement.getContext('2d');

  if (runningMode === "IMAGE") {
    setRunningMode("VIDEO");
    await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
  }

  let nowInMs = Date.now();
  if (videoElement.currentTime !== lastVideoTime.current) {
    lastVideoTime.current = videoElement.currentTime;
    const results = await gestureRecognizer.recognizeForVideo(videoElement, nowInMs);
    console.log("Recognition Results:", results);
    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

    const drawingUtils = new DrawingUtils(canvasCtx);

    // Add your logic to adjust canvasElement and videoElement styles if needed
    // canvasElement.style.height = ...
    // videoElement.style.height = ...
    
    if (results && results.landmarks) {
      for (const landmarks of results.landmarks) {
        drawingUtils.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, { color: "#00FF00", lineWidth: 5 });
        drawingUtils.drawLandmarks(landmarks, { color: "#FF0000", lineWidth: 2 });
      }
    }

    canvasCtx.restore();

    if (results && results.gestures.length > 0) {
        if (gestureOutputRef.current) {
          const categoryName = results.gestures[0][0].categoryName;
          const categoryScore = parseFloat(results.gestures[0][0].score * 100).toFixed(2);
          const handedness = results.handednesses[0][0].displayName;
          gestureOutputRef.current.innerText = `GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore}%\n Handedness: ${handedness}`;
        }
      } else {
        if (gestureOutputRef.current) {
          gestureOutputRef.current.innerText = '';
        }
      }
  }

  if (webcamRunning) {
    window.requestAnimationFrame(predictWebcam);
  }
  
};
  
    
  return (
    <div>
      <h1>Recognize hand gestures using the MediaPipe HandGestureRecognizer task</h1>
      <section id="demos" className={gestureRecognizer ? "" : "invisible"}>
        <h2>Demo: Webcam continuous hand gesture detection</h2>
        <p>Use your hand to make gestures in front of the camera to get gesture classification. <br />Click <b>enable webcam</b> below and grant access to the webcam if prompted.</p>
        <div id="liveView" className="videoView">
        <button id="webcamButton" className="mdc-button mdc-button--raised" onClick={enableCam}>
            <span className="mdc-button__ripple"></span>
            <span className="mdc-button__label">{webcamRunning ? "DISABLE WEBCAM" : "ENABLE WEBCAM"}</span>
          </button>
          <div style={{ position: "relative" }}>
            <video ref={videoRef} autoPlay playsInline></video>
            <canvas ref={canvasRef} className="output_canvas" width="1280" height="720" style={{ position: "absolute", left: "0px", top: "0px" }}></canvas>
            <p ref={gestureOutputRef} id='gesture_output' className="output"></p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WebCam;
