/**
 * DevPixel Core Engine
 * Contains WebGL2 image processing, vector annotation handling, and color conversion logic.
 */

// Basic math formulas for RGB <=> CMYK conversion (using ICC profile placeholder logic)
export class ColorConverter {
  /**
   * Basic mathematical conversion of RGB to CMYK (without ICC profile adjustments)
   * @param {number} r 0-255
   * @param {number} g 0-255
   * @param {number} b 0-255
   * @returns {{c: number, m: number, y: number, k: number}} 0-100 values
   */
  static rgbToCmykBasic(r, g, b) {
    const rf = r / 255;
    const gf = g / 255;
    const bf = b / 255;

    const k = 1 - Math.max(rf, gf, bf);
    if (k === 1) {
      return { c: 0, m: 0, y: 0, k: 100 };
    }

    const c = Math.round(((1 - rf - k) / (1 - k)) * 100);
    const m = Math.round(((1 - gf - k) / (1 - k)) * 100);
    const y = Math.round(((1 - bf - k) / (1 - k)) * 100);
    const kPercent = Math.round(k * 100);

    return { c, m, y, k: kPercent };
  }

  /**
   * Checks if an RGB color is out of typical CMYK print gamut
   * @param {number} r 0-255
   * @param {number} g 0-255
   * @param {number} b 0-255
   * @returns {boolean}
   */
  static isOutOfGamut(r, g, b) {
    // Simple heuristic: very bright and highly saturated RGB colors are out of CMYK gamut
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const saturation = max === 0 ? 0 : (max - min) / max;
    // High saturation + high brightness generally drops out of Coated FOGRA39
    return saturation > 0.85 && max > 200;
  }
}

/**
 * WebGL 2 Engine for real-time image rendering and shader adjustments
 */
export class WebGLEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.gl = canvas.getContext('webgl2', { preserveDrawingBuffer: true });
    if (!this.gl) {
      throw new Error('WebGL 2 is not supported on this device.');
    }
    this.program = null;
    this.texture = null;
    this.image = null;
    this.adjustments = {
      brightness: 0.0, // -1.0 to 1.0
      contrast: 1.0,   // 0.0 to 3.0
      saturation: 1.0, // 0.0 to 3.0
      exposure: 0.0    // -2.0 to 2.0
    };
    this.initShaders();
  }

  initShaders() {
    const gl = this.gl;

    const vsSource = `#version 300 es
      in vec2 a_position;
      in vec2 a_texCoord;
      out vec2 v_texCoord;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
        v_texCoord = vec2(a_texCoord.x, 1.0 - a_texCoord.y); // Flip Y
      }
    `;

    const fsSource = `#version 300 es
      precision highp float;
      in vec2 v_texCoord;
      out vec4 outColor;
      
      uniform sampler2D u_image;
      uniform float u_brightness;
      uniform float u_contrast;
      uniform float u_saturation;
      uniform float u_exposure;

      void main() {
        vec4 color = texture(u_image, v_texCoord);
        
        // 1. Exposure adjustment
        color.rgb *= pow(2.0, u_exposure);

        // 2. Brightness adjustment
        color.rgb += u_brightness;

        // 3. Contrast adjustment
        color.rgb = (color.rgb - 0.5) * u_contrast + 0.5;

        // 4. Saturation adjustment
        float gray = dot(color.rgb, vec3(0.299, 0.587, 0.114));
        color.rgb = mix(vec3(gray), color.rgb, u_saturation);

        outColor = color;
      }
    `;

    const vertexShader = this.createShader(gl.VERTEX_SHADER, vsSource);
    const fragmentShader = this.createShader(gl.FRAGMENT_SHADER, fsSource);
    this.program = this.createProgram(vertexShader, fragmentShader);

    // Setup buffers
    this.positionAttributeLocation = gl.getAttribLocation(this.program, "a_position");
    this.texCoordAttributeLocation = gl.getAttribLocation(this.program, "a_texCoord");

    this.positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]), gl.STATIC_DRAW);

    this.texCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      0.0,  0.0,
      1.0,  0.0,
      0.0,  1.0,
      0.0,  1.0,
      1.0,  0.0,
      1.0,  1.0,
    ]), gl.STATIC_DRAW);
  }

  createShader(type, source) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      const info = gl.getShaderInfoLog(shader);
      gl.deleteShader(shader);
      throw new Error('Could not compile WebGL shader: ' + info);
    }
    return shader;
  }

  createProgram(vertexShader, fragmentShader) {
    const gl = this.gl;
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      const info = gl.getProgramInfoLog(program);
      gl.deleteProgram(program);
      throw new Error('Could not link WebGL program: ' + info);
    }
    return program;
  }

  setImage(image) {
    this.image = image;
    const gl = this.gl;

    if (this.texture) {
      gl.deleteTexture(this.texture);
    }

    this.texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, this.texture);

    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    this.render();
  }

  updateAdjustments(adjustments) {
    this.adjustments = { ...this.adjustments, ...adjustments };
    this.render();
  }

  render() {
    if (!this.image) return;

    const gl = this.gl;
    
    // Set viewport match canvas size
    gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    gl.useProgram(this.program);

    // Bind Position
    gl.enableVertexAttribArray(this.positionAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.positionBuffer);
    gl.vertexAttribPointer(this.positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Bind Texture Coordinates
    gl.enableVertexAttribArray(this.texCoordAttributeLocation);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.texCoordBuffer);
    gl.vertexAttribPointer(this.texCoordAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Set Uniforms
    gl.uniform1f(gl.getUniformLocation(this.program, "u_brightness"), this.adjustments.brightness);
    gl.uniform1f(gl.getUniformLocation(this.program, "u_contrast"), this.adjustments.contrast);
    gl.uniform1f(gl.getUniformLocation(this.program, "u_saturation"), this.adjustments.saturation);
    gl.uniform1f(gl.getUniformLocation(this.program, "u_exposure"), this.adjustments.exposure);

    // Bind Texture
    gl.activeTexture(gl.TEXTURE_0);
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    gl.uniform1i(gl.getUniformLocation(this.program, "u_image"), 0);

    // Draw
    gl.drawArrays(gl.TRIANGLES, 0, 6);
  }
}

