// Define canvas and context
const canvas = document.getElementById('noiseCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size to match the window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Function to generate Perlin noise texture
function generateNoiseTexture() {
    // Create an ImageData object to manipulate pixel data
    const imageData = ctx.createImageData(canvas.width, canvas.height);
    const data = imageData.data;

    // Loop through each pixel and set its color based on Perlin noise
    for (let y = 0; y < canvas.height; y++) {
        for (let x = 0; x < canvas.width; x++) {
            // Calculate Perlin noise value
            const noiseValue = PerlinNoise(x / 100, y / 100);

            // Map noise value to color intensity (here, we're using an orange color)
            const colorValue = Math.floor(255 * noiseValue);
            data[(y * canvas.width + x) * 4] = colorValue;      // Red channel
            data[(y * canvas.width + x) * 4 + 1] = colorValue;  // Green channel
            data[(y * canvas.width + x) * 4 + 2] = 0;            // Blue channel
            data[(y * canvas.width + x) * 4 + 3] = 255;          // Alpha channel (fully opaque)
        }
    }

    // Put the modified pixel data back to the canvas
    ctx.putImageData(imageData, 0, 0);
}

// Function to animate the noise texture
function animateNoiseTexture() {
    // Clear the canvas before drawing the next frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Generate the noise texture
    generateNoiseTexture();

    // Request the next animation frame
    requestAnimationFrame(animateNoiseTexture);
}

// Call the animation function to start the animation
animateNoiseTexture();
