import React, { useRef, useState, useEffect, useCallback } from 'react';
import Webcam from 'react-webcam';

const VideoComponent = () => {
  const webcamRef = useRef(null);
  const [prediction, setPrediction] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  const captureFrame = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
      fetch('http://localhost:9000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ image: imageSrc.split(',')[1] })
      })
      .then(response => response.json())
      .then(data => {
        setPrediction(data.prediction);
        setConfidence(data.confidence);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }, [webcamRef]);

  useEffect(() => {
    // Set the interval when the component is mounted
    const id = setInterval(captureFrame, 1000);
    setIntervalId(id);

    // Clear the interval when the component is unmounted
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [captureFrame, intervalId]);
  return (
    <>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        videoConstraints={{
          width: 720,
          height: 720,
          facingMode: "user"
        }}
      />
      <p>Prediction: {prediction}</p>
      <p>Confidence: {confidence}</p>
    </>
  );
};

export default VideoComponent;