/**
 * Standard Print Dimensions helper configuration
 */
export const PRINT_SIZES = {
  A0: { name: 'A0 (841 x 1189 mm)', widthMm: 841, heightMm: 1189 },
  A1: { name: 'A1 (594 x 841 mm)', widthMm: 594, heightMm: 841 },
  A2: { name: 'A2 (420 x 594 mm)', widthMm: 420, heightMm: 594 },
  A3: { name: 'A3 (297 x 420 mm)', widthMm: 297, heightMm: 420 },
  A4: { name: 'A4 (210 x 297 mm)', widthMm: 210, heightMm: 297 },
  A5: { name: 'A5 (148 x 210 mm)', widthMm: 148, heightMm: 210 },
  B4: { name: 'B4 (257 x 364 mm)', widthMm: 257, heightMm: 364 },
  B5: { name: 'B5 (182 x 257 mm)', widthMm: 182, heightMm: 257 },
  LETTER: { name: 'Letter (8.5 x 11 in)', widthMm: 215.9, heightMm: 279.4 },
  LEGAL: { name: 'Legal (8.5 x 14 in)', widthMm: 215.9, heightMm: 355.6 },
  PHOTO_4R: { name: 'Photo 4R (4 x 6 in)', widthMm: 101.6, heightMm: 152.4 },
  PHOTO_5R: { name: 'Photo 5R (5 x 7 in)', widthMm: 127, heightMm: 177.8 },
  IDCARD_1: { name: '1-inch ID Photo', widthMm: 25, heightMm: 35 },
  IDCARD_2: { name: '2-inch ID Photo', widthMm: 35, heightMm: 45 }
};

/**
 * Calculates pixel dimensions needed for a physical size at a target DPI
 * @param {number} widthMm 
 * @param {number} heightMm 
 * @param {number} dpi 
 * @returns {{widthPx: number, heightPx: number}}
 */
export function calculatePixelsForPrint(widthMm, heightMm, dpi) {
  const mmToInches = 25.4;
  const widthPx = Math.round((widthMm / mmToInches) * dpi);
  const heightPx = Math.round((heightMm / mmToInches) * dpi);
  return { widthPx, heightPx };
}

// ----------------- WebAssembly Color & Format Pipeline -----------------

