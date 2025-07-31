 const express = require('express');
const multer = require('multer');
const path = require('path');
const { InferenceHTTPClient } = require('inference_sdk');

const app = express();
const port = process.env.PORT || 3001;

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Initialize Roboflow Inference Client
const CLIENT = new InferenceHTTPClient({
  api_url: "https://serverless.roboflow.com",
  api_key: "MeWMp6KcE15q3W4uvwg1"
});

// Endpoint to receive image and perform inference
app.post('/infer', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }

    // The image buffer can be sent directly if the SDK supports it,
    // otherwise save and send path or convert to base64 as needed.
    // Here assuming SDK can accept buffer or base64 string.

    // Convert buffer to base64 string
    const base64Image = req.file.buffer.toString('base64');

    // Call the inference API
    const result = await CLIENT.infer(base64Image, { model_id: "garbage_detection-wvzwv/9" });

    res.json({ success: true, result });
  } catch (error) {
    console.error('Inference error:', error);
    res.status(500).json({ error: 'Inference failed', details: error.message });
  }
});

// Basic route to check server status
app.get('/', (req, res) => {
  res.send('Backend server is running. Camera functionality should be tested on the frontend.');
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server listening on port ${port}`);
});

/*
Note on camera functionality:
- The backend does not directly handle camera access.
- Camera access and image capture should be handled on the frontend.
- The frontend should send captured images to this backend /infer endpoint.
- Ensure frontend camera permissions and capture logic are working properly.
*/
