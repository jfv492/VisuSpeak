# MediaPipe AI Model

## Objective 
The objective is to develop and train an AI model capable of accurately recognizing hand gestures using MediaPipe, a popular framework for building machine learning pipelines. The trained model is capable of detecting five ASL words (Hello, Yes, No, Please, Thankyou) accurately.

## Dataset
- The dataset comprises images captured for five distinct hand gestures corresponding to the words: "Hello," "Yes," "No," "Please," and "Thank you."
- The collection of hand images was curated through the collaborative efforts of [Archisha](https://github.com/archishab) and [Jasmeet](https://github.com/jfv492).
- For the training of hand sign recognition, the dataset employs a keypoint classifiers script, facilitating the classification process.
- About 20 classifiers are stored to map various coordinates on a hand, enhancing the precision and accuracy of gesture recognition

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
