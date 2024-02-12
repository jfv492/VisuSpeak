# MediaPipe AI Model

## Objective 
The objective is to develop and train an AI model capable of accurately recognizing hand gestures using MediaPipe, a popular framework for building machine learning pipelines. The trained model is capable of detecting five ASL words (Hello, Yes, No, Please, Thankyou) accurately.

## What is MediaPipe
MediaPipe is a cross-platform pipeline framework to build custom machine learning solutions for live and streaming media. The framework was open-sourced by Google and is currently in the alpha stage. ([Viso.ai](https://viso.ai/computer-vision/mediapipe/#:~:text=Computer%20Vision%20Teams-,What%20is%20MediaPipe%3F,currently%20in%20alpha%20at%20v0.))

## Dataset
- The dataset comprises images captured for five distinct hand gestures corresponding to the words: "Hello," "Yes," "No," "Please," and "Thank you."
- The collection of hand images was curated through the collaborative efforts of [Archisha](https://github.com/archishab) and [Jasmeet](https://github.com/jfv492).
- For the training of hand sign recognition, the dataset employs a keypoint classifiers script, facilitating the classification process.
- About 20 classifiers are stored to map various coordinates on a hand, enhancing the precision and accuracy of gesture recognition

## Recongnized words by our trained MediaPipe Model 
<img width="638" alt="Screenshot 2024-02-12 at 2 14 52 PM" src="https://github.com/jfv492/VisuSpeak/assets/98986952/2eac226f-6ef3-4495-89e1-fc3ca0ea8be8">
<img width="634" alt="Screenshot 2024-02-12 at 2 15 20 PM" src="https://github.com/jfv492/VisuSpeak/assets/98986952/a47c3bcb-d94b-4365-acca-9bd9a34e9d8e">
<img width="636" alt="Screenshot 2024-02-12 at 2 15 49 PM" src="https://github.com/jfv492/VisuSpeak/assets/98986952/66c29f35-ed30-4edc-a297-bc41a877b5d2">
<img width="633" alt="Screenshot 2024-02-12 at 2 16 10 PM" src="https://github.com/jfv492/VisuSpeak/assets/98986952/9195f8a9-7ecb-49dd-8cf8-f4bb8708b317">
<img width="628" alt="Screenshot 2024-02-12 at 2 16 32 PM" src="https://github.com/jfv492/VisuSpeak/assets/98986952/0f141b70-cfa1-4109-b604-2b3408c4cc9f">



## Prerequisites 
```
mediapipe 0.8.1
opencv 34.2 or later
Tensorflow 2.3.0 or later
tf-nightly 2.5.0.dev or later
scikit-learn 0.23.2 or Later
matplotlib 3.3.2 or Later
```
## How to run the program
Run the model using the following command:
```
python app.py
```
## References 
- [MediaPipe](https://developers.google.com/mediapipe)
- [Kazuhito Takahashi](https://github.com/Kazuhito00)
- [Nikita Kiselov](https://github.com/kinivi)
