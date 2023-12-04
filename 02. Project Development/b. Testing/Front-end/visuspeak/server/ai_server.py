# backend/server.py
from flask import Flask, request, jsonify
from model import create_model  
from processing import preprocess_for_vgg 
import numpy as np
import cv2
import base64
import string
import time
import argparse

app = Flask(__name__)

# Load your model here
my_model = create_model(model='vgg16', model_weights_path='./sign2text/weights/snapshot_vgg_weights.hdf5')

# Convert numerical classes to alphabet
label_dict = {pos: letter for pos, letter in enumerate(string.ascii_uppercase)}

@app.route('/predict', methods=['POST'])
def predict():
    data = request.json
    encoded_image = data['image']
    decoded_image = base64.b64decode(encoded_image)
    image = np.frombuffer(decoded_image, dtype=np.uint8)
    image = cv2.imdecode(image, flags=1)

    # Your preprocessing function
    image = preprocess_for_vgg(image)
    image = np.expand_dims(image, axis=0)  # Add batch dimension

    # Predict
    prediction = my_model.predict(image, batch_size=1, verbose=0)
    top_prd = np.argmax(prediction)

    # You could also return the confidence score and additional predictions if needed
    confidence = np.max(prediction)
    if confidence >= 0.50:
        result = label_dict[top_prd]
    else:
        result = "Uncertain"

    return jsonify({'prediction': result, 'confidence': confidence})

if __name__ == '__main__':
    app.run(host='localhost', port=9000, threaded=True, use_reloader=False, debug=True)
