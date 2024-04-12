// Function to generate a random color
function getRandomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

// Function to generate a random point within the canvas
function getRandomPoint(canvasWidth, canvasHeight) {
    return {
        x: Math.floor(Math.random() * canvasWidth),
        y: Math.floor(Math.random() * canvasHeight)
    };
}

// Function to calculate the distance between two points
function distance(p1, p2) {
    return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}

// Function to find the nearest site for a given point
function findNearestSite(point, sites) {
    let minDistance = Infinity;
    let nearestSite = null;

    for (let site of sites) {
        const dist = distance(point, site);
        if (dist < minDistance) {
            minDistance = dist;
            nearestSite = site;
        }
    }

    return nearestSite;
}

// Function to generate Voronoi texture
function generateVoronoiTexture(canvas, numSites) {
    const ctx = canvas.getContext('2d');
    const sites = [];

    // Generate random sites
    for (let i = 0; i < numSites; i++) {
        sites.push(getRandomPoint(canvas.width, canvas.height));
    }

    // Loop through each pixel and color it based on the nearest site
    for (let x = 0; x < canvas.width; x++) {
        for (let y = 0; y < canvas.height; y++) {
            const nearestSite = findNearestSite({x, y}, sites);
            ctx.fillStyle = getRandomColor(); // Or use nearestSite color for non-animated version
            ctx.fillRect(x, y, 1, 1);
        }
    }

    // Optional: Add animation effects
    setInterval(() => {
        for (let i = 0; i < numSites; i++) {
            sites[i] = getRandomPoint(canvas.width, canvas.height);
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        generateVoronoiTexture(canvas, numSites);
    }, 2000); // Change animation speed here (milliseconds)
}

// Call the function to generate Voronoi texture
window.onload = function() {
    const canvas = document.getElementById('voronoiCanvas');
    generateVoronoiTexture(canvas, 10); // Change number of sites here
};
