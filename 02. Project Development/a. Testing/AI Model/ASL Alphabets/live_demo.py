# #!/usr/bin/env python
# # -*- coding: utf-8 -*-

# """
# LIVE DEMO
# This script loads a pre-trained model (for best results use pre-trained weights for classification block)
# and classifies American Sign Language finger spelling frame-by-frame in real-time
# """

# import string
# import cv2
# import time
# from processing import square_pad, preprocess_for_vgg
# from model import create_model
# import argparse
# import numpy as np
# import os

# ap = argparse.ArgumentParser()
# ap.add_argument("-w", "--weights", default=None,
#                 help="path to the model weights")
# required_ap = ap.add_argument_group('required arguments')
# required_ap.add_argument("-m", "--model",
#                          type=str, default="resnet", required=True,
#                          help="name of pre-trained network to use")
# args = vars(ap.parse_args())

# # Map model names to classes
# MODELS = ["resnet", "vgg16", "inception", "xception", "mobilenet"]

# if args["model"] not in MODELS:
#     raise AssertionError("The --model command line argument should be a key in the `MODELS` dictionary")

# # Create pre-trained model + classification block, with or without pre-trained weights
# my_model = create_model(model=args["model"],
#                         model_weights_path=args["weights"])

# # Dictionary to convert numerical classes to alphabet
# label_dict = {pos: letter
#               for pos, letter in enumerate(string.ascii_uppercase)}


# # ====================== Live loop ======================
# # =======================================================

# video_capture = cv2.VideoCapture(0)

# fps = 0
# start = time.time()
# word = ""
# prediction_string = "" # Initialize an empty string to hold predictions
# last_prediction = ""  # Variable to hold the last top prediction
# last_time = time.time()
# prediction_timeout = 1.5  # 1.5 seconds without prediction to consider the end of a letter

# while True:
#     # Capture frame-by-frame
#     ret, frame = video_capture.read()
#     if not ret:
#         print("Failed to capture frame. Exiting...")
#         break

#     fps += 1

#     # Draw rectangle around face
#     x = 313
#     y = 82
#     w = 451
#     h = 568
#     cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 255, 0), 3)

#     # Crop + process captured frame
#     hand = frame[y:y+h, x:x+w]
#     hand = square_pad(hand)
#     hand = preprocess_for_vgg(hand)

#     # Make prediction
#     my_predict = my_model.predict(hand,
#                                   batch_size=1,
#                                   verbose=0)

#     # Predict letter
#     top_prd = np.argmax(my_predict)

#     # Only display predictions with probabilities greater than 0.5
#     if np.max(my_predict) >= 0.50:
#         prediction_result = label_dict[top_prd]
#         last_prediction = prediction_result  # Update last top prediction

#         preds_list = np.argsort(my_predict)[0]
#         pred_2 = label_dict[preds_list[-2]]
#         pred_3 = label_dict[preds_list[-3]]

#         # Print current prediction to the console
#         current_prediction = f"{prediction_result} {pred_2} {pred_3}"
#         print("Current Prediction: ", current_prediction)

#         # Append current prediction to the prediction string
#         prediction_string += f"{current_prediction} | "

#         width = int(video_capture.get(3) + 0.5)
#         height = int(video_capture.get(4) + 0.5)

#         # Annotate image with most probable prediction
#         cv2.putText(frame, text=prediction_result,
#                     org=(width // 2 + 230, height // 2 + 75),
#                     fontFace=cv2.FONT_HERSHEY_SIMPLEX,
#                     fontScale=17, color=(255, 255, 0),
#                     thickness=15, lineType=cv2.LINE_AA)
#         # Annotate image with second most probable prediction (displayed on bottom left)
#         cv2.putText(frame, text=pred_2,
#                     org=(width // 2 + width // 5 + 40, (360 + 240)),
#                     fontFace=cv2.FONT_HERSHEY_PLAIN,
#                     fontScale=6, color=(0, 0, 255),
#                     thickness=6, lineType=cv2.LINE_AA)
#         # Annotate image with third probable prediction (displayed on bottom right)
#         cv2.putText(frame, text=pred_3,
#                     org=(width // 2 + width // 3 + 5, (360 + 240)),
#                     fontFace=cv2.FONT_HERSHEY_PLAIN,
#                     fontScale=6, color=(0, 0, 255),
#                     thickness=6, lineType=cv2.LINE_AA)

#     # If a certain amount of time has passed without a new prediction, consider the letter to be complete
#     if (time.time() - last_time) > prediction_timeout and last_prediction:
#         word += " "  # Add a space to signify the end of a letter or word
#         last_prediction = ""  # Reset last prediction

#     # Display the resulting frame
#     cv2.imshow('Video', frame)

#     # Press 'q' to exit live loop
#     if cv2.waitKey(10) & 0xFF == ord('q'):
#         break

# # Calculate frames per second
# end = time.time()
# FPS = fps/(end-start)
# print("[INFO] approx. FPS: {:.2f}".format(FPS))

# # Output the last prediction
# print("Last Prediction: ", last_prediction)

# # # Output the prediction string
# # print("Predicted letters: ", prediction_string.strip())

# # # Directory path
# # directory = "./data/"

# # # Create the directory if it doesn't exist
# # if not os.path.exists(directory):
# #     os.makedirs(directory)

# # # Now, open the file
# # with open(os.path.join(directory, 'predictions.txt'), 'w') as file:
# #     file.write(prediction_string.strip())

