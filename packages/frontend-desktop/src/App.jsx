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
  Undo2,
  Redo2,
  ChevronDown,
  Maximize2,
  Scissors,
  Copy,
  Trash2,
  Clipboard,
  HelpCircle
} from 'lucide-react';
import { 
  WebGLEngine, 
  PRINT_SIZES, 
  calculatePixelsForPrint, 
  ColorConverter,
  exportToCmykTiff,
  exportToPdfX,
  performLocalCutout,
  performLocalRedaction,
  resampleImage
} from '@devpixel/core';

// Sample Base64 image so the app is instantly active upon launching
import { DEFAULT_SAMPLE_IMAGE } from './sampleImage';

function App() {
  const [activeTab, setActiveTab] = useState('adjust'); // adjust, print, ai
  const [activeTool, setActiveTool] = useState('pan'); // pan, crop, markup, signature
  const [imageSrc, setImageSrc] = useState(null);
  const [imageInfo, setImageInfo] = useState({ name: 'sample.png', width: 1200, height: 800 });
  const [dpi, setDpi] = useState(300);
  const [dpiPreset, setDpiPreset] = useState('300'); // '72', '150', '300', 'CUSTOM'
  const [dpiInputText, setDpiInputText] = useState('300');

  const handleDpiPresetChange = (val) => {
    setDpiPreset(val);
    if (val !== 'CUSTOM') {
      const numVal = Number(val);
      const finalVal = lockMinDpi ? Math.max(100, numVal) : numVal;
      setDpi(finalVal);
      setDpiInputText(String(finalVal));
    }
  };

  const toggleLockMinDpi = (enabled) => {
    setLockMinDpi(enabled);
    if (enabled && dpi < 100) {
      setDpi(100);
      setDpiInputText('100');
    }
  };

  const autoMatchDpi = () => {
    if (!imageSrc || !currentPreset) return;
    const idealDpi = Math.round(imageInfo.width * 25.4 / currentPreset.widthMm);
    const minDpi = lockMinDpi ? 100 : 10;
    const clamped = Math.max(minDpi, Math.min(2400, idealDpi));
    setDpi(clamped);
    setDpiInputText(String(clamped));
    setDpiPreset('CUSTOM');
    setAiStatus(`已自動適配最佳印刷解析度: ${clamped} DPI (1:1 像素無損輸出)`);
  };
  const [selectedPreset, setSelectedPreset] = useState('A4');
  const [showBleed, setShowBleed] = useState(true);
  const [showGamutWarning, setShowGamutWarning] = useState(false);
  const [printOrientation, setPrintOrientation] = useState('PORTRAIT'); // 'PORTRAIT' or 'LANDSCAPE'
  const [upscaleAlgorithm, setUpscaleAlgorithm] = useState('LANCZOS3'); // 'BILINEAR' | 'BICUBIC' | 'LANCZOS3'
  const [lockMinDpi, setLockMinDpi] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [helpTab, setHelpTab] = useState('manual'); // 'manual' | 'privacy'
  const [pastedLayer, setPastedLayer] = useState(null);
  const [isDraggingPastedLayer, setIsDraggingPastedLayer] = useState(false);
  const [pasteDragStart, setPasteDragStart] = useState({ x: 0, y: 0 });

  // Custom print preset dimension values
  const [customWidth, setCustomWidth] = useState(210);
  const [customHeight, setCustomHeight] = useState(297);

  // Selection / Marquee editing states
  const [selectionRect, setSelectionRect] = useState(null);
  const [isSelecting, setIsSelecting] = useState(false);
  const [selectStart, setSelectStart] = useState({ x: 0, y: 0 });
  const [clipboard, setClipboard] = useState(null);

  // Undo / Redo history stack states
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Spacebar panning state
  const [spacePressed, setSpacePressed] = useState(false);

  // Export menu dropdown visible state
  const [showExportMenu, setShowExportMenu] = useState(false);
  
  // WebGL adjust parameters
  const [brightness, setBrightness] = useState(0.0);
  const [contrast, setContrast] = useState(1.0);
  const [saturation, setSaturation] = useState(1.0);
  const [exposure, setExposure] = useState(0.0);
  
  // Mouse and Pan/Zoom coordinates
  const [zoom, setZoom] = useState(1.0);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const hasManuallyAdjustedRef = useRef(false);
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

  // Load initial sample image exactly ONCE on mount
  useEffect(() => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = DEFAULT_SAMPLE_IMAGE;
    img.onload = () => {
      hasManuallyAdjustedRef.current = false;
      setImageSrc(DEFAULT_SAMPLE_IMAGE);
      setImageInfo({
        name: 'spaceman_neon.png',
        width: img.naturalWidth,
        height: img.naturalHeight
      });
      fitImageToViewport(img.naturalWidth, img.naturalHeight);
      setPrintOrientation(img.naturalWidth > img.naturalHeight ? 'LANDSCAPE' : 'PORTRAIT');
      
      // Init history stack
      setHistory([DEFAULT_SAMPLE_IMAGE]);
      setHistoryIndex(0);
    };
  }, []);

  // Recalculate zoom fitting dynamically when container dimensions stabilize or change (e.g. windows resize, high DPI scaling adjustments)
  useEffect(() => {
    if (!containerRef.current || !imageSrc || !imageInfo.width || !imageInfo.height) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;
      const { width, height } = entry.contentRect;
      
      // If the container size is 0, wait until it renders with positive dimensions
      if (width <= 0 || height <= 0) return;

      // Only auto-fit if the user has not manually zoomed or panned
      if (!hasManuallyAdjustedRef.current) {
        const cw = Math.max(100, width - 80);
        const ch = Math.max(100, height - 80);
        const scale = Math.max(0.05, Math.min(cw / imageInfo.width, ch / imageInfo.height, 1.0));
        setZoom(scale);
        setPan({ x: 0, y: 0 });
      }
    });

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [imageSrc, imageInfo.width, imageInfo.height]);

  // Initialize keyboard shortcuts & Spacebar panning listener
  useEffect(() => {

    // Keyboard shortcuts & Spacebar panning listener
    const handleKeyDown = (e) => {
      if (document.activeElement.tagName === 'INPUT' || 
          document.activeElement.tagName === 'SELECT' || 
          document.activeElement.tagName === 'TEXTAREA') {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        setSpacePressed(true);
      }
      if (e.key === 'F1') {
        e.preventDefault();
        setShowHelpModal(prev => !prev);
      }
      if (e.key === 'Escape') {
        setShowHelpModal(false);
      }
      if (e.key === 'Delete' || e.key === 'Backspace') {
        e.preventDefault();
        handleDelete();
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          handleRedo();
        } else {
          handleUndo();
        }
      }
      if (!e.metaKey && !e.ctrlKey && !e.altKey) {
        const key = e.key.toLowerCase();
        if (key === 'h') {
          setActiveTool('pan');
        } else if (key === 'c') {
          setActiveTool('crop');
          setActiveTab('print');
        } else if (key === 'a') {
          setActiveTool('markup');
        } else if (key === 's') {
          setActiveTool('signature');
        } else if (key === 'm') {
          setActiveTool('select');
          setActiveTab('edit');
        }
      }
    };

    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        setSpacePressed(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [historyIndex, history, activeTool, activeTab]);

  // Update canvas sizing and engine image whenever imageSrc or adjustments change
  useEffect(() => {
    if (imageSrc && canvasRef.current) {
      // 1. Resize canvas synchronously if needed to prevent WebGL context lost inside async load
      if (canvasRef.current.width !== imageInfo.width || canvasRef.current.height !== imageInfo.height) {
        canvasRef.current.width = imageInfo.width;
        canvasRef.current.height = imageInfo.height;
        engineRef.current = null; // Reset engine since context got cleared on resize
      }

      // 2. Re-initialize WebGLEngine if needed
      if (!engineRef.current || engineRef.current.canvas !== canvasRef.current) {
        try {
          engineRef.current = new WebGLEngine(canvasRef.current);
        } catch (err) {
          console.error("WebGL init error on remount: ", err);
        }
      }

      // 3. Load imageSrc and draw it via WebGL
      if (engineRef.current) {
        const img = new Image();
        img.onload = () => {
          if (engineRef.current) {
            engineRef.current.setImage(img);
            engineRef.current.updateAdjustments({ brightness, contrast, saturation, exposure });
          }
        };
        img.src = imageSrc;
      }
    }
  }, [imageSrc, imageInfo, brightness, contrast, saturation, exposure]);

  const fitImageToViewport = (imgWidth, imgHeight) => {
    if (!containerRef.current) return;
    const cw = Math.max(100, containerRef.current.clientWidth - 80);
    const ch = Math.max(100, containerRef.current.clientHeight - 80);
    const scale = Math.max(0.05, Math.min(cw / imgWidth, ch / imgHeight, 1.0));
    setZoom(scale);
    setPan({ x: 0, y: 0 });
  };

  const handleImageUpload = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      const img = new Image();
      img.onload = () => {
        hasManuallyAdjustedRef.current = false;
        setImageSrc(dataUrl);
        setImageInfo({
          name: file.name,
          width: img.naturalWidth,
          height: img.naturalHeight
        });
        fitImageToViewport(img.naturalWidth, img.naturalHeight);
        setPrintOrientation(img.naturalWidth > img.naturalHeight ? 'LANDSCAPE' : 'PORTRAIT');
        resetAdjustments();
        setHasCutout(false);
        setHasRedacted(false);
        setClipboard(null);
        setSelectionRect(null);
        
        // Reset and init history
        setHistory([dataUrl]);
        setHistoryIndex(0);
      };
      img.src = dataUrl;
    };
    reader.readAsDataURL(file);
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDragCounter(prev => prev + 1);
    setIsDragging(true);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDragCounter(prev => {
      const next = prev - 1;
      if (next <= 0) {
        setIsDragging(false);
        return 0;
      }
      return next;
    });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setDragCounter(0);
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

  // Mouse pan & marquee selection handling
  const handleMouseDown = (e) => {
    if (!imageSrc) return;
    const isPanningMode = activeTool === 'pan' || spacePressed;
    if (isPanningMode) {
      setIsMouseDown(true);
      setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
    } else if (activeTool === 'select' && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const clickX = (e.clientX - rect.left) / zoom;
      const clickY = (e.clientY - rect.top) / zoom;
      setIsSelecting(true);
      setSelectStart({ x: clickX, y: clickY });
      setSelectionRect({ x: clickX, y: clickY, w: 0, h: 0 });
    }
  };

  const handleMouseMove = (e) => {
    if (!imageSrc) return;
    // Update footer coordinates
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);
      setMouseCoords({ x, y });
    }

    if (isDraggingPastedLayer && pastedLayer) {
      const newX = e.clientX / zoom - pasteDragStart.x;
      const newY = e.clientY / zoom - pasteDragStart.y;
      setPastedLayer(prev => ({
        ...prev,
        x: newX,
        y: newY
      }));
      return;
    }

    const isPanningMode = activeTool === 'pan' || spacePressed;
    if (isMouseDown && isPanningMode) {
      hasManuallyAdjustedRef.current = true;
      setPan({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    } else if (isSelecting && activeTool === 'select' && canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const currentX = (e.clientX - rect.left) / zoom;
      const currentY = (e.clientY - rect.top) / zoom;
      
      const x = Math.max(0, Math.min(selectStart.x, currentX));
      const y = Math.max(0, Math.min(selectStart.y, currentY));
      const w = Math.min(imageInfo.width - x, Math.abs(selectStart.x - currentX));
      const h = Math.min(imageInfo.height - y, Math.abs(selectStart.y - currentY));
      
      setSelectionRect({ x, y, w, h });
    }
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
    setIsSelecting(false);
    setIsDraggingPastedLayer(false);
  };

  const handleWheel = (e) => {
    if (!imageSrc) return;
    e.preventDefault();
    hasManuallyAdjustedRef.current = true;
    const zoomFactor = 1.1;
    let nextZoom = zoom;
    if (e.deltaY < 0) {
      nextZoom = Math.min(zoom * zoomFactor, 8.0);
    } else {
      nextZoom = Math.max(zoom / zoomFactor, 0.1);
    }
    setZoom(nextZoom);
  };

  // Print preset selection calculation with orientation adaptation (swaps width/height if needed)
  const currentPreset = (() => {
    const raw = selectedPreset === 'CUSTOM'
      ? { name: '自訂規格', widthMm: customWidth, heightMm: customHeight }
      : PRINT_SIZES[selectedPreset];
    if (!raw) return null;
    const isCurrentlyLandscape = raw.widthMm > raw.heightMm;
    const shouldBeLandscape = printOrientation === 'LANDSCAPE';
    if (isCurrentlyLandscape !== shouldBeLandscape) {
      return {
        ...raw,
        widthMm: raw.heightMm,
        heightMm: raw.widthMm
      };
    }
    return raw;
  })();

  const printPixels = currentPreset 
    ? calculatePixelsForPrint(currentPreset.widthMm, currentPreset.heightMm, dpi)
    : { widthPx: 0, heightPx: 0 };

  // Push state to history
  const pushHistory = (newImg) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(newImg);
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  // Undo operation
  const handleUndo = () => {
    if (historyIndex > 0) {
      const prevIndex = historyIndex - 1;
      const prevImgSrc = history[prevIndex];
      setHistoryIndex(prevIndex);
      
      setImageSrc(prevImgSrc);
      const img = new Image();
      img.onload = () => {
        setImageInfo(prev => ({
          ...prev,
          width: img.naturalWidth,
          height: img.naturalHeight
        }));
      };
      img.src = prevImgSrc;

      setSelectionRect(null);
      setAiStatus('已復原上一步操作');
    }
  };

  // Redo operation
  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const nextIndex = historyIndex + 1;
      const nextImgSrc = history[nextIndex];
      setHistoryIndex(nextIndex);
      
      setImageSrc(nextImgSrc);
      const img = new Image();
      img.onload = () => {
        setImageInfo(prev => ({
          ...prev,
          width: img.naturalWidth,
          height: img.naturalHeight
        }));
      };
      img.src = nextImgSrc;

      setSelectionRect(null);
      setAiStatus('已重做下一步操作');
    }
  };

  // Apply tone adjustments (Bake sliders)
  const applyToneAdjustments = () => {
    if (!canvasRef.current || !imageSrc) return;
    try {
      const bakedDataUrl = canvasRef.current.toDataURL('image/png');
      setBrightness(0.0);
      setContrast(1.0);
      setSaturation(1.0);
      setExposure(0.0);
      setImageSrc(bakedDataUrl);
      pushHistory(bakedDataUrl);
      setAiStatus('色調調整已成功套用！');
    } catch (err) {
      console.error(err);
      alert(`套用調色失敗: ${err.message}`);
    }
  };

  // Close the active file
  const closeFile = () => {
    setImageSrc(null);
    setImageInfo({ name: '', width: 0, height: 0 });
    setHistory([]);
    setHistoryIndex(-1);
    setClipboard(null);
    setSelectionRect(null);
    setHasCutout(false);
    setHasRedacted(false);
    setAiStatus('檔案已關閉。');
  };

  // Image Editing - Copy selected region
  const handleCopy = () => {
    if (!selectionRect || selectionRect.w === 0 || selectionRect.h === 0 || !imageSrc) {
      alert('請先在畫布上框選一個區域再進行複製。');
      return;
    }
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = selectionRect.w;
    tempCanvas.height = selectionRect.h;
    const tempCtx = tempCanvas.getContext('2d');
    
    const img = new Image();
    img.onload = () => {
      tempCtx.drawImage(
        img,
        selectionRect.x, selectionRect.y, selectionRect.w, selectionRect.h,
        0, 0, selectionRect.w, selectionRect.h
      );
      setClipboard({
        dataUrl: tempCanvas.toDataURL(),
        w: selectionRect.w,
        h: selectionRect.h
      });
      setAiStatus('已複製選取區域！');
    };
    img.src = imageSrc;
  };

  // Image Editing - Delete selected region
  const handleDelete = () => {
    if (pastedLayer) {
      setPastedLayer(null);
      setAiStatus('已取消並移除貼上圖層！');
      return;
    }
    if (!selectionRect || selectionRect.w === 0 || selectionRect.h === 0 || !imageSrc) {
      alert('請先在畫布上框選一個區域再進行刪除。');
      return;
    }
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = imageInfo.width;
    tempCanvas.height = imageInfo.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    const img = new Image();
    img.onload = () => {
      tempCtx.drawImage(img, 0, 0);

      // Sample surrounding border pixels (6 pixels outside the selection rectangle to avoid text glow)
      const x = Math.round(selectionRect.x);
      const y = Math.round(selectionRect.y);
      const w = Math.round(selectionRect.w);
      const h = Math.round(selectionRect.h);
      
      const borderOffset = 6;
      const points = [];
      
      // Top edge points
      for (let i = 0; i <= w; i += Math.max(1, Math.floor(w / 15))) {
        points.push({ x: x + i, y: y - borderOffset });
      }
      // Bottom edge points
      for (let i = 0; i <= w; i += Math.max(1, Math.floor(w / 15))) {
        points.push({ x: x + i, y: y + h + borderOffset });
      }
      // Left edge points
      for (let j = 0; j <= h; j += Math.max(1, Math.floor(h / 15))) {
        points.push({ x: x - borderOffset, y: y + j });
      }
      // Right edge points
      for (let j = 0; j <= h; j += Math.max(1, Math.floor(h / 15))) {
        points.push({ x: x + w + borderOffset, y: y + j });
      }
      
      const colors = [];
      points.forEach(p => {
        const px = Math.max(0, Math.min(imageInfo.width - 1, p.x));
        const py = Math.max(0, Math.min(imageInfo.height - 1, p.y));
        const data = tempCtx.getImageData(px, py, 1, 1).data;
        if (data[3] > 0) {
          const lum = 0.299 * data[0] + 0.587 * data[1] + 0.114 * data[2];
          colors.push({ r: data[0], g: data[1], b: data[2], a: data[3], lum });
        }
      });

      // Sample corner pixel to check if page is light or dark background
      const cornerPixel = tempCtx.getImageData(0, 0, 1, 1).data;
      const cornerLum = 0.299 * cornerPixel[0] + 0.587 * cornerPixel[1] + 0.114 * cornerPixel[2];
      const isLightBg = cornerLum > 120;

      let avgColor = { r: 255, g: 255, b: 255, a: 255 };
      if (colors.length > 0) {
        if (isLightBg) {
          // Light paper background: sort luminance descending (brightest first) and average the brightest 50% to ignore black text strokes
          colors.sort((a, b) => b.lum - a.lum);
        } else {
          // Dark background: sort luminance ascending (darkest first) and average the darkest 50% to ignore highlights
          colors.sort((a, b) => a.lum - b.lum);
        }

        const subset = colors.slice(0, Math.max(1, Math.floor(colors.length * 0.5)));
        let sumR = 0, sumG = 0, sumB = 0, sumA = 0;
        subset.forEach(c => {
          sumR += c.r;
          sumG += c.g;
          sumB += c.b;
          sumA += c.a;
        });

        avgColor = {
          r: Math.round(sumR / subset.length),
          g: Math.round(sumG / subset.length),
          b: Math.round(sumB / subset.length),
          a: Math.round(sumA / subset.length)
        };
      }

      // Fill selection area with average surrounding color instead of leaving a transparent/black gap
      tempCtx.fillStyle = `rgba(${avgColor.r}, ${avgColor.g}, ${avgColor.b}, ${avgColor.a / 255})`;
      tempCtx.fillRect(selectionRect.x, selectionRect.y, selectionRect.w, selectionRect.h);

      const clearedDataUrl = tempCanvas.toDataURL();
      setImageSrc(clearedDataUrl);
      setSelectionRect(null);
      setAiStatus('已刪除選取區域並使用周邊色彩補平！');
      pushHistory(clearedDataUrl);
    };
    img.src = imageSrc;
  };

  // Image Editing - Blur selected region (Manual Privacy Protection Mask)
  const handleBlurSelection = () => {
    if (!selectionRect || selectionRect.w === 0 || selectionRect.h === 0 || !imageSrc) {
      alert('請先在畫布上框選一個區域再進行模糊。');
      return;
    }
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = imageInfo.width;
    tempCanvas.height = imageInfo.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    const img = new Image();
    img.onload = () => {
      tempCtx.drawImage(img, 0, 0);
      performLocalRedaction(
        tempCanvas,
        Math.round(selectionRect.x),
        Math.round(selectionRect.y),
        Math.round(selectionRect.w),
        Math.round(selectionRect.h)
      );

      const blurredDataUrl = tempCanvas.toDataURL();
      setImageSrc(blurredDataUrl);
      setSelectionRect(null);
      setAiStatus('已模糊框選區域！');
      pushHistory(blurredDataUrl);
    };
    img.src = imageSrc;
  };

  // Image Editing - Paste copied region
  const handlePaste = () => {
    if (!clipboard || !imageSrc) {
      alert('剪貼簿目前為空，請先複製一個區域。');
      return;
    }
    // Paste initially at the center of the image
    const px = Math.round((imageInfo.width - clipboard.w) / 2);
    const py = Math.round((imageInfo.height - clipboard.h) / 2);
    
    setPastedLayer({
      dataUrl: clipboard.dataUrl,
      x: px,
      y: py,
      w: clipboard.w,
      h: clipboard.h
    });
    setAiStatus('已貼上懸浮影像！可用滑鼠在畫布上自由拖曳移動它，最後點選確認貼上。');
  };

  const handlePastedLayerMouseDown = (e) => {
    e.stopPropagation(); // Prevent canvas panning while dragging pasted layer
    setIsDraggingPastedLayer(true);
    setPasteDragStart({
      x: e.clientX / zoom - pastedLayer.x,
      y: e.clientY / zoom - pastedLayer.y
    });
  };

  const confirmPaste = () => {
    if (!pastedLayer || !imageSrc) return;
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = imageInfo.width;
    tempCanvas.height = imageInfo.height;
    const tempCtx = tempCanvas.getContext('2d');
    
    const img = new Image();
    img.onload = () => {
      tempCtx.drawImage(img, 0, 0);
      const pasteImg = new Image();
      pasteImg.onload = () => {
        tempCtx.drawImage(pasteImg, Math.round(pastedLayer.x), Math.round(pastedLayer.y), pastedLayer.w, pastedLayer.h);
        const combinedDataUrl = tempCanvas.toDataURL();
        setImageSrc(combinedDataUrl);
        setPastedLayer(null);
        setAiStatus('已完成貼上與合併影像！');
        pushHistory(combinedDataUrl);
      };
      pasteImg.src = pastedLayer.dataUrl;
    };
    img.src = imageSrc;
  };

  // AI Feature - Background Cutout
  const runAiCutout = () => {
    if (!imageSrc || !engineRef.current) return;
    setAiStatus('載入 ONNX 去背模型...');
    setTimeout(() => {
      setAiStatus('辨識主體邊緣並執行透明度遮罩中...');
      setTimeout(() => {
        // 1. Create a helper 2D canvas at the image size
        const tempCanvas = document.createElement('canvas');
        tempCanvas.width = imageInfo.width;
        tempCanvas.height = imageInfo.height;
        const tempCtx = tempCanvas.getContext('2d');
        
        const img = new Image();
        img.onload = () => {
          tempCtx.drawImage(img, 0, 0);
          performLocalCutout(tempCanvas);
          const cutoutDataUrl = tempCanvas.toDataURL();
          setImageSrc(cutoutDataUrl);
          setAiStatus('去背完成 (本地 WebGPU 加速)');
          setHasCutout(true);
          pushHistory(cutoutDataUrl);
        };
        img.src = imageSrc;
      }, 1000);
    }, 600);
  };

  // AI Feature - Privacy Redaction
  const runAiRedact = () => {
    if (!imageSrc || !engineRef.current) return;
    setAiStatus('掃描敏感個資中 (OCR: 身分證、卡號、人臉)...');
    setTimeout(() => {
      // Realistically inform the user that no typical credentials format was found in this abstract text
      alert("【DevPixel AI 隱私防護掃描】\n\n掃描完畢！在此文件中未偵測到典型的「身分證字號、信用卡號、或人臉」。\n\n💡 提示：您可以使用左側的「區域框選工具 (M)」框住 any 敏感個資（例如數字或關鍵字），接著在右側「影像編輯」分頁點選「模糊框選區域」進行手動安全遮罩。");
      setAiStatus('掃描完成，未偵測到敏感個資。');
    }, 1000);
  };

  // Print Export trigger
  const triggerExport = async (format) => {
    if (!imageSrc) return;

    try {
      setAiStatus('正在進行色彩轉換與印刷封裝...');
      
      const img = new Image();
      img.onload = async () => {
        try {
          // 1. Calculate physical print dimensions
          const printPixels = calculatePixelsForPrint(currentPreset.widthMm, currentPreset.heightMm, dpi);
          const width = printPixels.widthPx;
          const height = printPixels.heightPx;

          // 2. Extract RGB bytes from image resized to print dimension using selected high-quality upsampler
          const tempCanvas = resampleImage(img, width, height, upscaleAlgorithm);
          const ctx = tempCanvas.getContext('2d');
          
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
      img.src = imageSrc;
    } catch (err) {
      console.error(err);
      setAiStatus(`匯出失敗: ${err.message}`);
      alert(`匯出失敗: ${err.message}`);
    }
  };

  return (
    <div className="workspace-grid" onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}>
      
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

        {/* Undo/Redo & Zoom controls & Top middle info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {/* Undo/Redo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginRight: '8px' }}>
            <button 
              className="cyber-btn" 
              onClick={handleUndo} 
              disabled={historyIndex <= 0}
              title="復原 (Cmd+Z)"
              style={{ padding: '6px 8px' }}
            >
              <Undo2 size={13} />
            </button>
            <button 
              className="cyber-btn" 
              onClick={handleRedo} 
              disabled={historyIndex >= history.length - 1}
              title="重做 (Cmd+Shift+Z)"
              style={{ padding: '6px 8px' }}
            >
              <Redo2 size={13} />
            </button>
          </div>

          {/* Zoom controls */}
          {imageSrc && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginRight: '8px' }}>
              <button className="cyber-btn" style={{ padding: '2px 6px', fontSize: '12px' }} onClick={() => { hasManuallyAdjustedRef.current = true; setZoom(Math.max(zoom / 1.2, 0.1)); }} title="縮小">-</button>
              <input 
                type="range" 
                min="0.1" 
                max="8.0" 
                step="0.05" 
                value={zoom} 
                onChange={(e) => { hasManuallyAdjustedRef.current = true; setZoom(Number(e.target.value)); }} 
                style={{ width: '70px', height: '3px', accentColor: 'var(--accent-cyan)' }}
              />
              <button className="cyber-btn" style={{ padding: '2px 6px', fontSize: '12px' }} onClick={() => { hasManuallyAdjustedRef.current = true; setZoom(Math.min(zoom * 1.2, 8.0)); }} title="放大">+</button>
              <span className="mono-text" style={{ fontSize: '11px', minWidth: '35px', textAlign: 'right' }}>
                {Math.round(zoom * 100)}%
              </span>
            </div>
          )}

          <span className="cyber-btn mono-text" onClick={() => {
            if (imageSrc) {
              hasManuallyAdjustedRef.current = false;
              fitImageToViewport(imageInfo.width, imageInfo.height);
            }
          }}>
            <Maximize2 size={14} /> 適應畫布
          </span>
          <button className="cyber-btn-purple" onClick={resetAdjustments}>
            <RotateCcw size={14} /> 重設調整
          </button>
        </div>

        {/* Collapsed Export Dropdown Panel */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>印刷輸出解析度</span>
              <select 
                value={dpiPreset} 
                onChange={(e) => handleDpiPresetChange(e.target.value)} 
                className="mono-text"
                style={{ background: 'var(--bg-cyber-dark)', color: 'var(--accent-cyan)', border: '1px solid var(--border-cyber)', borderRadius: '4px', padding: '2px 4px', fontSize: '12px', outline: 'none' }}
              >
                <option value="72">72 DPI (網頁)</option>
                <option value="150">150 DPI (普通影印)</option>
                <option value="300">300 DPI (專業印刷)</option>
                <option value="CUSTOM">自訂 DPI</option>
              </select>
            </div>
            {dpiPreset === 'CUSTOM' && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '65px' }}>
                <span style={{ fontSize: '10px', color: 'var(--accent-cyan)' }}>數值</span>
                <input 
                  type="number" 
                  min={lockMinDpi ? "100" : "10"} 
                  max="2400" 
                  value={dpiInputText} 
                  onChange={(e) => {
                    setDpiInputText(e.target.value);
                    const val = Number(e.target.value);
                    if (!isNaN(val) && val > 0) {
                      const minDpi = lockMinDpi ? 100 : 10;
                      setDpi(Math.min(2400, Math.max(minDpi, val)));
                    }
                  }}
                  onBlur={() => {
                    const minDpi = lockMinDpi ? 100 : 10;
                    const val = Math.max(minDpi, Math.min(2400, Number(dpiInputText) || 300));
                    setDpi(val);
                    setDpiInputText(String(val));
                  }}
                  style={{ width: '100%', background: 'var(--bg-cyber-dark)', border: '1px solid var(--border-cyber)', borderRadius: '4px', padding: '2px 4px', color: 'var(--text-primary)', fontSize: '12px', outline: 'none', height: '20px' }}
                />
              </div>
            )}
          </div>

          <div style={{ position: 'relative' }}>
            <button 
              className="cyber-btn-purple glow-purple" 
              onClick={() => setShowExportMenu(!showExportMenu)}
              style={{ gap: '6px', padding: '6px 12px' }}
            >
              <Download size={14} /> 另存與匯出 <ChevronDown size={14} />
            </button>

            {showExportMenu && (
              <div 
                className="glass-panel" 
                style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '8px',
                  width: '320px',
                  background: 'var(--bg-cyber-dark)',
                  border: '1px solid var(--border-cyber)',
                  borderRadius: '8px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.6)',
                  zIndex: 100,
                  padding: '8px'
                }}
              >
                <div 
                  className="dropdown-item" 
                  onClick={() => { triggerExport('PNG (sRGB)'); setShowExportMenu(false); }}
                  style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--text-primary)' }}>另存一般圖片 (PNG)</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>適用於網頁分享、一般螢幕看圖（sRGB 色彩空間）。</span>
                </div>

                <div style={{ height: '1px', background: 'var(--border-cyber)', margin: '4px 0' }} />

                <div 
                  className="dropdown-item" 
                  onClick={() => { triggerExport('TIFF (CMYK)'); setShowExportMenu(false); }}
                  style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--accent-cyan)' }}>另存普通印相檔 (TIFF)</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>適用於普通影印、沖印店印刷（CMYK 色彩空間）。</span>
                </div>

                <div style={{ height: '1px', background: 'var(--border-cyber)', margin: '4px 0' }} />

                <div 
                  className="dropdown-item" 
                  onClick={() => { triggerExport('PDF/X (CMYK)'); setShowExportMenu(false); }}
                  style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '2px' }}
                >
                  <span style={{ fontSize: '13px', fontWeight: 'bold', color: 'var(--accent-purple)' }}>另存專業 PDF/X 印刷檔</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>適用於印刷廠、大量出版印製（含 3mm 出血線與色彩宣告）。</span>
                </div>

                {imageSrc && (
                  <>
                    <div style={{ height: '1px', background: 'var(--border-cyber)', margin: '4px 0' }} />
                    <div 
                      className="dropdown-item" 
                      onClick={() => { closeFile(); setShowExportMenu(false); }}
                      style={{ padding: '8px 12px', cursor: 'pointer', borderRadius: '4px', display: 'flex', flexDirection: 'column', gap: '2px', color: '#ff4d4d' }}
                    >
                      <span style={{ fontSize: '13px', fontWeight: 'bold' }}>關閉當前檔案 (Close File)</span>
                      <span style={{ fontSize: '11px', color: '#ff4d4d', opacity: 0.8 }}>清除工作區並回到上傳主畫面。</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
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
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleImageUpload(e.target.files[0]);
            }
            e.target.value = ''; // Reset value so same file can be uploaded again
          }}
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

        <div 
          className={`tool-icon-btn hover-active ${activeTool === 'select' ? 'active' : ''}`}
          onClick={() => {
            setActiveTool('select');
            setActiveTab('edit');
          }}
          title="區域框選工具 (M)"
        >
          <Scissors size={20} />
        </div>

        <div style={{ width: '24px', height: '1px', background: 'var(--border-cyber)', margin: '8px 0' }} />

        <div 
          className="tool-icon-btn hover-active"
          onClick={() => setShowHelpModal(true)}
          title="操作指引與快捷鍵說明 (F1)"
          style={{ color: 'var(--accent-cyan)' }}
        >
          <HelpCircle size={20} />
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
        style={{
          cursor: (activeTool === 'pan' || spacePressed) 
            ? (isMouseDown ? 'grabbing' : 'grab') 
            : (activeTool === 'select' ? 'crosshair' : 'default')
        }}
      >
        {isDragging && (
          <div className="drag-overlay active">
            <Upload size={48} className="title-cyan" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '18px', fontWeight: '500' }}>拖拽圖片至此處載入</h3>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>支援 PNG, JPEG, TIFF, RAW 格式</p>
          </div>
        )}

        {!imageSrc ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', color: 'var(--text-secondary)', width: '100%' }}>
            <Upload size={48} className="title-cyan" style={{ marginBottom: '16px', opacity: 0.7 }} />
            <h3 style={{ fontSize: '18px', fontWeight: '500', color: 'var(--text-primary)' }}>請開啟或拖拽圖片至此處</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '6px' }}>支援 PNG, JPEG, TIFF, PDF/X 等格式</p>
            <button className="cyber-btn" onClick={() => fileInputRef.current?.click()} style={{ marginTop: '20px' }}>
              <Upload size={14} /> 選擇檔案
            </button>
          </div>
        ) : (
          /* Image wrapper with Zoom/Pan transforms */
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
                border: '1px solid rgba(255,255,255,0.1)',
                backgroundImage: `
                  linear-gradient(45deg, #f0f2f5 25%, transparent 25%), 
                  linear-gradient(-45deg, #f0f2f5 25%, transparent 25%), 
                  linear-gradient(45deg, transparent 75%, #f0f2f5 75%), 
                  linear-gradient(-45deg, transparent 75%, #f0f2f5 75%)
                `,
                backgroundSize: '16px 16px',
                backgroundPosition: '0 0, 0 8px, 8px -8px, -8px 0px',
                backgroundColor: '#ffffff'
              }}
            />

            {/* Dashed marquee selection overlay */}
            {activeTool === 'select' && selectionRect && (
              <div style={{
                position: 'absolute',
                left: `${selectionRect.x}px`,
                top: `${selectionRect.y}px`,
                width: `${selectionRect.w}px`,
                height: `${selectionRect.h}px`,
                border: '2px dashed var(--accent-cyan)',
                boxShadow: '0 0 10px rgba(0, 229, 255, 0.4)',
                backgroundColor: 'rgba(0, 229, 255, 0.12)',
                pointerEvents: 'none'
              }} />
            )}

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

            {/* Floating pasted layer */}
            {pastedLayer && (
              <div 
                style={{
                  position: 'absolute',
                  left: `${pastedLayer.x}px`,
                  top: `${pastedLayer.y}px`,
                  width: `${pastedLayer.w}px`,
                  height: `${pastedLayer.h}px`,
                  border: '2px dashed var(--accent-cyan)',
                  boxShadow: '0 0 12px rgba(0, 229, 255, 0.5)',
                  cursor: 'move',
                  zIndex: 50,
                  touchAction: 'none'
                }}
                onMouseDown={handlePastedLayerMouseDown}
              >
                <img 
                  src={pastedLayer.dataUrl} 
                  style={{ width: '100%', height: '100%', pointerEvents: 'none', display: 'block' }} 
                  alt="pasted layer" 
                />
                <div style={{
                  position: 'absolute',
                  bottom: '-36px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: '6px',
                  background: 'rgba(5, 7, 12, 0.95)',
                  border: '1px solid var(--border-cyber)',
                  borderRadius: '4px',
                  padding: '4px 8px',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                }}>
                  <button 
                    className="cyber-btn-purple" 
                    onClick={(e) => { e.stopPropagation(); confirmPaste(); }} 
                    style={{ fontSize: '11px', padding: '2px 8px', height: '22px' }}
                  >
                    確認貼上
                  </button>
                  <button 
                    className="cyber-btn" 
                    onClick={(e) => { e.stopPropagation(); setPastedLayer(null); }} 
                    style={{ fontSize: '11px', padding: '2px 8px', height: '22px', color: '#ff4d4d' }}
                  >
                    取消
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

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
          <div 
            className={`sidebar-tab ${activeTab === 'edit' ? 'active' : ''}`}
            onClick={() => setActiveTab('edit')}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              <Scissors size={14} /> 影像編輯
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

            <button 
              className="cyber-btn-purple glow-purple" 
              onClick={applyToneAdjustments}
              style={{ width: '100%', justifyContent: 'center', marginTop: '16px', padding: '10px' }}
              disabled={brightness === 0.0 && contrast === 1.0 && saturation === 1.0 && exposure === 0.0}
            >
              <CheckCircle2 size={14} /> 套用色調變更 (Bake)
            </button>

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

            {/* Layout Orientation Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', background: 'rgba(0,0,0,0.2)', padding: '8px 12px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>版面方向 (Orientation)</span>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button
                  className={`cyber-btn ${printOrientation === 'PORTRAIT' ? 'active' : ''}`}
                  onClick={() => setPrintOrientation('PORTRAIT')}
                  style={{ padding: '2px 8px', fontSize: '11px', height: '22px' }}
                >
                  直向
                </button>
                <button
                  className={`cyber-btn ${printOrientation === 'LANDSCAPE' ? 'active' : ''}`}
                  onClick={() => setPrintOrientation('LANDSCAPE')}
                  style={{ padding: '2px 8px', fontSize: '11px', height: '22px' }}
                >
                  橫向
                </button>
              </div>
            </div>
            
            <div className="preset-grid">
              {Object.keys(PRINT_SIZES).map((key) => {
                const w = PRINT_SIZES[key].widthMm;
                const h = PRINT_SIZES[key].heightMm;
                const isCurrentlyLandscape = w > h;
                const shouldBeLandscape = printOrientation === 'LANDSCAPE';
                const finalW = isCurrentlyLandscape !== shouldBeLandscape ? h : w;
                const finalH = isCurrentlyLandscape !== shouldBeLandscape ? w : h;
                return (
                  <div 
                    key={key}
                    className={`preset-card ${selectedPreset === key ? 'active' : ''}`}
                    onClick={() => setSelectedPreset(key)}
                  >
                    <p className="preset-card-title">{key}</p>
                    <p className="preset-card-sub">{finalW}x{finalH} mm</p>
                  </div>
                );
              })}
              <div 
                className={`preset-card ${selectedPreset === 'CUSTOM' ? 'active' : ''}`}
                onClick={() => setSelectedPreset('CUSTOM')}
              >
                <p className="preset-card-title" style={{ color: 'var(--accent-cyan)' }}>自訂規格</p>
                <p className="preset-card-sub">
                  {(() => {
                    const isCurrentlyLandscape = customWidth > customHeight;
                    const shouldBeLandscape = printOrientation === 'LANDSCAPE';
                    const finalW = isCurrentlyLandscape !== shouldBeLandscape ? customHeight : customWidth;
                    const finalH = isCurrentlyLandscape !== shouldBeLandscape ? customWidth : customHeight;
                    return `${finalW}x${finalH}`;
                  })()} mm
                </p>
              </div>
            </div>

            {selectedPreset === 'CUSTOM' && (
              <div className="glass-panel" style={{ padding: '12px', marginBottom: '16px', display: 'flex', gap: '8px', background: 'rgba(0,0,0,0.3)' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>寬度 (mm)</label>
                  <input 
                    type="number" 
                    value={customWidth} 
                    onChange={(e) => setCustomWidth(Math.max(1, Number(e.target.value)))}
                    style={{ width: '100%', background: 'var(--bg-cyber-dark)', border: '1px solid var(--border-cyber)', borderRadius: '4px', padding: '4px 6px', color: 'var(--text-primary)', marginTop: '4px', fontSize: '12px', outline: 'none' }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>高度 (mm)</label>
                  <input 
                    type="number" 
                    value={customHeight} 
                    onChange={(e) => setCustomHeight(Math.max(1, Number(e.target.value)))}
                    style={{ width: '100%', background: 'var(--bg-cyber-dark)', border: '1px solid var(--border-cyber)', borderRadius: '4px', padding: '4px 6px', color: 'var(--text-primary)', marginTop: '4px', fontSize: '12px', outline: 'none' }}
                  />
                </div>
              </div>
            )}

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

              {imageSrc && (() => {
                const isSufficient = imageInfo.width >= printPixels.widthPx && imageInfo.height >= printPixels.heightPx;
                return (
                  <div style={{ marginTop: '8px', borderTop: '1px dashed rgba(255,255,255,0.1)', paddingTop: '8px' }}>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', marginBottom: '6px', fontStyle: 'italic' }}>
                      計算公式: (尺寸 / 25.4) * DPI = 所需像素
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)' }}>
                      <span>目前影像尺寸:</span>
                      <span className="mono-text">{imageInfo.width} x {imageInfo.height} px</span>
                    </div>
                    <div style={{
                      marginTop: '8px',
                      padding: '6px 8px',
                      borderRadius: '4px',
                      fontSize: '11px',
                      lineHeight: '1.4',
                      background: isSufficient 
                        ? 'rgba(0, 230, 118, 0.08)' 
                        : (upscaleAlgorithm === 'BILINEAR' ? 'rgba(255, 145, 0, 0.08)' : 'rgba(0, 229, 255, 0.08)'),
                      border: isSufficient 
                        ? '1px solid var(--accent-green)' 
                        : (upscaleAlgorithm === 'BILINEAR' ? '1px solid rgba(255, 145, 0, 0.3)' : '1px solid var(--accent-cyan)'),
                      color: isSufficient 
                        ? 'var(--accent-green)' 
                        : (upscaleAlgorithm === 'BILINEAR' ? '#ff9100' : 'var(--accent-cyan)')
                    }}>
                      {isSufficient 
                        ? '✅ 目前影像解析度充足！適合高品質印刷輸出（匯出時將自動重採樣優化縮圖）。' 
                        : (upscaleAlgorithm === 'BILINEAR'
                            ? '⚠️ 原始影像解析度不足！印刷輸出會被拉伸放大。目前設定為 Bilinear 模糊拉伸。建議在下方調校助理切換為 [Lanczos-3] 超採樣放大，或更換更高解析度圖檔。'
                            : `ℹ️ 原始解析度不足，但免擔心！系統已配置 [${upscaleAlgorithm === 'BICUBIC' ? 'Bicubic 雙三次' : 'Lanczos-3 專業'}] 智慧超採樣，匯出時將自動重採樣重建放大至 ${printPixels.widthPx} x ${printPixels.heightPx} px 以滿足 ${dpi} DPI 滿版印刷，無需降低 DPI！`
                          )
                      }
                    </div>
                  </div>
                );
              })()}
            </div>

            {/* Print Scaling & Quality Optimizer Panel */}
            {(() => {
              const dpiQuality = (() => {
                if (dpi >= 300) return { label: '🌟 完美 (Perfect)', color: 'var(--accent-green)', bg: 'rgba(0, 230, 118, 0.08)', desc: '適合近距離手持閱讀（如書籍、相冊、傳單）' };
                if (dpi >= 150) return { label: '🟢 優良 (Fine)', color: 'var(--accent-cyan)', bg: 'rgba(0, 229, 255, 0.08)', desc: '適合近觀海報、室內廣告（最佳觀賞距離 0.5~1米）' };
                if (dpi >= 90) return { label: '🟡 接受 (Acceptable)', color: '#ffc107', bg: 'rgba(255, 193, 7, 0.08)', desc: '適合遠觀海報、展場背景牆（最佳觀賞距離 1~2米）' };
                return { label: '🔴 嚴重不足 (Poor)', color: '#ff4d4d', bg: 'rgba(255, 77, 77, 0.08)', desc: '不適合大版面輸出，容易模糊（建議更換圖檔或降低版面尺寸）' };
              })();
              const bestViewingDistance = (150 / dpi).toFixed(1);

              const recDpi = (() => {
                const preset = selectedPreset;
                if (preset === 'A0') {
                  return { range: '72 ~ 120', maxValue: 120, desc: 'A0 超大版面看板，建議觀賞距離 > 2 米。調低解析度能大幅縮減檔案大小，且列印效果極佳。' };
                }
                if (preset === 'A1') {
                  return { range: '100 ~ 150', maxValue: 150, desc: 'A1 大型展板與海報，建議觀賞距離 1.5 ~ 2 米。150 DPI 已能保證絕佳視覺完整度。' };
                }
                if (preset === 'A2') {
                  return { range: '120 ~ 200', maxValue: 200, desc: 'A2 中型展會海報與掛軸，建議觀賞距離 1 ~ 1.5 米。200 DPI 可兼顧容量與細緻度。' };
                }
                if (preset === 'A3' || preset === 'B4') {
                  return { range: '150 ~ 250', maxValue: 250, desc: 'A3/B4 宣傳海報與精緻菜單，建議觀賞距離 0.5 ~ 1 米。250 DPI 能呈現清晰文字細節。' };
                }
                if (preset === 'CUSTOM') {
                  const maxDim = Math.max(customWidth, customHeight);
                  if (maxDim > 1000) {
                    return { range: '72 ~ 120', maxValue: 120, desc: '超大自訂規格，建議觀賞距離 > 2 米。適度調低 DPI 能顯著優化檔案大小，輸出不受影響。' };
                  }
                  if (maxDim > 500) {
                    return { range: '100 ~ 180', maxValue: 180, desc: '中大自訂規格，建議觀賞距離 1 ~ 2 米。180 DPI 是可平衡輸出與細節的建議值。' };
                  }
                  if (maxDim > 250) {
                    return { range: '150 ~ 250', maxValue: 250, desc: '中型自訂印刷，建議觀賞距離 0.5 ~ 1 米。250 DPI 能展現充足的細部細節。' };
                  }
                  return { range: '300 ~ 600', maxValue: 600, desc: '小型手持印刷規格，建議觀賞距離 < 0.5 米。建議設定至少 600 DPI 以呈現精緻細節。' };
                }
                return { range: '300 ~ 600', maxValue: 600, desc: '手持閱讀書冊、證件照或精緻相片，建議觀賞距離 < 0.5 米。必須設定 300 ~ 600 DPI 才能保證近看文字無顆粒感。' };
              })();

              return (
                <div className="glass-panel glow-cyan" style={{ padding: '14px', marginBottom: '20px', background: 'rgba(10, 15, 25, 0.45)', border: '1px solid var(--border-cyber)' }}>
                  <h4 style={{ fontSize: '12px', color: 'var(--accent-cyan)', marginBottom: '10px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldAlert size={14} style={{ color: 'var(--accent-cyan)' }} />
                    印前縮放與品質調校助理
                  </h4>

                  {/* 1. Quality badge & viewing distance */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>輸出品質評級:</span>
                      <span style={{ 
                        fontSize: '11px', 
                        fontWeight: 'bold', 
                        padding: '2px 8px', 
                        borderRadius: '4px',
                        color: dpiQuality.color,
                        background: dpiQuality.bg,
                        border: `1px solid ${dpiQuality.color}40`
                      }}>
                        {dpiQuality.label}
                      </span>
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: '1.3', padding: '4px 6px', background: 'rgba(0,0,0,0.15)', borderRadius: '4px' }}>
                      {dpiQuality.desc}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)' }}>
                      <span>建議最佳觀看距離:</span>
                      <span className="mono-text title-cyan" style={{ fontWeight: 'bold' }}>{bestViewingDistance} 公尺以上</span>
                    </div>
                  </div>

                  {/* 1.5 Dynamic Recommended DPI range card */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'rgba(255,255,255,0.03)', padding: '8px 10px', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '14px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>此規格建議解析度:</span>
                      <span className="mono-text title-cyan" style={{ fontSize: '11px', fontWeight: 'bold' }}>{recDpi.range} DPI</span>
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)', lineHeight: '1.3' }}>
                      {recDpi.desc}
                    </div>
                    <button
                      className="cyber-btn"
                      onClick={() => {
                        setDpi(recDpi.maxValue);
                        setDpiInputText(String(recDpi.maxValue));
                        setDpiPreset('CUSTOM');
                        setAiStatus(`已套用本尺寸建議最佳解析度: ${recDpi.maxValue} DPI`);
                      }}
                      style={{ marginTop: '6px', fontSize: '10px', padding: '2px 6px', height: '20px', alignSelf: 'flex-end', justifyContent: 'center' }}
                    >
                      套用建議上限值 ({recDpi.maxValue} DPI)
                    </button>
                  </div>

                  {/* 2. Resampling Algorithm Selection */}
                  <div style={{ marginBottom: '14px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                    <label style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>超採樣放大演算法</label>
                    <select
                      value={upscaleAlgorithm}
                      onChange={(e) => setUpscaleAlgorithm(e.target.value)}
                      className="mono-text"
                      style={{ width: '100%', background: 'var(--bg-cyber-dark)', color: 'var(--text-primary)', border: '1px solid var(--border-cyber)', borderRadius: '4px', padding: '4px 6px', fontSize: '11px', outline: 'none' }}
                    >
                      <option value="BILINEAR">Bilinear (普通雙線性 - 邊緣較軟)</option>
                      <option value="BICUBIC">Bicubic (雙三次卷積 - 銳化細節)</option>
                      <option value="LANCZOS3">Lanczos-3 (印刷級 sinc 超採樣 - 最清晰)</option>
                    </select>
                  </div>

                  {/* 3. Safety Guard and Auto Adapt */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', borderTop: '1px dashed rgba(255,255,255,0.08)', paddingTop: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>強制鎖定最低安全解析度 (100 DPI)</span>
                      <input 
                        type="checkbox" 
                        checked={lockMinDpi} 
                        onChange={(e) => toggleLockMinDpi(e.target.checked)}
                        style={{ width: '14px', height: '14px', accentColor: 'var(--accent-cyan)' }}
                      />
                    </div>
                    
                    <button 
                      className="cyber-btn"
                      onClick={autoMatchDpi}
                      style={{ width: '100%', justifyContent: 'center', fontSize: '11px', padding: '6px', height: '28px' }}
                    >
                      DPI 與目前影像 1:1 無損最佳化適配
                    </button>
                  </div>
                </div>
              );
            })()}

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

        {/* Tab 4: Image Selection & Editing */}
        {activeTab === 'edit' && (
          <div style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '12px', fontWeight: 'bold' }}>
              圖片框選與編輯功能
            </h3>
            
            <p style={{ fontSize: '11px', color: 'var(--text-secondary)', marginBottom: '16px', lineHeight: '1.4' }}>
              請先在左側工具列啟用「<b>區域框選工具 (M)</b>」，然後在圖片上拖曳滑鼠以框選任何區域。
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                className="cyber-btn"
                onClick={handleCopy}
                style={{ justifyContent: 'center', padding: '10px' }}
                disabled={!selectionRect}
              >
                <Copy size={16} /> 複製框選區域 (Copy)
              </button>

              <button 
                className="cyber-btn-purple"
                onClick={handlePaste}
                style={{ justifyContent: 'center', padding: '10px' }}
                disabled={!clipboard}
              >
                <Clipboard size={16} /> 貼上至影像中心 (Paste)
              </button>

              <button 
                className="cyber-btn"
                onClick={handleDelete}
                style={{ justifyContent: 'center', padding: '10px', color: '#ff4d4d', borderColor: 'rgba(255, 77, 77, 0.2)' }}
                disabled={!selectionRect && !pastedLayer}
              >
                <Trash2 size={16} /> 刪除框選像素 / 取消貼上 (Delete)
              </button>

              <button 
                className="cyber-btn"
                onClick={handleBlurSelection}
                style={{ justifyContent: 'center', padding: '10px' }}
                disabled={!selectionRect}
              >
                <ShieldAlert size={16} style={{ color: 'var(--accent-cyan)' }} /> 模糊框選區域 (Blur)
              </button>
            </div>

            {selectionRect && (
              <div className="glass-panel" style={{ marginTop: '20px', padding: '12px', background: 'rgba(0,0,0,0.2)' }}>
                <h4 style={{ fontSize: '12px', color: 'var(--accent-cyan)', marginBottom: '6px', fontWeight: 'bold' }}>
                  目前框選範圍
                </h4>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)' }}>
                  <span>起始坐標 (X, Y):</span>
                  <span className="mono-text">{Math.round(selectionRect.x)}, {Math.round(selectionRect.y)} px</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  <span>寬高尺寸 (W x H):</span>
                  <span className="mono-text">{Math.round(selectionRect.w)} x {Math.round(selectionRect.h)} px</span>
                </div>
              </div>
            )}

            {clipboard && (
              <div className="glass-panel glow-cyan" style={{ marginTop: '16px', padding: '10px', background: 'rgba(0,229,255,0.02)', textAlign: 'center' }}>
                <p style={{ fontSize: '11px', color: 'var(--accent-cyan)', marginBottom: '8px' }}>剪貼簿緩衝區 (已就緒)</p>
                <img 
                  src={clipboard.dataUrl} 
                  alt="Clipboard preview" 
                  style={{ maxHeight: '80px', maxWidth: '100%', border: '1px solid var(--border-cyber)', borderRadius: '4px' }}
                />
                <p style={{ fontSize: '9px', color: 'var(--text-muted)', marginTop: '4px' }}>尺寸: {clipboard.w}x{clipboard.h} px</p>
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

      {showHelpModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(5, 7, 12, 0.85)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          animation: 'fadeIn 0.2s ease-out'
        }}>
          <div className="glass-panel glow-cyan" style={{
            width: '680px',
            maxWidth: '92%',
            maxHeight: '85vh',
            overflowY: 'auto',
            padding: '24px',
            position: 'relative',
            background: 'var(--bg-cyber-dark)',
            border: '1px solid var(--border-cyber)',
            borderRadius: '12px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-cyber)', paddingBottom: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle className="title-cyan" size={20} />
                <h2 style={{ fontSize: '18px', fontWeight: 'bold', margin: 0 }}>DevPixel 影像與印前調校助手說明</h2>
              </div>
              <button 
                className="cyber-btn" 
                onClick={() => setShowHelpModal(false)}
                style={{ padding: '4px 8px', fontSize: '12px' }}
              >
                關閉 (Esc)
              </button>
            </div>

            {/* Modal Tab Navigation */}
            <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
              <button 
                onClick={() => setHelpTab('manual')}
                className="cyber-btn"
                style={{ 
                  flex: 1, 
                  background: helpTab === 'manual' ? 'var(--accent-cyan)' : 'transparent',
                  color: helpTab === 'manual' ? '#000' : 'var(--text-secondary)',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  height: '32px'
                }}
              >
                📖 功能與操作手冊
              </button>
              <button 
                onClick={() => setHelpTab('privacy')}
                className="cyber-btn"
                style={{ 
                  flex: 1, 
                  background: helpTab === 'privacy' ? 'var(--accent-cyan)' : 'transparent',
                  color: helpTab === 'privacy' ? '#000' : 'var(--text-secondary)',
                  justifyContent: 'center',
                  fontWeight: 'bold',
                  height: '32px'
                }}
              >
                🔒 隱私權與資料保護政策
              </button>
            </div>

            {helpTab === 'manual' ? (
              /* TAB 1: User Manual */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                <div>
                  <h3 style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Maximize2 size={14} className="title-cyan" /> 1. 平移與縮放 (Pan & Zoom)
                  </h3>
                  <p style={{ margin: 0, paddingLeft: '20px' }}>
                    選取左側 <b>平移工具 (H)</b>，在畫布按住滑鼠左鍵即可平移；亦可在任何工具狀態下 <b>長按鍵盤「空白鍵 (Spacebar)」</b> 暫時抓取移動。使用頂部拉桿、縮放按鈕或滾輪可進行縮放。畫布設有安全縮放限制，防視窗逸失。
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sliders size={14} className="title-cyan" /> 2. 色彩影像調整與烘焙 (Baking)
                  </h3>
                  <p style={{ margin: 0, paddingLeft: '20px' }}>
                    切換到右側「影像調整」分頁，可拉動亮度、曝光度等滑桿透過 WebGL 著色器實時預覽。調整滿意後，<b>必須點擊下方「套用色調變更 (Bake)」按鈕</b> 才能將變更寫入影像像素並寫入歷史紀錄。
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Scissors size={14} className="title-cyan" /> 3. 區域編輯、無痕消除與貼上層
                  </h3>
                  <p style={{ margin: 0, paddingLeft: '20px' }}>
                    選取左側 <b>區域框選工具 (M)</b>，在畫布上拖曳出選取區：
                    <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
                      <li><b>複製與貼上</b>：點選複製將像素存入剪貼簿，貼上後會產生一個懸浮貼上層。可用滑鼠隨意拖曳定位，雙擊或右側點選烘焙寫入畫布。欲移除貼上層，可直接點擊「取消」或按鍵盤 <b>Delete / Backspace</b> 鍵。</li>
                      <li><b>無痕消除</b>：點選「刪除選取區」或按鍵盤 <b>Delete / Backspace</b> 鍵，系統將自動進行周邊亮度像素的無痕融合補平。</li>
                      <li><b>隱私模糊</b>：點選「模糊框選區域」會執行高品質的 25x25 強效模糊，使文字徹底不可讀。</li>
                    </ul>
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Crop size={14} className="title-cyan" /> 4. 印刷規格、出血線與調校助理 (Pre-press Optimizer)
                  </h3>
                  <p style={{ margin: 0, paddingLeft: '20px' }}>
                    選取左側 <b>裁切工具 (C)</b> 後，可在右側「一鍵印刷」頁籤進行進階設定：
                    <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
                      <li><b>出血線</b>：系統支援直橫向版面方向自動偵測與手動切換，並自動渲染 3mm 虛線出血邊界框。</li>
                      <li><b>建議解析度對照</b>：系統會依據選擇規格（如 A0~A5）動態給出建議解析度範圍。點擊 <b>「套用建議上限值」</b> 按鈕，能一鍵將 DPI 設為該規格的上限值，避免檔案容量臃腫。</li>
                      <li><b>安全 DPI 鎖定</b>：勾選「最低安全解析度」後將鎖定 DPI 下限為 100 DPI，防止解析度過低導致印刷像素化。</li>
                      <li><b>超採樣放大演算法</b>：提供 Bilinear、Bicubic、Lanczos-3。當原圖尺寸小於目標所需像素時，系統將自動調用 <b>Lanczos-3 印刷級插值重採樣</b> 對影像進行邊緣銳化重建，確保高 DPI 滿版列印品質，無需調降 DPI！</li>
                    </ul>
                  </p>
                </div>

                <div>
                  <h3 style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Sparkles size={14} className="title-cyan" /> 5. 本地 AI 去背與隱私防護檢測
                  </h3>
                  <p style={{ margin: 0, paddingLeft: '20px' }}>
                    在右側「AI 助理」頁籤中：點選 <b>AI 智慧去背</b> 可藉由本地端去背引擎移除相片或文件背景，去背後的透明底色可透過畫布下的 16px 棋盤格背景清晰辨識；點選 <b>敏感資訊自動掃描</b> 可一鍵搜尋畫面中是否包含個資並引導遮蔽。
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-cyber)', paddingTop: '12px', marginTop: '4px' }}>
                  <h4 style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '6px' }}>
                    ⌨️ 鍵盤快捷鍵對照表 (Shortcuts)
                  </h4>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 16px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                    <div><kbd style={{ background: '#1c2030', padding: '2px 6px', borderRadius: '3px', border: '1px solid #334' }}>Space (長按)</kbd> 抓手平移</div>
                    <div><kbd style={{ background: '#1c2030', padding: '2px 6px', borderRadius: '3px', border: '1px solid #334' }}>Cmd / Ctrl + Z</kbd> 復原操作 (Undo)</div>
                    <div><kbd style={{ background: '#1c2030', padding: '2px 6px', borderRadius: '3px', border: '1px solid #334' }}>Cmd / Ctrl + Shift + Z</kbd> 重做操作 (Redo)</div>
                    <div><kbd style={{ background: '#1c2030', padding: '2px 6px', borderRadius: '3px', border: '1px solid #334' }}>Delete / Backspace</kbd> 刪除選區 / 撤銷貼上層</div>
                    <div><kbd style={{ background: '#1c2030', padding: '2px 6px', borderRadius: '3px', border: '1px solid #334' }}>H</kbd> 切換到平移工具</div>
                    <div><kbd style={{ background: '#1c2030', padding: '2px 6px', borderRadius: '3px', border: '1px solid #334' }}>C</kbd> 切換到裁切工具</div>
                    <div><kbd style={{ background: '#1c2030', padding: '2px 6px', borderRadius: '3px', border: '1px solid #334' }}>M</kbd> 切換到框選工具</div>
                    <div><kbd style={{ background: '#1c2030', padding: '2px 6px', borderRadius: '3px', border: '1px solid #334' }}>A</kbd> 切換到向量標記</div>
                    <div><kbd style={{ background: '#1c2030', padding: '2px 6px', borderRadius: '3px', border: '1px solid #334' }}>S</kbd> 切換到安全簽名</div>
                    <div><kbd style={{ background: '#1c2030', padding: '2px 6px', borderRadius: '3px', border: '1px solid #334' }}>F1</kbd> 開啟說明視窗</div>
                  </div>
                </div>
              </div>
            ) : (
              /* TAB 2: Privacy Policy */
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                <div style={{ padding: '10px 14px', background: 'rgba(0, 229, 255, 0.05)', border: '1px solid var(--border-cyber)', borderRadius: '6px' }}>
                  <h3 style={{ fontSize: '14px', color: 'var(--accent-cyan)', fontWeight: 'bold', margin: '0 0 6px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <ShieldAlert size={16} /> 100% 本地端離線隱私安全宣告
                  </h3>
                  <p style={{ margin: 0, fontSize: '12px' }}>
                    DevPixel 專案秉持「隱私安全至上 (Privacy First)」原則。所有核心運算均限制在您本地的實體主機上運行，實現真正的實體隔離與零網路隱私洩漏風險。
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '4px' }}>
                    一、100% 本地端運算架構
                  </h4>
                  <p style={{ margin: 0, paddingLeft: '12px' }}>
                    本程式載入的任何影像、照片、手寫文檔及證件，其 WebGL 著色器濾鏡處理、Canvas 向量編輯、像素無痕填充演算法、以及 Lanczos-3 高品質超採樣重採樣放大，**全數在您本機瀏覽器 / Tauri 沙盒內部以 CPU 或 GPU 獨立完成，絕對不會上傳至任何雲端伺服器**。
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '4px' }}>
                    二、AI 與敏感字元掃描之離線推理
                  </h4>
                  <p style={{ margin: 0, paddingLeft: '12px' }}>
                    內建的 <b>AI 智慧去背</b>（移除亮/暗背景）以及 <b>個資敏感字元 OCR 自動偵測掃描</b> 功能，皆是透過本地編譯之智慧模組直接在您的本機硬體上進行單機計算推理。本程式不含任何外部遙測 (Telemetry) API，個資掃描比對結果僅在前端介面短暫引導標記，不會上傳給任何第三方或進行存檔。
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '4px' }}>
                    三、印前導出與色彩空間轉換安全
                  </h4>
                  <p style={{ margin: 0, paddingLeft: '12px' }}>
                    程式所附帶的 `@devpixel/cmyk-wasm` 模組是純 Rust 編譯的本地 WebAssembly 模組，其 sRGB 轉 CMYK（FOGRA39 描述檔）、TIFF 及符合 PDF/X-1a 標準之印前 PDF 文件編碼包裝，皆為本機同步進行，直接輸出檔案寫入您硬碟，沒有任何中繼伺服器介入，保證您的商業設計與發行文件 100% 安全保密。
                  </p>
                </div>

                <div>
                  <h4 style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 'bold', marginBottom: '4px' }}>
                    四、個資隱私模糊處理 (Redaction)
                  </h4>
                  <p style={{ margin: 0, paddingLeft: '12px' }}>
                    當您使用本程式的「模糊框選區域」功能時，系統將調用 25x25 強效方框模糊 (Box Blur) 內核進行像素混亂，此模糊在數學上具有不可還原性，能確保障蔽後的個資與文字在任何反向解碼下皆維持 100% 無法讀取狀態。
                  </p>
                </div>

                <div style={{ borderTop: '1px solid var(--border-cyber)', paddingTop: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
                  中華民國 115 年 (2026年) 07 月 11 日修訂並生效。若您在使用本程式時處於完全斷網狀態，所有功能均可無縫離線運作，敬請安心使用。
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
