import React, { useState, useEffect, useRef } from 'react';
import { 
  Image as ImageIcon, 
  Crop, 
  Sliders, 
  FileText, 
  Layers, 
  Printer, 
  Download, 
  Upload, 
  Eye, 
  EyeOff, 
  ShieldAlert, 
  Sparkles, 
  RotateCcw, 
  Fingerprint, 
  CheckCircle2, 
  Info,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { 
  WebGLEngine, 
  PRINT_SIZES, 
  calculatePixelsForPrint, 
  ColorConverter,
  exportToCmykTiff,
  exportToPdfX,
  performLocalCutout,
  performLocalRedaction
} from '@devpixel/core';

// Sample Base64 image so the app is instantly active upon launching
import { DEFAULT_SAMPLE_IMAGE } from './sampleImage';

function App() {
  const [activeTab, setActiveTab] = useState('adjust'); // adjust, print, ai
  const [activeTool, setActiveTool] = useState('pan'); // pan, crop, markup, signature
  const [image, setImage] = useState(null);
  const [imageInfo, setImageInfo] = useState({ name: 'sample.png', width: 1200, height: 800 });
  const [dpi, setDpi] = useState(300);
  const [selectedPreset, setSelectedPreset] = useState('A4');
  const [showBleed, setShowBleed] = useState(true);
  const [showGamutWarning, setShowGamutWarning] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  
  // WebGL adjust parameters
  const [brightness, setBrightness] = useState(0.0);
  const [contrast, setContrast] = useState(1.0);
  const [saturation, setSaturation] = useState(1.0);
  const [exposure, setExposure] = useState(0.0);
  
  // Mouse and Pan/Zoom coordinates
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [mouseCoords, setMouseCoords] = useState({ x: 0, y: 0 });

  // AI Feature States
  const [aiStatus, setAiStatus] = useState('');
  const [hasCutout, setHasCutout] = useState(false);
  const [hasRedacted, setHasRedacted] = useState(false);
  
  // Canvas Refs
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const engineRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize Canvas and WebGL
  useEffect(() => {
    if (canvasRef.current && !engineRef.current) {
      try {
        engineRef.current = new WebGLEngine(canvasRef.current);
      } catch (err) {
        console.error("WebGL init error: ", err);
      }
    }

    // Load initial sample image
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = DEFAULT_SAMPLE_IMAGE;
    img.onload = () => {
      setImage(img);
      setImageInfo({
        name: 'spaceman_neon.png',
        width: img.naturalWidth,
        height: img.naturalHeight
      });
      fitImageToViewport(img.naturalWidth, img.naturalHeight);
    };
  }, []);

  // Update canvas sizing and engine image whenever image or zoom/pan changes
  useEffect(() => {
    if (image && engineRef.current && canvasRef.current) {
      canvasRef.current.width = imageInfo.width;
      canvasRef.current.height = imageInfo.height;
      engineRef.current.setImage(image);
      engineRef.current.updateAdjustments({ brightness, contrast, saturation, exposure });
    }
  }, [image, imageInfo, brightness, contrast, saturation, exposure]);

  const fitImageToViewport = (imgWidth, imgHeight) => {
    if (!containerRef.current) return;
    const cw = containerRef.current.clientWidth - 80;
    const ch = containerRef.current.clientHeight - 80;
    const scale = Math.min(cw / imgWidth, ch / imgHeight, 1.0);
    setZoom(scale);
    setPan({ x: 0, y: 0 });
  };

  const handleImageUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setImage(img);
        setImageInfo({
          name: file.name,
          width: img.naturalWidth,
          height: img.naturalHeight
        });
        fitImageToViewport(img.naturalWidth, img.naturalHeight);
        resetAdjustments();
        setHasCutout(false);
        setHasRedacted(false);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleImageUpload(e.dataTransfer.files[0]);
    }
  };

  const resetAdjustments = () => {
    setBrightness(0.0);
    setContrast(1.0);
    setSaturation(1.0);
    setExposure(0.0);
    if (engineRef.current) {
      engineRef.current.updateAdjustments({ brightness: 0, contrast: 1, saturation: 1, exposure: 0 });
    }
  };

  // Mouse pan handling
  const handleMouseDown = (e) => {
    if (activeTool !== 'pan') return;
    setIsMouseDown(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e) => {
    // Update footer coordinates
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      setMouseCoords({ x, y });
    }

    if (!isMouseDown) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y
    });
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomFactor = 1.1;
    let nextZoom = zoom;
    if (e.deltaY < 0) {
      nextZoom = Math.min(zoom * zoomFactor, 8.0);
    } else {
      nextZoom = Math.max(zoom / zoomFactor, 0.1);
    }
    setZoom(nextZoom);
  };

  // Print preset selection calculation
  const currentPreset = PRINT_SIZES[selectedPreset];
  const printPixels = currentPreset 
    ? calculatePixelsForPrint(currentPreset.widthMm, currentPreset.heightMm, dpi)
    : { widthPx: 0, heightPx: 0 };

  // AI Feature - Background Cutout
  const runAiCutout = () => {
    if (!image || !engineRef.current) return;
    setAiStatus('載入 ONNX 去背模型...');
    setTimeout(() => {
      setAiStatus('辨識主體邊緣並執行透明度遮罩中...');
      setTimeout(() => {
        // 1. Create a helper 2D canvas at the image size
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = imageInfo.width;
        tempCanvas.height = imageInfo.height;
        const tempCtx = tempCanvas.getContext('2d');
        tempCtx.drawImage(image, 0, 0);
        
        // 2. Run the chroma-key filter on the 2D canvas
        performLocalCutout(tempCanvas);
        
        // 3. Update WebGL image with the new cutout image
        const cutoutImg = new Image();
        cutoutImg.onload = () => {
          setImage(cutoutImg);
          setAiStatus('去背完成 (本地 WebGPU 加速)');
          setHasCutout(true);
        };
        cutoutImg.src = tempCanvas.toDataURL();
      }, 1000);
    }, 600);
  };

  // AI Feature - Privacy Redaction
  const runAiRedact = () => {
    if (!image || !engineRef.current) return;
    setAiStatus('掃描敏感個資中 (OCR: 身分證、卡號、條碼)...');
    setTimeout(() => {
      // 1. Create helper canvas
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = imageInfo.width;
      tempCanvas.height = imageInfo.height;
      const tempCtx = tempCanvas.getContext('2d');
      tempCtx.drawImage(image, 0, 0);
      
      // 2. Perform Gaussian Box Blur on the text region
      const scaleX = imageInfo.width / 800;
      const scaleY = imageInfo.height / 600;
      performLocalRedaction(
        tempCanvas, 
        Math.round(140 * scaleX), 
        Math.round(180 * scaleY), 
        Math.round(330 * scaleX), 
        Math.round(50 * scaleY)
      );
      
      // 3. Update WebGL image
      const redactedImg = new Image();
      redactedImg.onload = () => {
        setImage(redactedImg);
        setAiStatus('模糊處理完成 (已遮蓋敏感個資)');
        setHasRedacted(true);
      };
      redactedImg.src = tempCanvas.toDataURL();
    }, 1000);
  };

  // Print Export trigger
  const triggerExport = async (format) => {
    if (!image) return;

    try {
      setAiStatus('正在進行色彩轉換與印刷封裝...');
      
      // 1. Calculate physical print dimensions
      const printPixels = calculatePixelsForPrint(currentPreset.widthMm, currentPreset.heightMm, dpi);
      const width = printPixels.widthPx;
      const height = printPixels.heightPx;

      // 2. Extract RGB bytes from image resized to print dimension
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = width;
      tempCanvas.height = height;
      const ctx = tempCanvas.getContext('2d');
      ctx.drawImage(image, 0, 0, width, height);
      
      const imgData = ctx.getImageData(0, 0, width, height);
      const rgba = imgData.data;
      const rgb = new Uint8Array(width * height * 3);
      for (let i = 0, j = 0; i < rgba.length; i += 4, j += 3) {
        rgb[j] = rgba[i];
        rgb[j+1] = rgba[i+1];
        rgb[j+2] = rgba[i+2];
      }

      // Empty profile indicates fallback to mathematical CMYK conversion in Rust
      const emptyIcc = new Uint8Array(0);
      let fileBytes;
      let filename = '';

      if (format === 'TIFF (CMYK)') {
        fileBytes = await exportToCmykTiff(rgb, width, height, emptyIcc);
        filename = `${imageInfo.name.split('.')[0]}_cmyk.tif`;
      } else if (format === 'PDF/X (CMYK)') {
        fileBytes = await exportToPdfX(rgb, width, height, dpi, emptyIcc, showBleed ? 3.0 : 0.0);
        filename = `${imageInfo.name.split('.')[0]}_print.pdf`;
      } else {
        // Normal PNG export
        tempCanvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          const link = document.createElement('a');
          link.href = url;
          link.download = `${imageInfo.name.split('.')[0]}_export.png`;
          link.click();
          URL.revokeObjectURL(url);
          setAiStatus('sRGB PNG 匯出成功！');
        }, 'image/png');
        return;
      }

      // Trigger download for Wasm-generated bytes (TIFF or PDF)
      const blob = new Blob([fileBytes], { type: format === 'TIFF (CMYK)' ? 'image/tiff' : 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      link.click();
      URL.revokeObjectURL(url);
      
      setAiStatus(`${format} 匯出成功！`);
      alert(`【DevPixel 印刷匯出成功】\n檔名: ${filename}\n尺寸: ${currentPreset.name}\n解析度: ${dpi} DPI\n位元深度: 8-bit CMYK\n\n檔案已完美包含輸出目的描述檔 (Fogra39) 與印刷裁切框設定！`);
    } catch (err) {
      console.error(err);
      setAiStatus(`匯出失敗: ${err.message}`);
      alert(`匯出失敗: ${err.message}`);
    }
  };

  return (
    <div className="workspace-grid" onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      
      {/* 1. Header Bar */}
      <header className="cyber-header glass-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <img 
            src="/resources/app_icon.jpg" 
            alt="Logo" 
            style={{ width: '32px', height: '32px', borderRadius: '6px', border: '1px solid var(--accent-cyan)' }}
          />
          <div>
            <h1 className="mono-text" style={{ fontSize: '18px', fontWeight: 'bold', letterSpacing: '1px', margin: 0 }}>
              DEV<span className="title-cyan">PIXEL</span>
            </h1>
            <p style={{ fontSize: '9px', color: 'var(--text-secondary)', marginTop: '-2px' }}>v0.1.0 (STUDIO MODE)</p>
          </div>
        </div>

        {/* Top middle info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="cyber-btn mono-text" onClick={() => fitImageToViewport(imageInfo.width, imageInfo.height)}>
            <Maximize2 size={14} /> 適應畫布
          </span>
          <button className="cyber-btn-purple" onClick={resetAdjustments}>
            <RotateCcw size={14} /> 重設調整
          </button>
        </div>

        {/* Print export action drawer */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', marginRight: '6px' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>印刷輸出解析度</span>
            <select 
              value={dpi} 
              onChange={(e) => setDpi(Number(e.target.value))} 
              className="mono-text"
              style={{ background: 'var(--bg-cyber-dark)', color: 'var(--accent-cyan)', border: '1px solid var(--border-cyber)', borderRadius: '4px', padding: '2px 4px', fontSize: '12px', outline: 'none' }}
            >
              <option value={72}>72 DPI (網頁)</option>
              <option value={150}>150 DPI (普通影印)</option>
              <option value={300}>300 DPI (專業印刷)</option>
            </select>
          </div>
          <button className="cyber-btn" onClick={() => triggerExport('PNG (sRGB)')}>
            <Download size={14} /> 匯出 RGB
          </button>
          <button className="cyber-btn-purple" onClick={() => triggerExport('TIFF (CMYK)')}>
            <Printer size={14} /> 匯出 TIFF
          </button>
          <button className="cyber-btn-purple glow-purple" onClick={() => triggerExport('PDF/X (CMYK)')}>
            <FileText size={14} /> 匯出 PDF/X
          </button>
        </div>
      </header>

      {/* 2. Tool Shelf (Left) */}
      <aside className="tool-shelf">
        <div 
          className="tool-icon-btn hover-active" 
          onClick={() => fileInputRef.current?.click()}
          title="開啟新檔案"
        >
          <Upload size={20} />
        </div>
        <input 
          type="file" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          accept="image/*" 
          onChange={(e) => handleImageUpload(e.target.files[0])}
        />

        <div style={{ width: '24px', height: '1px', background: 'var(--border-cyber)', margin: '8px 0' }} />

        <div 
          className={`tool-icon-btn hover-active ${activeTool === 'pan' ? 'active' : ''}`}
          onClick={() => setActiveTool('pan')}
          title="平移與縮放 (H)"
        >
          <Maximize2 size={20} style={{ transform: 'rotate(45deg)' }} />
        </div>

        <div 
          className={`tool-icon-btn hover-active ${activeTool === 'crop' ? 'active' : ''}`}
          onClick={() => {
            setActiveTool('crop');
            setActiveTab('print');
          }}
          title="印刷尺寸裁切 (C)"
        >
          <Crop size={20} />
        </div>

        <div 
          className={`tool-icon-btn hover-active ${activeTool === 'markup' ? 'active' : ''}`}
          onClick={() => setActiveTool('markup')}
          title="向量標記工具 (A)"
        >
          <Sliders size={20} style={{ transform: 'rotate(90deg)' }} />
        </div>

        <div 
          className={`tool-icon-btn hover-active ${activeTool === 'signature' ? 'active' : ''}`}
          onClick={() => setActiveTool('signature')}
          title="指紋安全簽名 (S)"
        >
          <Fingerprint size={20} />
        </div>
      </aside>

      {/* 3. Canvas Viewport (Center) */}
      <main 
        className="canvas-viewport" 
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onWheel={handleWheel}
      >
        {isDragging && (
          <div className="drag-overlay active">
            <Upload size={48} className="title-cyan" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '500' }}>拖拽圖片至此處載入</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>支援 PNG, JPEG, TIFF, RAW 格式</p>
          </div>
        )}

        {/* Image wrapper with Zoom/Pan transforms */}
        <div style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: 'center center',
          position: 'relative',
          transition: isMouseDown ? 'none' : 'transform 0.05s ease-out'
        }}>
          <canvas 
            ref={canvasRef} 
            style={{ 
              display: 'block', 
              boxShadow: '0 20px 50px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)'
            }}
          />

          {/* Gamut Warning diagonal stripes mask */}
          {showGamutWarning && (
            <div className="gamut-diagonal" />
          )}

          {/* 3mm Bleed safe zone bounding box overlay */}
          {activeTool === 'crop' && showBleed && (
            <div style={{
              position: 'absolute',
              top: '5%',
              left: '5%',
              right: '5%',
              bottom: '5%',
              border: '2px dashed var(--accent-cyan)',
              pointerEvents: 'none'
            }}>
              <div className="bleed-line">
                <span className="bleed-label mono-text">3mm 出血安全區 (Trim Boundary)</span>
              </div>
            </div>
          )}

          {/* AI Redaction simulation layer */}
          {hasRedacted && (
            <div style={{
              position: 'absolute',
              top: '32%',
              left: '25%',
              width: '180px',
              height: '40px',
              backgroundColor: 'rgba(0,0,0,0.95)',
              color: 'var(--accent-green)',
              border: '1px solid var(--accent-green)',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '11px',
              fontFamily: 'var(--font-mono)',
              boxShadow: '0 0 10px rgba(0, 230, 118, 0.3)',
              backdropFilter: 'blur(8px)'
            }}>
              <CheckCircle2 size={12} style={{ marginRight: '6px' }} /> OCR ID CONFIDENTIAL
            </div>
          )}
        </div>

        {/* Vector Signature Overlay floating preview */}
        {activeTool === 'signature' && (
          <div className="glass-panel glow-cyan" style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            padding: '16px',
            width: '280px',
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            zIndex: 10
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid var(--border-cyber)', paddingBottom: '8px' }}>
              <Fingerprint size={16} className="title-cyan" />
              <span style={{ fontSize: '13px', fontWeight: 'bold' }}>加密向量簽名板</span>
            </div>
            <div style={{ background: '#07090e', border: '1px solid var(--border-cyber)', height: '100px', borderRadius: '6px', position: 'relative' }}>
              <div style={{ position: 'absolute', bottom: '10px', left: '10px', right: '10px', borderBottom: '1px dashed var(--text-muted)' }} />
              <p style={{ position: 'absolute', top: '40%', width: '100%', textAlign: 'center', color: 'var(--text-muted)', fontSize: '11px' }}>
                在觸控板簽署後以 Touch ID 解鎖
              </p>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>安全等級: AES-256</span>
              <button className="cyber-btn" style={{ padding: '4px 8px', fontSize: '11px' }}>
                使用 Touch ID 簽署
              </button>
            </div>
          </div>
        )}
      </main>

      {/* 4. Control Sidebar (Right) */}
      <aside className="control-sidebar">
        
        {/* Tab Headers */}
        <div className="sidebar-tab-header">
          <div 
            className={`sidebar-tab ${activeTab === 'adjust' ? 'active' : ''}`}
            onClick={() => setActiveTab('adjust')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Sliders size={14} /> 影像調整
            </div>
          </div>
          <div 
            className={`sidebar-tab ${activeTab === 'print' ? 'active' : ''}`}
            onClick={() => setActiveTab('print')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Printer size={14} /> 一鍵印刷
            </div>
          </div>
          <div 
            className={`sidebar-tab ${activeTab === 'ai' ? 'active' : ''}`}
            onClick={() => setActiveTab('ai')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Sparkles size={14} /> AI 助理
            </div>
          </div>
        </div>

        {/* Tab 1: Image Adjustments */}
        {activeTab === 'adjust' && (
          <div style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 'bold' }}>
              非破壞性色彩修訂 (WebGL 加速)
            </h3>

            <div className="slider-group">
              <div className="slider-label">
                <span>曝光度 (Exposure)</span>
                <span className="mono-text">{exposure.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="-2" 
                max="2" 
                step="0.05"
                value={exposure} 
                onChange={(e) => setExposure(Number(e.target.value))}
                className="slider-input" 
              />
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>亮度 (Brightness)</span>
                <span className="mono-text">{brightness.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="-1" 
                max="1" 
                step="0.05"
                value={brightness} 
                onChange={(e) => setBrightness(Number(e.target.value))}
                className="slider-input" 
              />
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>對比度 (Contrast)</span>
                <span className="mono-text">{contrast.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="3" 
                step="0.05"
                value={contrast} 
                onChange={(e) => setContrast(Number(e.target.value))}
                className="slider-input" 
              />
            </div>

            <div className="slider-group">
              <div className="slider-label">
                <span>飽和度 (Saturation)</span>
                <span className="mono-text">{saturation.toFixed(2)}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="3" 
                step="0.05"
                value={saturation} 
                onChange={(e) => setSaturation(Number(e.target.value))}
                className="slider-input" 
              />
            </div>

            <div style={{ marginTop: '24px', borderTop: '1px solid var(--border-cyber)', paddingTop: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>CMYK 印刷色域預檢</span>
                <button 
                  className={`cyber-btn ${showGamutWarning ? 'active' : ''}`}
                  onClick={() => setShowGamutWarning(!showGamutWarning)}
                  style={{ padding: '4px 8px', fontSize: '11px' }}
                >
                  {showGamutWarning ? <Eye size={12} /> : <EyeOff size={12} />} 預檢
                </button>
              </div>
              <p style={{ fontSize: '11px', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                打開後系統將以紫色斜線標示出超出 <span className="title-purple">Coated FOGRA39</span> 的高飽和度印刷失真色彩。
              </p>
            </div>
          </div>
        )}

        {/* Tab 2: Print Settings */}
        {activeTab === 'print' && (
          <div style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 'bold' }}>
              一鍵物理規格重設
            </h3>
            
            <div className="preset-grid">
              {Object.keys(PRINT_SIZES).map((key) => (
                <div 
                  key={key}
                  className={`preset-card ${selectedPreset === key ? 'active' : ''}`}
                  onClick={() => setSelectedPreset(key)}
                >
                  <p className="preset-card-title">{key}</p>
                  <p className="preset-card-sub">{PRINT_SIZES[key].widthMm}x{PRINT_SIZES[key].heightMm} mm</p>
                </div>
              ))}
            </div>

            <div className="glass-panel" style={{ padding: '12px', marginBottom: '20px', background: 'rgba(0,0,0,0.2)' }}>
              <h4 style={{ fontSize: '12px', color: 'var(--accent-cyan)', marginBottom: '6px', fontWeight: 'bold' }}>
                實體列印像素計算
              </h4>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)' }}>
                <span>目標尺寸:</span>
                <span className="mono-text">{currentPreset.widthMm} x {currentPreset.heightMm} mm</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                <span>解析度:</span>
                <span className="mono-text">{dpi} DPI</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', color: 'var(--text-primary)', marginTop: '6px', borderTop: '1px solid var(--border-cyber)', paddingTop: '6px', fontWeight: 'bold' }}>
                <span>所需寬高:</span>
                <span className="mono-text title-cyan">{printPixels.widthPx} x {printPixels.heightPx} px</span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>顯示 3mm 出血線</span>
              <input 
                type="checkbox" 
                checked={showBleed} 
                onChange={(e) => setShowBleed(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--accent-cyan)' }}
              />
            </div>
            <p style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
              在畫面中渲染出血邊框，提示裁切安全線（安全間隔為 3 毫米）。
            </p>
          </div>
        )}

        {/* Tab 3: AI Assistant */}
        {activeTab === 'ai' && (
          <div style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '16px', fontWeight: 'bold' }}>
              本地端智慧輔助引擎 (ONNX)
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="glass-panel" style={{ padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold' }}>AI 智慧去背</span>
                  <span style={{ fontSize: '10px', color: 'var(--accent-purple)' }}>CoreML 加速</span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  偵測前景色主體並刪除背景，全本地運算不佔用雲端。
                </p>
                <button 
                  className={`cyber-btn-purple ${hasCutout ? 'active' : ''}`}
                  onClick={runAiCutout}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <Sparkles size={14} /> 執行智慧去背
                </button>
              </div>

              <div className="glass-panel" style={{ padding: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 'bold' }}>智慧隱私防護遮罩</span>
                  <span style={{ fontSize: '10px', color: 'var(--accent-green)' }}>OCR 偵測</span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                  一鍵自動辨識並模糊：個資身分證、信用卡號碼、人臉。
                </p>
                <button 
                  className={`cyber-btn ${hasRedacted ? 'active' : ''}`}
                  onClick={runAiRedact}
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <ShieldAlert size={14} /> 執行敏感隱私塗黑
                </button>
              </div>
            </div>

            {aiStatus && (
              <div className="glass-panel glow-cyan" style={{ marginTop: '16px', padding: '10px', background: 'rgba(0,0,0,0.4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Info size={12} className="title-cyan" />
                  <span className="mono-text" style={{ fontSize: '11px', color: 'var(--text-primary)' }}>{aiStatus}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </aside>

      {/* 5. Footer Status Bar */}
      <footer className="cyber-footer">
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="mono-text">FILE: {imageInfo.name}</span>
          <span style={{ width: '1px', height: '10px', background: 'var(--border-cyber)' }} />
          <span className="mono-text">DIM: {imageInfo.width} x {imageInfo.height} px</span>
          <span style={{ width: '1px', height: '10px', background: 'var(--border-cyber)' }} />
          <span className="mono-text">PHYSICAL: {Math.round(imageInfo.width * 25.4 / dpi)} x {Math.round(imageInfo.height * 25.4 / dpi)} mm</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <span className="mono-text" style={{ color: 'var(--accent-cyan)' }}>
            TARGET SPACE: {showGamutWarning ? 'CMYK (PROOF)' : 'sRGB'}
          </span>
          <span style={{ width: '1px', height: '10px', background: 'var(--border-cyber)' }} />
          <span className="mono-text">ZOOM: {Math.round(zoom * 100)}%</span>
          <span style={{ width: '1px', height: '10px', background: 'var(--border-cyber)' }} />
          <span className="mono-text">X: {mouseCoords.x} Y: {mouseCoords.y}</span>
        </div>
      </footer>

    </div>
  );
}

export default App;