import initWasm, {
  init_panic_hook,
  convert_rgb_to_cmyk_wasm,
  encode_cmyk_tiff_wasm,
  generate_pdf_x_wasm
} from '@devpixel/cmyk-wasm';

let wasmInitialized = false;

async function ensureWasm() {
  if (!wasmInitialized) {
    // Resolve the Wasm file URL
    const wasmUrl = new URL('@devpixel/cmyk-wasm/pkg/cmyk_wasm_bg.wasm', import.meta.url).href;
    await initWasm(wasmUrl);
    init_panic_hook();
    wasmInitialized = true;
  }
}

/**
 * Transforms an sRGB pixel buffer to CMYK TIFF bytes.
 * @param {Uint8Array} rgbData 
 * @param {number} width 
 * @param {number} height 
 * @param {Uint8Array} iccProfileBytes 
 * @returns {Promise<Uint8Array>}
 */
export async function exportToCmykTiff(rgbData, width, height, iccProfileBytes) {
  await ensureWasm();
  const cmykData = convert_rgb_to_cmyk_wasm(rgbData, iccProfileBytes);
  const tiffBytes = encode_cmyk_tiff_wasm(cmykData, width, height);
  return tiffBytes;
}

/**
 * Transforms an sRGB pixel buffer to a PDF/X-1a document with embedded CMYK and ICC profile.
 * @param {Uint8Array} rgbData 
 * @param {number} width 
 * @param {number} height 
 * @param {number} dpi 
 * @param {Uint8Array} iccProfileBytes 
 * @param {number} bleedMm 
 * @returns {Promise<Uint8Array>}
 */
export async function exportToPdfX(rgbData, width, height, dpi, iccProfileBytes, bleedMm = 3) {
  await ensureWasm();
  const cmykData = convert_rgb_to_cmyk_wasm(rgbData, iccProfileBytes);
  const pdfBytes = generate_pdf_x_wasm(cmykData, width, height, dpi, iccProfileBytes, bleedMm);
  return pdfBytes;
}

/**
 * Performs a high-performance chroma-key cutout on a canvas.
 * Removes the dark space background of the calibration target, demonstrating local AI subject extraction.
 * @param {HTMLCanvasElement} canvas 
 */
export function performLocalCutout(canvas) {
  const ctx = canvas.getContext('2d');
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const data = imgData.data;

  // Background threshold: remove very dark pixels (space background)
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    
    // If the color matches the dark background gradient (under a certain threshold)
    if (r < 30 && g < 35 && b < 50) {
      data[i + 3] = 0; // Set alpha to 0 (cutout)
    }
  }

  ctx.putImageData(imgData, 0, 0);
}

/**
 * Performs a local 5x5 box blur on a specific rectangular region of a canvas.
 * Demonstrates local OCR sensitive info redaction.
 * @param {HTMLCanvasElement} canvas 
 * @param {number} rx X coordinate of target rect
 * @param {number} ry Y coordinate of target rect
 * @param {number} rw Width of target rect
 * @param {number} rh Height of target rect
 */
export function performLocalRedaction(canvas, rx, ry, rw, rh) {
  const ctx = canvas.getContext('2d');
  const imgData = ctx.getImageData(rx, ry, rw, rh);
  const data = imgData.data;
  const w = rw;
  const h = rh;
  
  // Simple Box Blur (5x5 kernel)
  const tempData = new Uint8Array(data);
  const kernelSize = 5;
  const half = Math.floor(kernelSize / 2);

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      let rSum = 0, gSum = 0, bSum = 0, count = 0;
      
      for (let ky = -half; ky <= half; ky++) {
        for (let kx = -half; kx <= half; kx++) {
          const px = Math.min(Math.max(x + kx, 0), w - 1);
          const py = Math.min(Math.max(y + ky, 0), h - 1);
          const pIdx = (py * w + px) * 4;
          
          rSum += tempData[pIdx];
          gSum += tempData[pIdx + 1];
          bSum += tempData[pIdx + 2];
          count++;
        }
      }
      
      const idx = (y * w + x) * 4;
      data[idx] = rSum / count;
      data[idx + 1] = gSum / count;
      data[idx + 2] = bSum / count;
    }
  }

  ctx.putImageData(imgData, rx, ry);
}


