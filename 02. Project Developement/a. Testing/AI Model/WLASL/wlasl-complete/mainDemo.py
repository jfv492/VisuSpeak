import os
import cv2
import tensorflow as tf
import numpy as np
from tensorflow import keras
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tqdm import tqdm
import json

# Path to the directory containing all the ASL sign videos
video_dir = "/Users/jasmeetsingh/Desktop/AI Model Testing/wlasl-complete/videos" 

# Path to the directory where extracted frames will be saved
frame_dir = "//Users/jasmeetsingh/Desktop/AI Model Testing/wlasl-complete/frames"

# Number of frames per video to extract (adjust as needed)
num_frames = 30

# Image size
img_size = (224, 224)

# Load class labels from JSON files
labels = {}  # Create an empty dictionary to store labels

# Load labels from JSON files (repeat this for each JSON file)
json_file_1 = "/Users/jasmeetsingh/Desktop/AI Model Testing/wlasl-complete/nslt_100.json"
json_file_2 = "/Users/jasmeetsingh/Desktop/AI Model Testing/wlasl-complete/nslt_300.json"
json_file_3 = "/Users/jasmeetsingh/Desktop/AI Model Testing/wlasl-complete/nslt_1000.json"
json_file_4 = "/Users/jasmeetsingh/Desktop/AI Model Testing/wlasl-complete/nslt_2000.json"

# Load labels from each JSON file
with open(json_file_1, "r") as json_file:
    labels_1 = json.load(json_file)
    labels.update(labels_1)

with open(json_file_2, "r") as json_file:
    labels_2 = json.load(json_file)
    labels.update(labels_2)

with open(json_file_3, "r") as json_file:
    labels_3 = json.load(json_file)
    labels.update(labels_3)

with open(json_file_4, "r") as json_file:
    labels_4 = json.load(json_file)
    labels.update(labels_4)

# Function to extract frames from videos
def extract_frames(video_path, output_path):
    cap = cv2.VideoCapture(video_path)
    frame_count = 0

    pbar = tqdm(total=num_frames, desc=f"Extracting frames from {os.path.basename(video_path)}")

    while frame_count < num_frames:
        ret, frame = cap.read()
        if not ret:
            break

        frame_filename = f"{frame_count}.jpg"
        frame_path = os.path.join(output_path, frame_filename)

        # Save frame as an image
        cv2.imwrite(frame_path, frame)

        frame_count += 1
        pbar.update(1)

    pbar.close()
    cap.release()

# Create the frame directory if it doesn't exist
os.makedirs(frame_dir, exist_ok=True)

# Extract frames from videos in the specified directory
for video_file in os.listdir(video_dir):
    video_path = os.path.join(video_dir, video_file)
    class_name = os.path.splitext(video_file)[0]
    output_dir = os.path.join(frame_dir, class_name)

    os.makedirs(output_dir, exist_ok=True)
    extract_frames(video_path, output_dir)

# Image size and batch size
img_size = (224, 224)
batch_size = 32

# Create data generators
datagen = ImageDataGenerator(
    rotation_range=10,
    width_shift_range=0.1,
    height_shift_range=0.1,
    zoom_range=0.1,
    horizontal_flip=True,
    validation_split=0.2,
    preprocessing_function=preprocess_input
)

data_gen = datagen.flow_from_directory(
    frame_dir,
    target_size=img_size,
    batch_size=batch_size,
    class_mode='categorical',
    subset='training',
    classes=labels  # Use the loaded labels
)

# Build a 3D CNN model
model = keras.Sequential([
    keras.applications.MobileNetV2(
        input_shape=(224, 224, 3),
        include_top=False,
        weights='imagenet',
        pooling='avg'
    ),
    keras.layers.Dense(len(labels), activation='softmax')  # Use the loaded class labels
])

model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

# Train the model
EPOCHS = 1
history = model.fit(data_gen, epochs=EPOCHS)

# Save the model for future use
model.save("asl_model.h5")

