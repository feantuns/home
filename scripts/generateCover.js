// generateCover.js
import fs from "fs";

// Utility to get a random dark color
function randomDarkColor() {
  const hue = Math.floor(Math.random() * 360);
  const saturation = Math.floor(Math.random() * 40) + 60; // 60–100%
  const lightness = Math.floor(Math.random() * 20) + 20; // 20–40%
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}

function generateCoverSVG(name) {
  const firstLetter = name.charAt(0).toUpperCase();

  // Two random dark colors for the gradient
  const color1 = randomDarkColor();
  const color2 = randomDarkColor();

  return `
<svg width="300" height="300" viewBox="0 0 300 300" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${color1}" />
      <stop offset="100%" stop-color="${color2}" />
    </linearGradient>
  </defs>
  <rect width="300" height="300" fill="url(#grad)" rx="20" />
  <text
    x="50%"
    y="53%"
    font-size="140"
    font-family="system-ui, sans-serif"
    font-weight="bold"
    fill="white"
    text-anchor="middle"
    dominant-baseline="middle">
    ${firstLetter}
  </text>
</svg>
  `.trim();
}

// Example usage
const projectName = process.argv[2] || "Project";
const svg = generateCoverSVG(projectName);
fs.writeFileSync(`../public/images/${projectName}.svg`, svg);
console.log(`✅ Cover for "${projectName}" saved as ${projectName}.svg`);
