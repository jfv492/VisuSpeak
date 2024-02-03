import { useEffect, useRef } from 'react';
import { Landmark } from '@mediapipe/hands';
import * as tf from '@tensorflow/tfjs';
import _ from 'lodash';

const calcLandmarkList = (image: HTMLCanvasElement, landmarks: Landmark[]) => {
  const { width: imageWidth, height: imageHeight } = image;

  const landmarkPoint: any = [];

  // Keypoint
  Object.values(landmarks).forEach((landmark: Landmark) => {
    const landmarkX = Math.min(landmark.x * imageWidth, imageWidth - 1);
    const landmarkY = Math.min(landmark.y * imageHeight, imageHeight - 1);

    landmarkPoint.push([landmarkX, landmarkY]);
  });

  return landmarkPoint;
};

const preProcessLandmark = (landmarkList: number[][]) => {
  let tempLandmarkList = _.cloneDeep(landmarkList);

  let baseX = 0;
  let baseY = 0;

  // Convert to relative coordinates
  tempLandmarkList.forEach((landmarkPoint, index) => {
    if (index === 0) {
      baseX = landmarkPoint[0];
      baseY = landmarkPoint[1];
    }

    landmarkPoint[0] -= baseX;
    landmarkPoint[1] -= baseY;
  });

  // Flatten the array if your model expects a one-dimensional array
  const flattenedList = _.flatten(tempLandmarkList);

  // Normalize
  const maxValue = Math.max(...flattenedList.map(Math.abs));
  return flattenedList.map(value => value / maxValue);
};

function useKeyPointClassifier() {
  const model = useRef<tf.GraphModel>();

  const keyPointClassifier = async (landmarkList: number[]) => {
    if (model.current) {
      const tensorResult = model.current.execute(tf.tensor2d([landmarkList])) as tf.Tensor;
      const result = await tensorResult.squeeze().argMax().data();
      return Array.from(result);
    }
    return [];
  };

  const processLandmark = async (handLandmarks: Landmark[], image: HTMLCanvasElement) => {
    const landmarkList = calcLandmarkList(image, handLandmarks);
    const preProcessedLandmarkList = preProcessLandmark(landmarkList);
    const flattenedList = _.flattenDeep(preProcessedLandmarkList);
    const handSignId = await keyPointClassifier(flattenedList);
    return handSignId.length > 0 ? handSignId[0] : undefined;
  };

  const loadModel = async () => {
    model.current = await tf.loadGraphModel(
      `/tf-models/key-point-classifier/model.json`
    );
  };

  useEffect(() => {
    loadModel();
  }, []);
  return { processLandmark };
}

export default useKeyPointClassifier;
