import * as tf from '@tensorflow/tfjs';

class WasteDetectionService {
  constructor() {
    this.model = null;
    this.isModelLoaded = false;
    this.categories = ['plastic', 'organic', 'paper', 'metal', 'glass', 'e-waste'];
    this.confidenceThreshold = 0.6;
  }

  async loadModel() {
    try {
      // For now, we'll use a simple classification approach
      // In a real implementation, you would load a pre-trained model
      console.log('Loading waste detection model...');
      
      // Simulate model loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      this.isModelLoaded = true;
      console.log('Waste detection model loaded successfully');
      return true;
    } catch (error) {
      console.error('Error loading model:', error);
      return false;
    }
  }

  async classifyImage(imageBlob) {
    if (!this.isModelLoaded) {
      await this.loadModel();
    }

    try {
      // Convert blob to tensor
      const imageElement = await this.blobToImage(imageBlob);
      const tensor = tf.browser.fromPixels(imageElement);
      
      // Preprocess image
      const resized = tf.image.resizeBilinear(tensor, [224, 224]);
      const normalized = resized.div(255.0);
      const batched = normalized.expandDims(0);

      // For now, we'll use a simple heuristic-based classification
      // In a real implementation, this would use the loaded model
      const classification = await this.heuristicClassification(imageElement);
      
      // Cleanup tensors
      tensor.dispose();
      resized.dispose();
      normalized.dispose();
      batched.dispose();

      return classification;
    } catch (error) {
      console.error('Error classifying image:', error);
      throw error;
    }
  }

  async blobToImage(blob) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = URL.createObjectURL(blob);
    });
  }

  async heuristicClassification(imageElement) {
    // This is a simplified heuristic classification
    // In a real implementation, you would use a trained model
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simple color-based classification (for demonstration)
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = imageElement.width;
    canvas.height = imageElement.height;
    ctx.drawImage(imageElement, 0, 0);
    
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // Calculate average RGB values
    let r = 0, g = 0, b = 0;
    for (let i = 0; i < data.length; i += 4) {
      r += data[i];
      g += data[i + 1];
      b += data[i + 2];
    }
    const pixelCount = data.length / 4;
    r /= pixelCount;
    g /= pixelCount;
    b /= pixelCount;
    
    // Simple color-based classification rules
    let category = 'organic';
    let confidence = 0.7;
    
    if (r > 150 && g > 150 && b > 150) {
      // Light colors - likely paper or plastic
      if (r > g && r > b) {
        category = 'paper';
        confidence = 0.8;
      } else {
        category = 'plastic';
        confidence = 0.75;
      }
    } else if (r > 100 && g < 80 && b < 80) {
      // Reddish - likely organic
      category = 'organic';
      confidence = 0.85;
    } else if (r < 100 && g < 100 && b > 100) {
      // Bluish - likely glass or metal
      if (g > 80) {
        category = 'glass';
        confidence = 0.8;
      } else {
        category = 'metal';
        confidence = 0.75;
      }
    } else if (r < 80 && g < 80 && b < 80) {
      // Dark colors - likely e-waste
      category = 'e-waste';
      confidence = 0.7;
    }
    
    // Add some randomness to make it more realistic
    confidence += (Math.random() - 0.5) * 0.2;
    confidence = Math.max(0.3, Math.min(0.95, confidence));
    
    return {
      category,
      confidence,
      alternatives: this.getAlternativeCategories(category, confidence)
    };
  }

  getAlternativeCategories(primaryCategory, primaryConfidence) {
    const alternatives = this.categories
      .filter(cat => cat !== primaryCategory)
      .map(category => ({
        category,
        confidence: Math.random() * (1 - primaryConfidence) * 0.5
      }))
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 2);
    
    return alternatives;
  }

  async classifyWithCloudAPI(imageBlob) {
    // Alternative: Use a cloud API like Google Cloud Vision or Azure Computer Vision
    // This would be more accurate but requires API keys and internet connection
    
    try {
      // Example with a hypothetical API endpoint
      const formData = new FormData();
      formData.append('image', imageBlob);
      
      const response = await fetch('/api/waste-classification', {
        method: 'POST',
        body: formData
      });
      
      if (!response.ok) {
        throw new Error('API request failed');
      }
      
      return await response.json();
    } catch (error) {
      console.error('Cloud API classification failed:', error);
      // Fallback to local classification
      return await this.classifyImage(imageBlob);
    }
  }

  getCategoryInfo(category) {
    const categoryInfo = {
      plastic: {
        name: 'Plastic',
        color: '#3b82f6',
        icon: '🔄',
        description: 'Recyclable plastic materials',
        disposalTip: 'Rinse and crush before recycling. Check local recycling guidelines.',
        ecoScore: 5
      },
      organic: {
        name: 'Organic',
        color: '#22c55e',
        icon: '🍃',
        description: 'Biodegradable organic waste',
        disposalTip: 'Compost if possible, or dispose in organic waste bin.',
        ecoScore: 8
      },
      paper: {
        name: 'Paper',
        color: '#f59e0b',
        icon: '📄',
        description: 'Paper and cardboard materials',
        disposalTip: 'Keep dry and clean. Flatten cardboard boxes before recycling.',
        ecoScore: 7
      },
      metal: {
        name: 'Metal',
        color: '#6b7280',
        icon: '🔩',
        description: 'Metal containers and materials',
        disposalTip: 'Rinse thoroughly. Aluminum and steel are highly recyclable.',
        ecoScore: 9
      },
      glass: {
        name: 'Glass',
        color: '#8b5cf6',
        icon: '🥃',
        description: 'Glass bottles and containers',
        disposalTip: 'Rinse and remove caps. Glass is 100% recyclable.',
        ecoScore: 9
      },
      'e-waste': {
        name: 'E-Waste',
        color: '#ef4444',
        icon: '💻',
        description: 'Electronic waste and devices',
        disposalTip: 'Take to designated e-waste collection centers. Never throw in regular trash.',
        ecoScore: 3
      }
    };

    return categoryInfo[category] || categoryInfo.organic;
  }
}

// Create singleton instance
const wasteDetectionService = new WasteDetectionService();

export default wasteDetectionService;
