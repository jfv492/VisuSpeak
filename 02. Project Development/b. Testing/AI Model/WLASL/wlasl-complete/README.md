# WLASL Dataset

## Project Overview
This project demonstrates how to recognize American Sign Language (ASL) signs using video frames and a convolutional neural network (CNN) model. 
It involves the extraction of frames from ASL sign videos, preprocessing them, and training a model for accurate recognition. 
ASL is an essential communication tool for the hearing-impaired, and this project aims to bridge the communication gap by enabling real-time sign language interpretation.

## Dataset
The project usesWLASL (Word-Level American Sign Language) dataset. This dataset contains a collection of ASL signs represented as video files. 
The videos are used to extract frames for training the recognition model. You can obtain the dataset from [Kaggle](https://www.kaggle.com/datasets/sttaseen/wlasl2000-resized/data).

## Prerequisites
Before running the code, ensure that you have the following prerequisites installed on your system:
- Python 
- TensorFlow
- OpenCV
- NumPy
- tqdm
- json

You can install all libraries above by using the command:
```
pip install requirements.txt
```
## Setup
- Clone the repository or download the code to your local machine.
- Place the ASL sign videos in a directory (video_dir) and set the video_dir variable in the code to the path of this directory.
- Create a directory (frame_dir) where the extracted frames will be saved and set the frame_dir variable to its path.
- Prepare class labels by creating JSON files. Each JSON file should contain a mapping of class names to class indices. The code expects multiple JSON files, one for each set of labels. Update the paths to your JSON files in the code.


