# sign2text: ASL Alphabets
## Objective 
The aim is to translate the American Sign Language (ASL) fingerspelled alphabet, consisting of 26 letters. This model employs transfer learning to extract features, followed by a customized classification block for letter classification. The model is then integrated into a real-time system using OpenCV, which reads frames from a webcam and classifies them frame by frame. This repository contains the code and weights necessary for real-time classification of the American Sign Language (ASL) alphabet.

The dataset can be found at: Dataset Link

All data has already been divided into train/validation subsets and labeled with letters from A to Z.

Please note that the Massey dataset provided has already been pre-processed and represents only a subset of the complete dataset (part 5). The added padding to account for irregularly shaped images and removed a color channel due to significant green screen background in the images. The removal of the color channel did not significantly affect performance, so it has been retained. The raw data can be obtained directly from Massey University.

# Usage 

The entire pipeline (web camera -> image crop -> pre-processing -> classification) can be executed by running the live_demo.py script.

The live_demo.py script loads a pre-trained model ([VGG16](https://keras.io/applications/#vgg16)/[ResNet50](https://keras.io/applications/#resnet50)/[MobileNet](https://keras.io/applications/#mobilenet)) with a custom classification block, and classifies the ASL alphabet frame-by-frame in real-time. The script will automatically access your web camera and open up a window with the live camera feed. A rectangular region of interest (ROI) is shown on the camera feed. This ROI is cropped and passed to the classifier, which returns the top 3 predictions. The largest letter shown is the top prediction, and the bottom 2 letters are the second (left) and third (right) most probable predictions. The architecture of the classification block will be described further in Sections 4/5.

## Dependencies
```
OpenCV 3.1.0
Keras 2.0.8
tensorflow 1.11 (cpu version), it will also run with the gpu-version
numpy 1.15.2
joblib 0.10.3
```

## Running the Live Demo
   
When running the script, you must choose the pre-trained  model you wish to use. You may optionally load your own weights for the classification block. 

```bash
$ python live_demo.py --help
usage: live_demo.py [-h] [-w WEIGHTS] -m MODEL

optional arguments:
  -h, --help            show this help message and exit
  -w WEIGHTS, --weights WEIGHTS
                        path to the model weights

required arguments:
  -m MODEL, --model MODEL
                        name of pre-trained network to use
```

NOTE - On a MacBook Pro (macOS SIERRA 16GB 1600MHz DDR3/2.2 GHz Intel Core i7) using the CPU only, it can take up to ~250ms to classify a single frame. This results in lag during real-time classification as the effective frame rate is anywhere from 1-10 frames per second,  depending on which model is running. MobileNet is the most efficient model. Performance for all models is is significantly improved if running on a GPU. 

## References
- https://github.com/dazcona/sign2text
- https://research.gallaudet.edu/Publications/ASL_Users.pdf
- https://blog.keras.io/building-powerful-image-classification-models-using-very-little-data.html

