# Digital Ocean 

## Objective
The objective for this model is to  use computer vision to build an American Sign Language translator for webcam.

## Dependencies 
Prepare system package manager and install the Python3 virtualenv package
```
apt-get update
apt-get upgrade
apt-get install python3-venv
```
Configure the environment using the following commands:
```
mkdir ~/SignLanguage
cd ~/SignLanguage
python3 -m venv signlanguage
source signlanguage/bin/activate
```
Installing pytorch for macOS:
```
python -m pip install torch==1.2.0 torchvision==0.4.0
```
Installing pytorch for Linux/Windows :
```
pip install torch==1.2.0+cpu torchvision==0.4.0+cpu -f https://download.pytorch.org/whl/torch_stable.html
pip install torchvision
```
Install prepackaged binaries for OpenCV, numpy, and onnx:
```
python -m pip install opencv-python==3.4.3.18 numpy==1.14.5 onnx==1.6.0 onnxruntime==1.0.0
apt-get install libsm6 libxext6 libxrender-dev
```

## Reference
We followed a tutorial from Digital Ocean. Please find the link to the tutotial [here](https://www.digitalocean.com/community/tutorials/how-to-build-a-neural-network-to-translate-sign-language-into-english) to follow along for the reamining steps.
