

from flask import Flask, request, jsonify
import pickle
import numpy as np

app = Flask(__name__)

# Load pre-trained model for crop health prediction
with open('model/crop_health_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

@app.route('/')
def home():
    return "AgriSense API is running."

@app.route('/predict_crop_health', methods=['POST'])
def predict_crop_health():
    data = request.get_json()
    soil_moisture = data['soil_moisture']
    temperature = data['temperature']
    humidity = data['humidity']
    # Predict crop health based on the sensor data
    features = np.array([[soil_moisture, temperature, humidity]])
    health_status = model.predict(features)
    return jsonify({'crop_health_status': health_status[0]})

@app.route('/recommend_actions', methods=['GET'])
def recommend_actions():
    # Placeholder for logic to provide recommendations
    actions = [
        "Water crops every 6 hours.",
        "Apply pesticide once in the next 3 days.",
        "Prepare for harvesting in 7 days."
    ]
    return jsonify({'recommendations': actions})

if __name__ == '__main__':
    app.run(debug=True)
