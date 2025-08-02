from flask import Flask, render_template, request, jsonify
import os
import cv2
import numpy as np
import easyocr
from werkzeug.utils import secure_filename
from api_lookup import get_vehicle_info

app = Flask(__name__) # to create falsk app instance
UPLOAD_FOLDER = 'static/uploads'# directory to store uploaded images
os.makedirs(UPLOAD_FOLDER, exist_ok=True)#ensure the upload folder exists
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER #set the upload folder in the app config
reader = easyocr.Reader(['en'])  # Initialize Easyocr reader for english language

@app.route('/')
def index():   #it renders the html template for the index page
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])  #route to handle image upload and analysis
def analyze():
    if 'image' not in request.files:    #check if the image part is in the request othw give error
        return jsonify({'error': 'No image part in the request'})

    file = request.files['image']# check if the file is present in the request
    if file.filename == '': #check if the filename is empty
        return jsonify({'error': 'No selected file'})

    filename = secure_filename(file.filename)#secure the filename to prevent directory traversal attacks
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)#save the file to the upload folder
    file.save(filepath)#save to the specified path

    try:
        image = cv2.imread(filepath) #read the image using opencv
        result = reader.readtext(image) #apply easyocr to read text from the image

        plate_text = ''# Initialize an empty string to store the detected plate text
        for (bbox, text, prob) in result: #iterate over the results which we had got from easyocr
            if 6 <= len(text) <= 12:    #check the length of the text
                plate_text = text.upper().replace(' ', '')#remove spaces and convert to uppercase
                break

        if plate_text == '':
            return jsonify({'error': 'No plate detected'})  #if no plate is detected

        vehicle_info = get_vehicle_info(plate_text) #calling API to get vehicle info using plate text

        return jsonify({
            'plate_number': plate_text,   #return details in json format
            'vehicle_info': vehicle_info
        })

    except Exception as e:
        return jsonify({'error': str(e)})# handle any exceptions that occur during processing

if __name__ == '__main__':
    app.run(debug=True)  # run the flask app in debug mode