# # Release the capture
# video_capture.release()
# cv2.destroyAllWindows()

#!/usr/bin/env python
# -*- coding: utf-8 -*-

"""
LIVE DEMO
This script loads a pre-trained model and classifies American Sign Language finger spelling frame-by-frame in real-time
"""

import string
import cv2
import time
from processing import square_pad, preprocess_for_vgg
from model import create_model
import argparse
import numpy as np

def preprocess_for_vgg(image):
    # Assuming the input image is in BGR format as cv2.imread does
    # Resize the image to match the VGG16 input size
    image_resized = cv2.resize(image, (224, 224))

    # Convert BGR to RGB
    image_rgb = cv2.cvtColor(image_resized, cv2.COLOR_BGR2RGB)
    
    # Preprocess the image as required by VGG16
    # This typically includes scaling the pixel values to the range the network was originally trained with
    # For VGG16, the mean RGB values might need to be subtracted
    mean = np.array([123.68, 116.779, 103.939], dtype=np.float32)
    preprocessed_image = (image_rgb - mean)

    return preprocessed_image

ap = argparse.ArgumentParser()
ap.add_argument("-w", "--weights", default=None,
                help="path to the model weights")
required_ap = ap.add_argument_group('required arguments')
required_ap.add_argument("-m", "--model",
                         type=str, default="resnet", required=True,
                         help="name of pre-trained network to use")
args = vars(ap.parse_args())

# Map model names to classes
MODELS = ["resnet", "vgg16", "inception", "xception", "mobilenet"]

if args["model"] not in MODELS:
    raise AssertionError("The --model command line argument should be a key in the `MODELS` dictionary")

# Create pre-trained model + classification block, with or without pre-trained weights
my_model = create_model(model=args["model"], model_weights_path=args["weights"])

# Dictionary to convert numerical classes to alphabet
label_dict = {pos: letter for pos, letter in enumerate(string.ascii_uppercase)}

# Initialize variables to hold the current word and the last prediction time
# Initialize variables to hold the current word and the last prediction time
current_word = ""
last_prediction_time = time.time()
prediction_interval = 5.0  # Amount of time to wait before adding a letter to the word

# Variable to store the last seen prediction
last_seen_prediction = None

# ====================== Live loop ======================
# =======================================================

video_capture = cv2.VideoCapture(0)

fps = 0
start = time.time()

while True:
    # Capture frame-by-frame
    ret, frame = video_capture.read()
    if not ret:
        print("Failed to capture frame. Exiting...")
        break

    fps += 1

    # Draw rectangle around hand area
    x, y, w, h = 313, 82, 451, 568
    cv2.rectangle(frame, (x, y), (x + w, y + h), (255, 255, 0), 3)

    # Crop and process captured frame
    hand = frame[y:y+h, x:x+w]

    # Preprocess the image for VGG16
    hand = preprocess_for_vgg(hand)

    # Add a batch dimension to match the model's input shape
    hand = np.expand_dims(hand, axis=0)

    # Make the prediction
    my_predict = my_model.predict(hand, batch_size=1, verbose=0)

    # Predict letter if the probability is above a certain threshold
    if np.max(my_predict) >= 0.50:
        top_prd = np.argmax(my_predict)
        prediction_result = label_dict[top_prd]
        preds_list = np.argsort(my_predict)[0]
        pred_2 = label_dict[preds_list[-2]]
        pred_3 = label_dict[preds_list[-3]]
        last_seen_prediction = prediction_result

        width = int(video_capture.get(3) + 0.5)
        height = int(video_capture.get(4) + 0.5)

        # Annotate image with most probable prediction
        cv2.putText(frame, text=prediction_result,
                    org=(width // 2 + 230, height // 2 + 75),
                    fontFace=cv2.FONT_HERSHEY_SIMPLEX,
                    fontScale=17, color=(255, 255, 0),
                    thickness=15, lineType=cv2.LINE_AA)
        # Annotate image with second most probable prediction (displayed on bottom left)
        cv2.putText(frame, text=pred_2,
                    org=(width // 2 + width // 5 + 40, (360 + 240)),
                    fontFace=cv2.FONT_HERSHEY_PLAIN,
                    fontScale=6, color=(0, 0, 255),
                    thickness=6, lineType=cv2.LINE_AA)
        # Annotate image with third probable prediction (displayed on bottom right)
        cv2.putText(frame, text=pred_3,
                    org=(width // 2 + width // 3 + 5, (360 + 240)),
                    fontFace=cv2.FONT_HERSHEY_PLAIN,
                    fontScale=6, color=(0, 0, 255),
                    thickness=6, lineType=cv2.LINE_AA)

    # Add the last seen prediction to the current word every prediction_interval seconds
    current_time = time.time()
    if current_time - last_prediction_time >= prediction_interval and last_seen_prediction is not None:
        current_word += last_seen_prediction
        print(f"Added '{last_seen_prediction}' to current word: {current_word}")
        last_prediction_time = current_time
        last_seen_prediction = None  # Reset the last seen prediction

    # Display the resulting frame with the predictions
    cv2.imshow('Video', frame)

    # Press 'q' to exit live loop
    if cv2.waitKey(10) & 0xFF == ord('q'):
        if current_word:
            print("Final word: ", current_word)
        break

end = time.time()
FPS = fps / (end - start)
print("[INFO] approx. FPS: {:.2f}".format(FPS))
print("Formed Word: ", current_word.strip())

# Release the capture
video_capture.release()
cv2.destroyAllWindows()
