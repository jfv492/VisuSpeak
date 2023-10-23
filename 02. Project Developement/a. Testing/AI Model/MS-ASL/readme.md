# American Sign Language (ASL) Recognition

This repository contains a solution for recognizing American Sign Language (ASL) using the MS-ASL dataset provided by Microsoft.

## Project Overview

The goal of this project is to train a deep learning model that takes video clips as input and predicts the corresponding ASL sign. The model is trained using the MS-ASL dataset, which contains video URLs, timestamps, and labels for various ASL signs.

## Dataset

The MS-ASL dataset contains:

- Train, test, and validation sets in JSON format.
- A list of 1000 glosses (words) representing classes for the classification task.
- A list of words considered synonyms and assigned to a single class.

Each sample clip in the dataset provides:
- URL to the video clip.
- Start and end times of the clip in the original video.
- Class label (integer between 0 to 1000).
- Bounding box of the signer.
- Gloss (word) for the clip.
- Video dimensions and frame rate.

## Prerequisites

Before running the code, ensure you have the following dependencies installed:
```
pip install opencv-python pandas requests pytube tensorflow tqdm
```

## Implementation
1. Videos from the MS-ASL dataset are downloaded using the pytube library.
2. The videos are processed using OpenCV to extract relevant frames based on the dataset's timestamps.
3. The extracted frames are used to train a deep learning model for ASL recognition.

## Known Limitations
1. Some videos in the MS-ASL dataset might be private or unavailable. The current implementation skips these videos and prints an error message.
2. Due to the potential for rate limits or CAPTCHAs from YouTube, downloading a large number of videos in quick succession might be an issue.