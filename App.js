                                                                                                          
import React, { useState } from "react";
import axios from "axios";

function App() {
  const [soilMoisture, setSoilMoisture] = useState("");
  const [temperature, setTemperature] = useState("");
  const [humidity, setHumidity] = useState("");
  const [cropHealth, setCropHealth] = useState("");
  const [actions, setActions] = useState([]);

  const handleSubmit = async () => {
    const response = await axios.post("http://localhost:5000/predict_crop_health", {
      soil_moisture: soilMoisture,
      temperature: temperature,
      humidity: humidity,
    });
    setCropHealth(response.data.crop_health_status);
  };

  const getActions = async () => {
    const response = await axios.get("http://localhost:5000/recommend_actions");
    setActions(response.data.recommendations);
  };

  return (
    <div>
      <h1>AgriSense: Smart Agriculture Platform</h1>
      <input type="number" onChange={(e) => setSoilMoisture(e.target.value)} placeholder="Soil Moisture" />
      <input type="number" onChange={(e) => setTemperature(e.target.value)} placeholder="Temperature" />
      <input type="number" onChange={(e) => setHumidity(e.target.value)} placeholder="Humidity" />
      
      <button onClick={handleSubmit}>Predict Crop Health</button>
      <p>Crop Health Status: {cropHealth}</p>

      <button onClick={getActions}>Get Recommendations</button>
      <ul>
        {actions.map((action, index) => (
          <li key={index}>{action}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
