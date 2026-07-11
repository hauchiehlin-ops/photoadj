// Programmatically generate a beautiful neon space grid/gradient sample image for DevPixel calibration
const canvas = document.createElement('canvas');
canvas.width = 800;
canvas.height = 600;
const ctx = canvas.getContext('2d');

// 1. Draw space background
const grad = ctx.createRadialGradient(400, 300, 50, 400, 300, 500);
grad.addColorStop(0, '#111726');
grad.addColorStop(1, '#05070a');
ctx.fillStyle = grad;
ctx.fillRect(0, 0, 800, 600);

// 2. Draw glowing cybernetic sun (neon purple & cyan)
const sunGrad = ctx.createRadialGradient(400, 250, 10, 400, 250, 180);
sunGrad.addColorStop(0, 'rgba(213, 0, 249, 1)'); // neon purple
sunGrad.addColorStop(0.4, 'rgba(0, 229, 255, 0.8)'); // neon cyan
sunGrad.addColorStop(1, 'rgba(0, 229, 255, 0)');
ctx.fillStyle = sunGrad;
ctx.beginPath();
ctx.arc(400, 250, 180, 0, Math.PI * 2);
ctx.fill();

// 3. Draw grid lines (perspective simulation)
ctx.strokeStyle = 'rgba(0, 229, 255, 0.12)';
ctx.lineWidth = 1;
for (let i = 0; i <= 800; i += 40) {
  ctx.beginPath();
  ctx.moveTo(i, 0);
  ctx.lineTo(i, 600);
  ctx.stroke();
}
for (let i = 0; i <= 600; i += 40) {
  ctx.beginPath();
  ctx.moveTo(0, i);
  ctx.lineTo(800, i);
  ctx.stroke();
}

// 4. Draw high-tech HUD markings
ctx.strokeStyle = 'rgba(213, 0, 249, 0.5)';
ctx.lineWidth = 2;
ctx.strokeRect(120, 100, 560, 400);

// Crop target markings (crosshairs)
ctx.strokeStyle = 'rgba(0, 229, 255, 0.6)';
ctx.beginPath();
// Top left corner
ctx.moveTo(100, 100); ctx.lineTo(140, 100);
ctx.moveTo(100, 100); ctx.lineTo(100, 140);
// Top right corner
ctx.moveTo(700, 100); ctx.lineTo(660, 100);
ctx.moveTo(700, 100); ctx.lineTo(700, 140);
// Bottom left corner
ctx.moveTo(100, 500); ctx.lineTo(140, 500);
ctx.moveTo(100, 500); ctx.lineTo(100, 460);
// Bottom right corner
ctx.moveTo(700, 500); ctx.lineTo(660, 500);
ctx.moveTo(700, 500); ctx.lineTo(700, 460);
ctx.stroke();

// CMYK Calibration blocks
const blockColors = [
  '#00e5ff', // Cyan
  '#d500f9', // Magenta
  '#ffeb3b', // Yellow
  '#212121', // Black
];

blockColors.forEach((color, idx) => {
  ctx.fillStyle = color;
  ctx.fillRect(150 + idx * 45, 130, 35, 35);
  ctx.strokeStyle = 'rgba(255,255,255,0.2)';
  ctx.strokeRect(150 + idx * 45, 130, 35, 35);
});

// Text markings
ctx.fillStyle = 'rgba(0, 229, 255, 0.85)';
ctx.font = 'bold 12px "JetBrains Mono", Consolas, monospace';
ctx.fillText('DEVPIXEL CALIBRATION TARGET // RGB-D65', 150, 200);

ctx.fillStyle = 'rgba(213, 0, 249, 0.85)';
ctx.fillText('PRINTING CALIBRATION AREA // CMYK-300DPI', 150, 220);

ctx.strokeStyle = 'rgba(0, 230, 118, 0.5)';
ctx.beginPath();
ctx.arc(400, 250, 80, 0, Math.PI * 2);
ctx.stroke();

export const DEFAULT_SAMPLE_IMAGE = canvas.toDataURL('image/png');
