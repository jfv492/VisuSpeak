import "../WebCam.css"
import React, {useState, useEffect, useRef} from 'react'
import {
    GestureRecognizer,
    FilesetResolver,
    DrawingUtils
  } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";
 
 const WebCam = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [gestureOutput, setGestureOutput] = useState('');
  const [gestureRecognizer, setGestureRecognizer] = useState(null);
  const [webcamRunning, setWebcamRunning] = useState(false);
  const [runningMode, setRunningMode] = useState("IMAGE");
  const videoHeight = "360px";
  const videoWidth = "480px";

  useEffect(() => {
    const createGestureRecognizer = async () => {
      const vision = await FilesetResolver.forVisionTasks(
        "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm"
      );
      const newGestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
        baseOptions: {
          modelAssetPath:
            "https://storage.googleapis.com/mediapipe-models/gesture_recognizer/gesture_recognizer/float16/1/gesture_recognizer.task",
          delegate: "GPU"
        },
        runningMode: runningMode
      });
      setGestureRecognizer(newGestureRecognizer);
    };
    createGestureRecognizer();
  }, []);

  const hasGetUserMedia = () => {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
  };

  const enableCam = async () => {
    if (!gestureRecognizer) {
      alert("Please wait for gestureRecognizer to load");
      return;
    }

    if (webcamRunning) {
      setWebcamRunning(false);
    } else {
      setWebcamRunning(true);
      const constraints = { video: true };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      videoRef.current.srcObject = stream;
      videoRef.current.addEventListener('loadeddata', predictWebcam);
    }
  };

  useEffect(() => {
    if (!hasGetUserMedia()) {
      console.warn("getUserMedia() is not supported by your browser");
    }
  }, []);

  let lastVideoTime = useRef(-1);
  let results = useRef(undefined);

  const predictWebcam = async () => {
    if (!videoRef.current || !canvasRef.current || !gestureRecognizer) {
      return;
    }

    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const canvasCtx = canvasElement.getContext("2d");

    if (runningMode === "IMAGE") {
      setRunningMode("VIDEO");
      if (gestureRecognizer) {
        await gestureRecognizer.setOptions({ runningMode: "VIDEO" });
      }
    }

    let nowInMs = Date.now();
    if (videoElement.currentTime !== lastVideoTime.current) {
      lastVideoTime.current = videoElement.currentTime;
      results.current = await gestureRecognizer.recognizeForVideo(videoElement, nowInMs);
    }

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
    // Assuming DrawingUtils and GestureRecognizer are available in your context
    const drawingUtils = new DrawingUtils(canvasCtx);

    canvasElement.style.height = videoHeight;
    videoElement.style.height = videoHeight;
    canvasElement.style.width = videoWidth;
    videoElement.style.width = videoWidth;

    if (results.current?.landmarks) {
      for (const landmarks of results.current.landmarks) {
        drawingUtils.drawConnectors(
          landmarks,
          GestureRecognizer.HAND_CONNECTIONS,
          {
            color: "#00FF00",
            lineWidth: 5
          }
        );
        drawingUtils.drawLandmarks(landmarks, {
          color: "#FF0000",
          lineWidth: 2
        });
      }
    }
    canvasCtx.restore();

    if (results.current?.gestures.length > 0) {
      const categoryName = results.current.gestures[0][0].categoryName;
      const categoryScore = parseFloat(
        results.current.gestures[0][0].score * 100
      ).toFixed(2);
      const handedness = results.current.handednesses[0][0].displayName;
      setGestureOutput(`GestureRecognizer: ${categoryName}\n Confidence: ${categoryScore} %\n Handedness: ${handedness}`);
    } else {
      setGestureOutput('');
    }

    if (webcamRunning) {
      window.requestAnimationFrame(predictWebcam);
    }
  };
    
   return (
    <div>
    <h1>Recognize hand gestures using the MediaPipe HandGestureRecognizer task</h1>
    <section id="demos" className={gestureRecognizer ? "" : "invisible"}>
      <h2><br/>Demo: Webcam continuous hand gesture detection</h2>
      <p>Use your hand to make gestures in front of the camera to get gesture classification. <br/>Click <b>enable webcam</b> below and grant access to the webcam if prompted.</p>
      {/* <div id="liveView" className="videoView"> */}
        {/* <button id="webcamButton" className="mdc-button mdc-button--raised" onClick={handleEnableWebcam}>
          <span className="mdc-button__ripple"></span>
          <span className="mdc-button__label">ENABLE WEBCAM</span>
        </button>
        <div style={{ position: "relative" }}>
          <video id="webcam" autoPlay playsInline></video>
          <canvas className="output_canvas" id="output_canvas" width="1280" height="720" style={{ position: "absolute", left: "0px", top: "0px" }}></canvas>
          <p id='gesture_output' className="output" />
        </div>
      </div> */}
          <div>
      <button onClick={enableCam}>{webcamRunning ? 'DISABLE PREDICTIONS' : 'ENABLE PREDICTIONS'}</button>
      <video ref={videoRef} autoPlay playsInline style={{ height: videoHeight, width: videoWidth }}></video>
      <canvas ref={canvasRef} style={{ height: videoHeight, width: videoWidth }}></canvas>
      {gestureOutput && <p>{gestureOutput}</p>}
    </div>
    </section>
  </div>
   )
 }
 
 export default WebCam