import { useEffect, useRef } from 'react';
import { Camera } from '@mediapipe/camera_utils';
import {
  drawConnectors,
  drawLandmarks,
  drawRectangle,
} from '@mediapipe/drawing_utils';
import { Hands, HAND_CONNECTIONS, Results, Landmark } from '@mediapipe/hands';
import useKeyPointClassifier from './useKeyPointClassifier';
import CONFIGS from '../../../../constants';

const maxVideoWidth = 960;
const maxVideoHeight = 540;

function useLogic() {
  const videoElement = useRef<HTMLVideoElement>(null);
  const hands = useRef<Hands>(new Hands({
    locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
  })); 
  const camera = useRef<Camera>();
  const canvasEl = useRef<HTMLCanvasElement>(null);
  const handsGesture = useRef<any[]>([]);

  const { processLandmark } = useKeyPointClassifier();

  async function onResults(results: Results) {
    if (canvasEl.current) {
      if (results.multiHandLandmarks.length) {
      }
      const ctx = canvasEl.current.getContext('2d');

      if (ctx) {
        ctx.save();
      ctx.clearRect(0, 0, canvasEl.current.width, canvasEl.current.height);
      // Ensure that results.image is of a type compatible with drawImage
      if (results.image instanceof HTMLImageElement || results.image instanceof HTMLCanvasElement || results.image instanceof HTMLVideoElement) {
        ctx.drawImage(results.image, 0, 0, maxVideoWidth, maxVideoHeight);
      }

      if (results.multiHandLandmarks) {
        for (const [index, landmarks] of results.multiHandLandmarks.entries()) {
          if (results.image instanceof HTMLCanvasElement) {
            processLandmark(landmarks, results.image).then(
              (val) => (handsGesture.current[index] = val)
            );
          }
          
          console.log(CONFIGS.keypointClassifierLabels[handsGesture.current[index]]);


          const landmarksX = landmarks.map((landmark: Landmark) => landmark.x); // Add type to landmark
          const landmarksY = landmarks.map((landmark: Landmark) => landmark.y); // Add type to landmark
          ctx.fillStyle = '#ff0000';
          ctx.font = '24px serif';
          ctx.fillText(
            CONFIGS.keypointClassifierLabels[handsGesture.current[index]],
            maxVideoWidth * Math.min(...landmarksX),
            maxVideoHeight * Math.min(...landmarksY) - 15
          );
          drawRectangle(
            ctx,
            {
              xCenter:
                Math.min(...landmarksX) +
                (Math.max(...landmarksX) - Math.min(...landmarksX)) / 2,
              yCenter:
                Math.min(...landmarksY) +
                (Math.max(...landmarksY) - Math.min(...landmarksY)) / 2,
              width: Math.max(...landmarksX) - Math.min(...landmarksX),
              height: Math.max(...landmarksY) - Math.min(...landmarksY),
              rotation: 0,
              //rectId: 13,
            },
            {
              fillColor: 'transparent',
              color: '#ff0000',
              lineWidth: 1,
            }
          );
          drawConnectors(ctx, landmarks, HAND_CONNECTIONS, {
            color: '#00ffff',
            lineWidth: 2,
          });
          drawLandmarks(ctx, landmarks, {
            color: '#ffff29',
            lineWidth: 1,
          });
        }
      }
      ctx?.restore();
      } 
    }
  }

  useEffect(() => {
    async function initCamera() {
      if (videoElement.current && !camera.current) {
        camera.current = new Camera(videoElement.current, {
          onFrame: async () => {
            if (videoElement.current) {
              await hands.current.send({ image: videoElement.current });
            }
          },
          width: maxVideoWidth,
          height: maxVideoHeight,
        });
        camera.current.start();
      }
    }

    hands.current.setOptions({
      maxNumHands: 2,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.current.onResults(onResults);

    initCamera();
  }, []);

  return { maxVideoHeight, maxVideoWidth, canvasEl, videoElement };
}

export default useLogic;
