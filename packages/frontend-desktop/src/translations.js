export const languages = [
  { code: 'en', name: 'English' },
  { code: 'zh-TW', name: '繁體中文' },
  { code: 'zh-CN', name: '简体中文' },
  { code: 'th', name: 'ไทย' },
  { code: 'ja', name: '日本語' },
  { code: 'ko', name: '한국어' },
  { code: 'de', name: 'Deutsch' },
  { code: 'ru', name: 'Русский' },
  { code: 'id', name: 'Bahasa Indonesia' },
  { code: 'ms', name: 'Bahasa Melayu' },
  { code: 'es', name: 'Español' },
  { code: 'pt', name: 'Português' }
];

export const translations = {
  en: {
    studioMode: 'STUDIO MODE',
    fitCanvas: 'Fit Canvas',
    resetAdjustments: 'Reset Adjustments',
    printResolution: 'Print Output Resolution',
    dpi72: '72 DPI (Web)',
    dpi150: '150 DPI (Copying)',
    dpi300: '300 DPI (Pro Print)',
    dpiCustom: 'Custom DPI',
    dpiValue: 'Value',
    saveAndExport: 'Save & Export',
    savePNG: 'Save standard image (PNG)',
    savePNGDesc: 'Suitable for web sharing and general screens (sRGB).',
    saveTIFF: 'Save standard photo file (TIFF)',
    saveTIFFDesc: 'Suitable for copy shops and photo print (CMYK).',
    savePDF: 'Save professional PDF/X print file',
    savePDFDesc: 'Suitable for printing houses and mass publishing (with 3mm bleed and color profiles).',
    closeFile: 'Close Current File',
    closeFileDesc: 'Clear workspace and return to upload screen.',
    tooltips: {
      openFile: 'Open new file',
      panZoom: 'Pan & Zoom (H)',
      crop: 'Print Size Crop (C)',
      markup: 'Vector Markup Tool (A)',
      signature: 'Secure Signature (S)',
      marquee: 'Marquee Select Tool (M)',
      help: 'Help & Shortcuts (F1)'
    },
    dragOverlay: {
      title: 'Drag image here to load',
      desc: 'Supports PNG, JPEG, TIFF, RAW formats'
    },
    noImage: {
      title: 'Please open or drag image here',
      desc: 'Supports PNG, JPEG, TIFF, PDF/X formats, etc.',
      button: 'Select File'
    },
    canvas: {
      bleedLabel: '3mm Bleed Safe Zone (Trim Boundary)',
      confirmPaste: 'Confirm Paste',
      cancel: 'Cancel',
      signatureTitle: 'Encrypted Vector Signature Board',
      signatureDesc: 'Sign on touchpad then unlock with Touch ID',
      securityLevel: 'Security Level: AES-256',
      signatureBtn: 'Sign with Touch ID'
    },
    tabs: {
      adjust: 'Image Adjustments',
      print: 'One-click Print',
      ai: 'AI Assistant',
      edit: 'Image Edit'
    },
    adjustPanel: {
      title: 'Non-destructive Color Editing (WebGL)',
      exposure: 'Exposure',
      brightness: 'Brightness',
      contrast: 'Contrast',
      saturation: 'Saturation',
      bakeBtn: 'Apply Tone Changes (Bake)',
      gamutTitle: 'CMYK Print Gamut Soft Proofing',
      gamutBtn: 'Proof',
      gamutDesc: 'When enabled, out-of-gamut saturated colors for Coated FOGRA39 print will be marked with purple stripes.'
    },
    printPanel: {
      title: 'One-click Physical Spec Reset',
      orientation: 'Orientation',
      portrait: 'Portrait',
      landscape: 'Landscape',
      customSize: 'Custom Size',
      width: 'Width (mm)',
      height: 'Height (mm)',
      pixelCalc: 'Physical Print Pixel Calculation',
      targetSize: 'Target Size:',
      resolution: 'Resolution:',
      requiredPixels: 'Required Pixels:',
      currentImgSize: 'Current Image Size:',
      formula: 'Formula: (Size / 25.4) * DPI = Required Pixels',
      sufficient: '✅ Resolution is sufficient! Suitable for high-quality printing (auto-resampled on export).',
      insufficientBilinear: '⚠️ Original resolution is insufficient! Print will be stretched. Currently using Bilinear stretching. We recommend switching to [Lanczos-3] upsampling below, or uploading a higher resolution image.',
      insufficientLanczos: 'ℹ️ Resolution is insufficient, but no worries! The system is set to [{algo}] upsampling. It will automatically upscale to {w} x {h} px during export to satisfy {dpi} DPI full print without dropping DPI.',
      optimizerTitle: 'Pre-press Scaling & Quality Assistant',
      qualityRating: 'Output Quality Rating:',
      qualityPerfect: '🌟 Perfect',
      qualityFine: '🟢 Fine',
      qualityAcceptable: '🟡 Acceptable',
      qualityPoor: '🔴 Poor',
      descPerfect: 'Suitable for close-range reading (books, albums, flyers)',
      descFine: 'Suitable for posters, indoor ads (view distance 0.5-1m)',
      descAcceptable: 'Suitable for distant posters, backdrops (view distance 1-2m)',
      descPoor: 'Poor quality, prone to blur (recommend higher resolution image or smaller print size)',
      viewingDistance: 'Recommended Viewing Distance:',
      metersOrMore: 'meters or more',
      recRes: 'Recommended Resolution:',
      applyLimit: 'Apply Recommended Limit ({val} DPI)',
      upscaleLabel: 'Upscaling Algorithm',
      forceMinDpi: 'Force lock minimum safe resolution (100 DPI)',
      autoDpi: 'Optimize DPI to match image 1:1 without loss',
      showBleed: 'Show 3mm Bleed Line',
      bleedDesc: 'Render bleed border, showing trim safety lines (3mm margin).'
    },
    aiPanel: {
      title: 'Local AI Assistant Engine (ONNX)',
      cutoutTitle: 'AI Smart Cutout',
      cutoutAccel: 'CoreML Accelerated',
      cutoutDesc: 'Detect foreground subject and remove background. Fully offline.',
      cutoutBtn: 'Run Smart Cutout',
      redactTitle: 'Smart Privacy Redaction Mask',
      redactAccel: 'OCR Detection',
      redactDesc: 'One-click auto-detect and blur: ID cards, credit card numbers, faces.',
      redactBtn: 'Run Privacy Redaction'
    },
    editPanel: {
      title: 'Selection & Image Editing',
      desc: 'Please enable Marquee Select Tool (M) from left toolbar, then drag on canvas to select a region.',
      copyBtn: 'Copy Selected Region (Copy)',
      pasteBtn: 'Paste to Image Center (Paste)',
      deleteBtn: 'Delete Selected Pixels / Cancel Paste (Delete)',
      blurBtn: 'Blur Selected Region (Blur)',
      selectionArea: 'Current Selection Area',
      startCoords: 'Start Coords (X, Y):',
      dimensions: 'Width & Height (W x H):',
      clipboardTitle: 'Clipboard Buffer (Ready)',
      clipboardSize: 'Size:'
    },
    footer: {
      file: 'FILE:',
      dim: 'DIM:',
      physical: 'PHYSICAL:',
      zoom: 'ZOOM:',
      targetSpace: 'TARGET SPACE:'
    },
    helpModal: {
      title: 'DevPixel Image & Pre-press Tuning Assistant Help',
      close: 'Close (Esc)',
      tabManual: '📖 User Manual',
      tabPrivacy: '🔒 Privacy Policy',
      manual: {
        sections: [
          {
            title: '1. Pan & Zoom',
            content: 'Select Pan Tool (H) on left, drag on canvas with left mouse button to pan; you can also hold "Spacebar" in any tool to pan. Zoom using top bar, zoom buttons, or mouse wheel. Safety zoom limits prevent canvas loss.'
          },
          {
            title: '2. Image Adjustment & Baking',
            content: 'Switch to the right "Image Adjustments" tab, drag brightness, exposure sliders for real-time WebGL previews. Once satisfied, you must click the "Apply Tone Changes (Bake)" button below to write changes to image pixels and history.'
          },
          {
            title: '3. Selection, Inpainting & Paste Layer',
            content: 'Select Marquee Select Tool (M) on left, drag on canvas to create selection. Copy & Paste: Click Copy to save pixels. Pasting spawns a floating layer. Drag to position, double-click or click confirm to bake. To remove, click Cancel or press Delete/Backspace. Inpaint Eraser: Click "Delete Selected Pixels" or press Delete/Backspace. The system averages surrounding pixels to seamlessly erase. Privacy Blur: Click "Blur Selected Region" to execute a strong 25x25 box blur, making text completely unreadable.'
          },
          {
            title: '4. Print Specs, Bleeds & Optimizer',
            content: 'Select Crop Tool (C) on left, then configure options in "One-click Print" tab on the right. Bleeds: Supports automatic or manual orientation switching and renders a 3mm dashed bleed boundary. Recommended DPI Reference: System dynamically suggests DPI based on sizes (A0-A5). Click "Apply Recommended Limit" to set DPI to recommended upper bound, avoiding bloated files. Minimum DPI Lock: Check "Force lock minimum safe resolution" to clamp DPI at a minimum of 100 DPI, preventing pixellation. Upscaling Algorithms: Supports Bilinear, Bicubic, Lanczos-3. If original is smaller than required, it uses Lanczos-3 interpolation to rebuild edges and maintain print quality without dropping DPI!'
          },
          {
            title: '5. Offline AI Cutout & Privacy Shield',
            content: 'In "AI Assistant" tab: Click "Run Smart Cutout" to remove backgrounds offline, revealing transparency checkerboard. Click "Run Privacy Redaction" to scan for PII and guide masking.'
          }
        ],
        shortcutsTitle: '⌨️ Keyboard Shortcuts',
        shortcuts: [
          { key: 'Space (Hold)', desc: 'Hand Pan' },
          { key: 'Cmd / Ctrl + Z', desc: 'Undo Operation' },
          { key: 'Cmd / Ctrl + Shift + Z', desc: 'Redo Operation' },
          { key: 'Delete / Backspace', desc: 'Delete Selection / Cancel Paste Layer' },
          { key: 'H', desc: 'Switch to Pan Tool' },
          { key: 'C', desc: 'Switch to Crop Tool' },
          { key: 'M', desc: 'Switch to Marquee Tool' },
          { key: 'A', desc: 'Switch to Vector Markup' },
          { key: 'S', desc: 'Switch to Secure Signature' },
          { key: 'F1', desc: 'Open Help Dialog' }
        ]
      },
      privacy: {
        bannerTitle: '100% Offline Local Privacy Declaration',
        bannerContent: 'DevPixel adheres to a "Privacy First" philosophy. All core operations run strictly locally on your machine, ensuring air-gapped security and zero risk of network leaks.',
        sections: [
          {
            title: '1. 100% Local Computing Architecture',
            content: 'Any image, document, or ID loaded is processed purely inside your local browser or Tauri sandbox using local CPU/GPU (including WebGL, vector editing, inpainting, and Lanczos-3 resampling). Nothing is ever uploaded to cloud servers.'
          },
          {
            title: '2. Offline Inference for AI & OCR Scans',
            content: 'AI smart cutout (light/dark bg removal) and OCR sensitivity scanning run locally using offline smart engines. The program contains no telemetry APIs. Scan results are temporarily marked on UI and are never uploaded or saved.'
          },
          {
            title: '3. Safe Pre-press Export & Color Conversions',
            content: 'The `@devpixel/cmyk-wasm` package is a pure Rust WebAssembly module running in your browser. sRGB to CMYK (Fogra39) conversion, TIFF, and PDF/X-1a compliance compilation occur 100% locally on your machine, writing directly to your hard drive with no remote servers involved, protecting commercial designs.'
          },
          {
            title: '4. Privacy Redaction (Blur)',
            content: 'When using "Blur Selected Region", the system performs a strong 25x25 Box Blur. This blur is mathematically irreversible, ensuring that redacted personal data remains completely unreadable against any reverse-engineering attempts.'
          }
        ],
        effectiveDate: 'Revised and effective on July 11, 2026. All functions operate seamlessly without internet connection; please use with peace of mind.'
      }
    },
    alerts: {
      autoMatchedDpi: 'Automatically matched optimal print resolution: {dpi} DPI (1:1 lossless output)',
      undoSuccess: 'Undo successful',
      redoSuccess: 'Redo successful',
      toneApplied: 'Tone adjustments applied successfully!',
      toneFailed: 'Failed to apply color adjustments: {err}',
      fileClosed: 'File closed.',
      copyPrompt: 'Please select a region on the canvas first to copy.',
      copySuccess: 'Selected region copied!',
      deletePrompt: 'Please select a region on the canvas first to delete.',
      pasteCancel: 'Pasted layer cancelled and removed!',
      deleteSuccess: 'Selected pixels deleted and filled with surrounding colors!',
      blurPrompt: 'Please select a region on the canvas first to blur.',
      blurSuccess: 'Selected region blurred!',
      pastePrompt: 'Clipboard is empty. Please copy a region first.',
      pasteReady: 'Floating image pasted! Drag to position, then confirm to bake.',
      pasteConfirm: 'Image pasted and combined successfully!',
      loadOnnx: 'Loading ONNX cutout model...',
      recognizingCutout: 'Detecting subject edges and applying transparency mask...',
      cutoutSuccess: 'Cutout complete (Local WebGPU acceleration)',
      scanningOcr: 'Scanning for sensitive PII (OCR: ID, Card, Face)...',
      scanOcrResultAlert: '【DevPixel AI Privacy Scan】\n\nScan complete! No typical ID numbers, credit card numbers, or faces detected in this document.\n\n💡 Tip: Use Marquee Select Tool (M) on the left to select any sensitive info, then click "Blur Selected Region" in the right "Image Edit" tab.',
      scanOcrSuccess: 'Scan complete. No sensitive PII detected.',
      convertingColor: 'Performing color conversion and pre-press packaging...',
      pngExportSuccess: 'sRGB PNG exported successfully!',
      exportSuccess: '{format} exported successfully!',
      exportSuccessAlert: '【DevPixel Print Export Successful】\nFilename: {filename}\nSize: {size}\nResolution: {dpi} DPI\nBit depth: 8-bit CMYK\n\nFile successfully includes destination output intent (Fogra39) and print trim box settings!',
      exportFailed: 'Export failed: {err}',
      appliedRes: 'Applied recommended resolution for this size: {dpi} DPI'
    },
    presets: {
      A0: 'A0 Billboard, view distance > 2m. Lower DPI greatly reduces file size with great results.',
      A1: 'A1 Board/Poster, view distance 1.5-2m. 150 DPI is sufficient for visual integrity.',
      A2: 'A2 Medium Poster/Banner, view distance 1-1.5m. 200 DPI balances file size and detail.',
      A3B4: 'A3/B4 Poster/Menu, view distance 0.5-1m. 250 DPI presents crisp text details.',
      customLarge: 'Very large custom spec, view distance > 2m. Moderate DPI reduces size without affecting print.',
      customMedLarge: 'Medium-large custom spec, view distance 1-2m. 180 DPI balances output and detail.',
      customMed: 'Medium custom spec, view distance 0.5-1m. 250 DPI shows plenty of detail.',
      customSmall: 'Small handheld custom spec, view distance < 0.5m. Recommend at least 600 DPI for details.',
      defaultHandheld: 'Handheld book, photo or ID photo, view distance < 0.5m. Must use 300-600 DPI to avoid graininess.'
    }
  },
  'zh-TW': {
    studioMode: '工作室模式',
    fitCanvas: '適應畫布',
    resetAdjustments: '重設調整',
    printResolution: '印刷輸出解析度',
    dpi72: '72 DPI (網頁)',
    dpi150: '150 DPI (普通影印)',
    dpi300: '300 DPI (專業印刷)',
    dpiCustom: '自訂 DPI',
    dpiValue: '數值',
    saveAndExport: '另存與匯出',
    savePNG: '另存一般圖片 (PNG)',
    savePNGDesc: '適用於網頁分享、一般螢幕看圖（sRGB 色彩空間）。',
    saveTIFF: '另存普通印相檔 (TIFF)',
    saveTIFFDesc: '適用於普通影印、沖印店印刷（CMYK 色彩空間）。',
    savePDF: '另存專業 PDF/X 印刷檔',
    savePDFDesc: '適用於印刷廠、大量出版印製（含 3mm 出血線與色彩宣告）。',
    closeFile: '關閉當前檔案 (Close File)',
    closeFileDesc: '清除工作區並回到上傳主畫面。',
    tooltips: {
      openFile: '開啟新檔案',
      panZoom: '平移與縮放 (H)',
      crop: '印刷尺寸裁切 (C)',
      markup: '向量標記工具 (A)',
      signature: '指紋安全簽名 (S)',
      marquee: '區域框選工具 (M)',
      help: '操作指引與快捷鍵說明 (F1)'
    },
    dragOverlay: {
      title: '拖拽圖片至此處載入',
      desc: '支援 PNG, JPEG, TIFF, RAW 格式'
    },
    noImage: {
      title: '請開啟或拖拽圖片至此處',
      desc: '支援 PNG, JPEG, TIFF, PDF/X 等格式',
      button: '選擇檔案'
    },
    canvas: {
      bleedLabel: '3mm 出血安全區 (Trim Boundary)',
      confirmPaste: '確認貼上',
      cancel: '取消',
      signatureTitle: '加密向量簽名板',
      signatureDesc: '在觸控板簽署後以 Touch ID 解鎖',
      securityLevel: '安全等級: AES-256',
      signatureBtn: '使用 Touch ID 簽署'
    },
    tabs: {
      adjust: '影像調整',
      print: '一鍵印刷',
      ai: 'AI 助理',
      edit: '影像編輯'
    },
    adjustPanel: {
      title: '非破壞性色彩修訂 (WebGL 加速)',
      exposure: '曝光度 (Exposure)',
      brightness: '亮度 (Brightness)',
      contrast: '對比度 (Contrast)',
      saturation: '飽和度 (Saturation)',
      bakeBtn: '套用色調變更 (Bake)',
      gamutTitle: 'CMYK 印刷色域預檢',
      gamutBtn: '預檢',
      gamutDesc: '打開後系統將以紫色斜線標示出超出 Coated FOGRA39 的高飽和度印刷失真色彩。'
    },
    printPanel: {
      title: '一鍵物理規格重設',
      orientation: '版面方向 (Orientation)',
      portrait: '直向',
      landscape: '橫向',
      customSize: '自訂規格',
      width: '寬度 (mm)',
      height: '高度 (mm)',
      pixelCalc: '實體列印像素計算',
      targetSize: '目標尺寸:',
      resolution: '解析度:',
      requiredPixels: '所需寬高:',
      currentImgSize: '目前影像尺寸:',
      formula: '計算公式: (尺寸 / 25.4) * DPI = 所需像素',
      sufficient: '✅ 目前影像解析度充足！適合高品質印刷輸出（匯出時將自動重採樣優化縮圖）。',
      insufficientBilinear: '⚠️ 原始影像解析度不足！印刷輸出會被拉伸放大。目前設定為 Bilinear 模糊拉伸。建議在下方調校助理切換為 [Lanczos-3] 超採樣放大，或更換更高解析度圖檔。',
      insufficientLanczos: 'ℹ️ 原始解析度不足，但免擔心！系統已配置 [{algo}] 智慧超採樣，匯出時將自動重採樣重建放大至 {w} x {h} px 以滿足 {dpi} DPI 滿版印刷，無需降低 DPI！',
      optimizerTitle: '印前縮放與品質調校助理',
      qualityRating: '輸出品質評級:',
      qualityPerfect: '🌟 完美 (Perfect)',
      qualityFine: '🟢 優良 (Fine)',
      qualityAcceptable: '🟡 接受 (Acceptable)',
      qualityPoor: '🔴 嚴重不足 (Poor)',
      descPerfect: '適合近距離手持閱讀（如書籍、相冊、傳單）',
      descFine: '適合近觀海報、室內廣告（最佳觀賞距離 0.5~1米）',
      descAcceptable: '適合遠觀海報、展場背景牆（最佳觀賞距離 1~2米）',
      descPoor: '不適合大版面輸出，容易模糊（建議更換圖檔或降低版面尺寸）',
      viewingDistance: '建議最佳觀看距離:',
      metersOrMore: '公尺以上',
      recRes: '此規格建議解析度:',
      applyLimit: '套用建議上限值 ({val} DPI)',
      upscaleLabel: '超採樣放大演算法',
      forceMinDpi: '強制鎖定最低安全解析度 (100 DPI)',
      autoDpi: 'DPI 與目前影像 1:1 無損最佳化適配',
      showBleed: '顯示 3mm 出血線',
      bleedDesc: '在畫面中渲染出血邊框，提示裁切安全線（安全間隔為 3 毫米）。'
    },
    aiPanel: {
      title: '本地端智慧輔助引擎 (ONNX)',
      cutoutTitle: 'AI 智慧去背',
      cutoutAccel: 'CoreML 加速',
      cutoutDesc: '偵測前景色主體並刪除背景，全本地運算不佔用雲端。',
      cutoutBtn: '執行智慧去背',
      redactTitle: '智慧隱私防護遮罩',
      redactAccel: 'OCR 偵測',
      redactDesc: '一鍵自動辨識並模糊：個資身分證、信用卡號碼、人臉。',
      redactBtn: '執行敏感隱私塗黑'
    },
    editPanel: {
      title: '圖片框選與編輯功能',
      desc: '請先在左側工具列啟用「區域框選工具 (M)」，然後在圖片上拖曳滑鼠以框選任何區域。',
      copyBtn: '複製框選區域 (Copy)',
      pasteBtn: '貼上至影像中心 (Paste)',
      deleteBtn: '刪除框選像素 / 取消貼上 (Delete)',
      blurBtn: '模糊框選區域 (Blur)',
      selectionArea: '目前框選範圍',
      startCoords: '起始坐標 (X, Y):',
      dimensions: '寬高尺寸 (W x H):',
      clipboardTitle: '剪貼簿緩衝區 (已就緒)',
      clipboardSize: '尺寸:'
    },
    footer: {
      file: '檔案:',
      dim: '尺寸:',
      physical: '實體尺寸:',
      zoom: '縮放比:',
      targetSpace: '色彩空間:'
    },
    helpModal: {
      title: 'DevPixel 影像與印前調校助手說明',
      close: '關閉 (Esc)',
      tabManual: '📖 功能與操作手冊',
      tabPrivacy: '🔒 隱私權與資料保護政策',
      manual: {
        sections: [
          {
            title: '1. 平移與縮放 (Pan & Zoom)',
            content: '選取左側 平移工具 (H)，在畫布按住滑鼠左鍵即可平移；亦可在任何工具狀態下 長按鍵盤「空白鍵 (Spacebar)」 暫時抓取移動。使用頂部拉桿、縮放按鈕或滾輪可進行縮放。畫布設有安全縮放限制，防視窗逸失。'
          },
          {
            title: '2. 色彩影像調整與烘焙 (Baking)',
            content: '切換到右側「影像調整」分頁，可拉動亮度、曝光度等滑桿透過 WebGL 著色器實時預覽。調整滿意後，必須點擊下方「套用色調變更 (Bake)」按鈕 才能將變更寫入影像像素並寫入歷史紀錄。'
          },
          {
            title: '3. 區域編輯、無痕消除與貼上層',
            content: '選取左側 區域框選工具 (M)，在畫布上拖曳出選取區。複製與貼上：點選複製將像素存入剪貼簿，貼上後會產生一個懸浮貼上層。可用滑鼠隨意拖曳定位，雙擊或右側點選烘焙寫入畫布。欲移除貼上層，可直接點擊「取消」或按鍵盤 Delete / Backspace 鍵。無痕消除：點選「刪除選取區」或按鍵盤 Delete / Backspace 鍵，系統將自動進行周邊亮度像素的無痕融合補平。隱私模糊：點選「模糊框選區域」會執行高品質的 25x25 強效模糊，使文字徹底不可讀。'
          },
          {
            title: '4. 印刷規格、出血線與調校助理 (Pre-press Optimizer)',
            content: '選取左側 裁切工具 (C) 後，可在右側「一鍵印刷」頁籤進行進階設定。出血線：系統支援直橫向版面方向自動偵測與手動切換，並自動渲染 3mm 裝飾出血邊界框。建議解析度對照：系統會依據選擇規格（如 A0~A5）動態給出建議解析度範圍。點擊 「套用建議上限值」 按鈕，能一鍵將 DPI 設為該規格的上限值，避免檔案容量臃腫。安全 DPI 鎖定：勾選「最低安全解析度」後將鎖定 DPI 下限為 100 DPI，防止解析度過低導致印刷像素化。超採樣放大演算法：提供 Bilinear、Bicubic、Lanczos-3。當原圖尺寸小於目標所需像素時，系統將自動調用 Lanczos-3 印刷級插值重採樣 對影像進行邊緣銳化重建，確保高 DPI 滿版列印品質，無需調降 DPI！'
          },
          {
            title: '5. 本地 AI 去背與隱私防護檢測',
            content: '在右側「AI 助理」頁籤中：點選 AI 智慧去背 可藉由本地端去背引擎移除相片或文件背景，去背後的透明底色可透過畫布下的 16px 棋盤格背景清晰辨識；點選 敏感資訊自動掃描 可一鍵搜尋畫面中是否包含個資並引導遮蔽。'
          }
        ],
        shortcutsTitle: '⌨️ 鍵盤快捷鍵對照表 (Shortcuts)',
        shortcuts: [
          { key: 'Space (長按)', desc: '抓手平移' },
          { key: 'Cmd / Ctrl + Z', desc: '復原操作 (Undo)' },
          { key: 'Cmd / Ctrl + Shift + Z', desc: '重做操作 (Redo)' },
          { key: 'Delete / Backspace', desc: '刪除選區 / 撤銷貼上層' },
          { key: 'H', desc: '切換到平移工具' },
          { key: 'C', desc: '切換到裁切工具' },
          { key: 'M', desc: '切換到框選工具' },
          { key: 'A', desc: '切換到向量標記' },
          { key: 'S', desc: '切換到安全簽名' },
          { key: 'F1', desc: '開啟說明視窗' }
        ]
      },
      privacy: {
        bannerTitle: '100% 本地端離線隱私安全宣告',
        bannerContent: 'DevPixel 專案秉持「隱私安全至上 (Privacy First)」原則。所有核心運算均限制在您本地的實體主機上運行，實現真正的實體隔離與零網路隱私洩漏風險。',
        sections: [
          {
            title: '一、100% 本地端運算架構',
            content: '本程式載入的任何影像、照片、手寫文檔及證件，其 WebGL 著色器濾鏡處理、Canvas 向量編輯、像素無痕填充演算法、以及 Lanczos-3 高品質超採樣重採樣放大，全數在您本機瀏覽器 / Tauri 沙盒內部以 CPU 或 GPU 獨立完成，絕對不會上傳至任何雲端伺服器。'
          },
          {
            title: '二、AI 與敏感字元掃描之離線推理',
            content: '內建的 AI 智慧去背（移除亮/暗背景）以及 個資敏感字元 OCR 自動偵測掃描 功能，皆是透過本地編譯之智慧模組直接在您的本機硬體上進行單機計算推理。本程式不含任何外部遙測 (Telemetry) API，個資掃描比對結果僅在前端介面短暫引導標記，不會上傳給任何第三方或進行存檔。'
          },
          {
            title: '三、印前導出與色彩空間轉換安全',
            content: '程式所附帶的 @devpixel/cmyk-wasm 模組是純 Rust 編譯的本地 WebAssembly 模組，其 sRGB 轉 CMYK（FOGRA39 描述檔）、TIFF 及符合 PDF/X-1a 標準之印前 PDF 文件編碼包裝，皆為本機同步進行，直接輸出檔案寫入您硬碟，沒有任何中繼伺服器介入，保證您的商業設計與發行文件 100% 安全保密。'
          },
          {
            title: '四、個資隱私模糊處理 (Redaction)',
            content: '當您使用本程式的「模糊框選區域」功能時，系統將調用 25x25 強效方框模糊 (Box Blur) 內核進行像素混亂，此模糊在數學上具有不可還原性，能確保障蔽後的個資與文字在任何反向解碼下皆維持 100% 無法讀取狀態。'
          }
        ],
        effectiveDate: '中華民國 115 年 (2026年) 07 月 11 日修訂並生效。若您在使用本程式時處於完全斷網狀態，所有功能均可無縫離線運作，敬請安心使用。'
      }
    },
    alerts: {
      autoMatchedDpi: '已自動適配最佳印刷解析度: {dpi} DPI (1:1 像素無損輸出)',
      undoSuccess: '已復原上一步操作',
      redoSuccess: '已重做下一步操作',
      toneApplied: '色調調整已成功套用！',
      toneFailed: '套用調色失敗: {err}',
      fileClosed: '檔案已關閉。',
      copyPrompt: '請先在畫布上框選一個區域再進行複製。',
      copySuccess: '已複製選取區域！',
      deletePrompt: '請先在畫布上框選一個區域再進行刪除。',
      pasteCancel: '已取消並移除貼上圖層！',
      deleteSuccess: '已刪除選取區域並使用周邊色彩補平！',
      blurPrompt: '請先在畫布上框選一個區域再進行模糊。',
      blurSuccess: '已模糊框選區域！',
      pastePrompt: '剪貼簿目前為空，請先複製一個區域。',
      pasteReady: '已貼上懸浮影像！可用滑鼠在畫布上自由拖曳移動它，最後點選確認貼上。',
      pasteConfirm: '已完成貼上與合併影像！',
      loadOnnx: '載入 ONNX 去背模型...',
      recognizingCutout: '辨識主體邊緣並執行透明度遮罩中...',
      cutoutSuccess: '去背完成 (本地 WebGPU 加速)',
      scanningOcr: '掃描敏感個資中 (OCR: 身分證、卡號、人臉)...',
      scanOcrResultAlert: '【DevPixel AI 隱私防護掃描】\n\n掃描完畢！在此文件中未偵測到典型的「身分證字號、信用卡號、或人臉」。\n\n💡 提示：您可以使用左側的「區域框選工具 (M)」框住 any 敏感個資（例如數字或關鍵字），接著在右側「影像編輯」分頁點選「模糊框選區域」進行手動安全遮罩。',
      scanOcrSuccess: '掃描完成，未偵測到敏感個資。',
      convertingColor: '正在進行色彩轉換與印刷封裝...',
      pngExportSuccess: 'sRGB PNG 匯出成功！',
      exportSuccess: '{format} 匯出成功！',
      exportSuccessAlert: '【DevPixel 印刷匯出成功】\n檔名: {filename}\n尺寸: {size}\n解析度: {dpi} DPI\n位元深度: 8-bit CMYK\n\n檔案已完美包含輸出目的描述檔 (Fogra39) 與印刷裁切框設定！',
      exportFailed: '匯出失敗: {err}',
      appliedRes: '已套用本尺寸建議最佳解析度: {dpi} DPI'
    },
    presets: {
      A0: 'A0 超大版面看板，建議觀賞距離 > 2 米。調低解析度能大幅縮減檔案大小，且列印效果極佳。',
      A1: 'A1 大型展板與海報，建議觀賞距離 1.5 ~ 2 米。150 DPI 已能保證絕佳視覺完整度。',
      A2: 'A2 中型展會海報與掛軸，建議觀賞距離 1 ~ 1.5 米。200 DPI 可兼顧容量與細緻度。',
      A3B4: 'A3/B4 宣傳海報與精緻菜單，建議觀賞距離 0.5 ~ 1 米。250 DPI 能呈現清晰文字細節。',
      customLarge: '超大自訂規格，建議觀賞距離 > 2 米。適度調低 DPI 能顯著優化檔案大小，輸出不受影響。',
      customMedLarge: '中大自訂規格，建議觀賞距離 1 ~ 2 米。180 DPI 是可平衡輸出與細節的建議值。',
      customMed: '中型自訂印刷，建議觀賞距離 0.5 ~ 1 米。250 DPI 能展現充足的細部細節。',
      customSmall: '小型手持印刷規格，建議觀賞距離 < 0.5 米。建議設定至少 600 DPI 以呈現精緻細節。',
      defaultHandheld: '手持閱讀書冊、證件照或精緻相片，建議觀賞距離 < 0.5 米。必須設定 300 ~ 600 DPI 才能保證近看文字無顆粒感。'
    }
  },
  'zh-CN': {
    studioMode: '工作室模式',
    fitCanvas: '适应画布',
    resetAdjustments: '重设调整',
    printResolution: '印刷输出分辨率',
    dpi72: '72 DPI (网页)',
    dpi150: '150 DPI (普通复印)',
    dpi300: '300 DPI (专业印刷)',
    dpiCustom: '自定义 DPI',
    dpiValue: '数值',
    saveAndExport: '另存與导出',
    savePNG: '另存一般图片 (PNG)',
    savePNGDesc: '适用于网页分享、一般屏幕看图（sRGB 色彩空间）。',
    saveTIFF: '另存普通印相档 (TIFF)',
    saveTIFFDesc: '适用于普通复印、冲印店印刷（CMYK 色彩空间）。',
    savePDF: '另存专业 PDF/X 印刷档',
    savePDFDesc: '适用于印刷厂、大量出版印制（含 3mm 出血线与色彩宣告）。',
    closeFile: '关闭当前档案 (Close File)',
    closeFileDesc: '清除工作区并回到上传主画面。',
    tooltips: {
      openFile: '开启新档案',
      panZoom: '平移与缩放 (H)',
      crop: '印刷尺寸裁切 (C)',
      markup: '向量标记工具 (A)',
      signature: '指纹安全签名 (S)',
      marquee: '区域框选工具 (M)',
      help: '操作指引与快捷键说明 (F1)'
    },
    dragOverlay: {
      title: '拖拽图片至此处载入',
      desc: '支持 PNG, JPEG, TIFF, RAW 格式'
    },
    noImage: {
      title: '请开启或拖拽图片至此处',
      desc: '支持 PNG, JPEG, TIFF, PDF/X 等格式',
      button: '选择档案'
    },
    canvas: {
      bleedLabel: '3mm 出血安全区 (Trim Boundary)',
      confirmPaste: '确认粘贴',
      cancel: '取消',
      signatureTitle: '加密向量签名板',
      signatureDesc: '在触控板签署后以 Touch ID 解锁',
      securityLevel: '安全等级: AES-256',
      signatureBtn: '使用 Touch ID 签署'
    },
    tabs: {
      adjust: '影像调整',
      print: '一键印刷',
      ai: 'AI 助理',
      edit: '影像编辑'
    },
    adjustPanel: {
      title: '非破坏性色彩修订 (WebGL 加速)',
      exposure: '曝光度 (Exposure)',
      brightness: '亮度 (Brightness)',
      contrast: '对比度 (Contrast)',
      saturation: '饱和度 (Saturation)',
      bakeBtn: '套用色调变更 (Bake)',
      gamutTitle: 'CMYK 印刷色域预检',
      gamutBtn: '预检',
      gamutDesc: '打开后系统将以紫色斜线标示出超出 Coated FOGRA39 的高饱和度印刷失真色彩。'
    },
    printPanel: {
      title: '一键物理规格重设',
      orientation: '版面方向 (Orientation)',
      portrait: '直向',
      landscape: '横向',
      customSize: '自定义规格',
      width: '宽度 (mm)',
      height: '高度 (mm)',
      pixelCalc: '实体列印像素计算',
      targetSize: '目标尺寸:',
      resolution: '分辨率:',
      requiredPixels: '所需宽高:',
      currentImgSize: '目前影像尺寸:',
      formula: '计算公式: (尺寸 / 25.4) * DPI = 所需像素',
      sufficient: '✅ 目前影像分辨率充足！适合高质量印刷输出（导出时将自动重采样优化缩图）。',
      insufficientBilinear: '⚠️ 原始影像分辨率不足！印刷输出会被拉伸放大。目前设定为 Bilinear 模糊拉伸。建议在下方调校助理切换为 [Lanczos-3] 超采样放大，或更换更高分辨率图档。',
      insufficientLanczos: 'ℹ️ 原始分辨率不足，但免担心！系统已配置 [{algo}] 智慧超采样，导出时将自动重采样重建放大至 {w} x {h} px 以满足 {dpi} DPI 满版印刷，无需降低 DPI！',
      optimizerTitle: '印前缩放与品质调校助理',
      qualityRating: '输出品质评级:',
      qualityPerfect: '🌟 完美 (Perfect)',
      qualityFine: '🟢 优良 (Fine)',
      qualityAcceptable: '🟡 接受 (Acceptable)',
      qualityPoor: '🔴 严重不足 (Poor)',
      descPerfect: '适合近距离手持阅读（如书籍、相册、传单）',
      descFine: '适合近观海报、室内广告（最佳观赏距离 0.5~1米）',
      descAcceptable: '适合远观海报、展场背景墙（最佳观赏距离 1~2米）',
      descPoor: '不适合大版面输出，容易模糊（建议更换图档或降低版面尺寸）',
      viewingDistance: '建议最佳观看距离:',
      metersOrMore: '公尺以上',
      recRes: '此规格建议分辨率:',
      applyLimit: '套用建议上限值 ({val} DPI)',
      upscaleLabel: '超采样放大算法',
      forceMinDpi: '强制锁定最低安全分辨率 (100 DPI)',
      autoDpi: 'DPI 与目前影像 1:1 无损最佳化适配',
      showBleed: '显示 3mm 出血线',
      bleedDesc: '在画面中渲染出血边框，提示裁切安全线（安全间隔为 3 毫米）。'
    },
    aiPanel: {
      title: '本地端智慧辅助引擎 (ONNX)',
      cutoutTitle: 'AI 智慧去背',
      cutoutAccel: 'CoreML 加速',
      cutoutDesc: '侦测前景色主体并删除背景，全本地运算不占用云端。',
      cutoutBtn: '执行智慧去背',
      redactTitle: '智慧隐私防护遮罩',
      redactAccel: 'OCR 侦测',
      redactDesc: '一键自动辨识并模糊：个资身份证、信用卡号码、人脸。',
      redactBtn: '执行敏感隐私涂黑'
    },
    editPanel: {
      title: '图片框选与编辑功能',
      desc: '请先在左侧工具列启用「区域框选工具 (M)」，然后在图片上拖曳鼠标以框选任何区域。',
      copyBtn: '复制框选区域 (Copy)',
      pasteBtn: '粘贴至影像中心 (Paste)',
      deleteBtn: '删除框选像素 / 取消粘贴 (Delete)',
      blurBtn: '模糊框选区域 (Blur)',
      selectionArea: '目前框选范围',
      startCoords: '起始坐标 (X, Y):',
      dimensions: '宽高尺寸 (W x H):',
      clipboardTitle: '剪贴簿缓冲区 (已就绪)',
      clipboardSize: '尺寸:'
    },
    footer: {
      file: '档案:',
      dim: '尺寸:',
      physical: '实体尺寸:',
      zoom: '缩放比:',
      targetSpace: '色彩空间:'
    },
    helpModal: {
      title: 'DevPixel 影像与印前调校助手说明',
      close: '关闭 (Esc)',
      tabManual: '📖 功能与操作手册',
      tabPrivacy: '🔒 隐私权与数据保护政策',
      manual: {
        sections: [
          {
            title: '1. 平移与缩放 (Pan & Zoom)',
            content: '选取左侧 平移工具 (H)，在画布按住鼠标左键即可平移；亦可在任何工具状态下 长按键盘「空格键 (Spacebar)」 暂时抓取移动。使用顶部拉杆、缩放按钮或滚轮可进行缩放。画布设有安全缩放限制，防视窗逸失。'
          },
          {
            title: '2. 色彩影像调整与烘焙 (Baking)',
            content: '切换到右侧「影像调整」分页，可拉动亮度、曝光度等滑杆透过 WebGL 着色器实时预览。调整满意后，必须点击下方「套用色调变更 (Bake)」按钮 才能将变更写入影像像素并写入历史纪录。'
          },
          {
            title: '3. 区域编辑、无痕消除与贴上层',
            content: '选取左侧 区域框选工具 (M)，在画布上拖曳出选区。复制与贴上：点选复制将像素存入剪贴簿，贴上后會产生一个悬浮贴上层。可用鼠标随意拖曳定位，双击或右侧点选烘焙写入画布。欲移除贴上层，可直接点击「取消」或按键盘 Delete / Backspace 键。无痕消除：点选「删除选区」或按键盘 Delete / Backspace 键，系统将自动进行周边亮度像素的无痕融合补平。隐私模糊：点选「模糊框选区域」会执行高质量的 25x25 强效模糊，使文字彻底不可读。'
          },
          {
            title: '4. 印刷规格、出血线與调校助理 (Pre-press Optimizer)',
            content: '选取左侧 裁切工具 (C) 后，可在右侧「一键印刷」页签进行进阶设定。出血线：系统支持直横向版面方向自动侦测与手动切换，并自动渲染 3mm 虚线出血边界框。建议分辨率对照：系统会依据选择规格（如 A0~A5）动态给出建议分辨率范围。点击 「套用建议上限值」 按钮，能一键將 DPI 设为該规格的上限值，避免档案容量臃肿。安全 DPI 锁定：勾选「最低分辨率」后将锁定 DPI 下限为 100 DPI，防止分辨率过低导致印刷像素化。超采样放大算法：提供 Bilinear、Bicubic、Lanczos-3。当原图尺寸小于目标所需像素时，系统将自动调用 Lanczos-3 印刷级插值重采样 对影像进行边缘锐化重建，确保高 DPI 满版列印品质，无需调降 DPI！'
          },
          {
            title: '5. 本地 AI 去背與隐私防护检测',
            content: '在右侧「AI 助理」页签中：点选 AI 智慧去背 可藉由本地端去背引擎移除相片或文件背景，去背後的透明底色可透过画布下的 16px 棋盘格背景清晰辨识；点选 敏感资讯自动扫描 可一键搜寻画面中是否包含个资并引导遮蔽。'
          }
        ],
        shortcutsTitle: '⌨️ 键盘快捷键对照表 (Shortcuts)',
        shortcuts: [
          { key: 'Space (长按)', desc: '抓手平移' },
          { key: 'Cmd / Ctrl + Z', desc: '复原操作 (Undo)' },
          { key: 'Cmd / Ctrl + Shift + Z', desc: '重做操作 (Redo)' },
          { key: 'Delete / Backspace', desc: '删除选区 / 撤销贴上层' },
          { key: 'H', desc: '切换到平移工具' },
          { key: 'C', desc: '切换到裁切工具' },
          { key: 'M', desc: '切换到框选工具' },
          { key: 'A', desc: '切换到向量标记' },
          { key: 'S', desc: '切换到安全签名' },
          { key: 'F1', desc: '开启说明视窗' }
        ]
      },
      privacy: {
        bannerTitle: '100% 本地端离线隐私安全宣告',
        bannerContent: 'DevPixel 项目秉持「隐私安全至上 (Privacy First)」原则。所有核心运算均限制在您本地的实体主机上运行，实现真正的实体隔离与零网络隐私泄露风险。',
        sections: [
          {
            title: '一、100% 本地端运算架构',
            content: '本程序载入的任何影像、照片、手写文档及证件，其 WebGL 着色器过滤处理、Canvas 向量编辑、像素无痕填充算法、以及 Lanczos-3 高质量超采样重采样放大，全数在您本机浏览器 / Tauri 沙盒内部以 CPU 或 GPU 独立完成，绝对不会上传至任何云端服务器。'
          },
          {
            title: '二、AI 与敏感字元扫描之离线推理',
            content: '内建的 AI 智慧去背（移除亮/暗背景）以及 个资敏感字元 OCR 自动侦测扫描 功能，皆是透过本地编译之智慧模组直接在您的本机硬件上进行单机计算推理。本程序不含任何外部遥测 (Telemetry) API，个资扫描比对结果仅在前端界面短暂引导标记，不会上传给任何第三方或进行存档。'
          },
          {
            title: '三、印前导出与色彩空间转换安全',
            content: '程序所附带的 @devpixel/cmyk-wasm 模组是纯 Rust 编译的本地 WebAssembly 模组，其 sRGB 转 CMYK（FOGRA39 描述档）、TIFF 及符合 PDF/X-1a 标准之印前 PDF 文件编码包装，皆为本机同步进行，直接输出文件写入您硬盘，没有任何中继服务器介入，保证您的商业设计与发行文件 100% 安全保密。'
          },
          {
            title: '四、个资隐私模糊处理 (Redaction)',
            content: '当您使用本程序的「模糊框选区域」功能时，系统将调用 25x25 强效方框模糊 (Box Blur) 内核进行像素混乱，此模糊在数学上具有不可还原性，能确保障蔽后的个资与文字在任何反向解码下皆维持 100% 无法读取状态。'
          }
        ],
        effectiveDate: '公元 2026年 07 月 11 日修订并生效。若您在使用本程序时处于完全断网状态，所有功能均可无缝离线运作，敬请安心使用。'
      }
    },
    alerts: {
      autoMatchedDpi: '已自动适配最佳印刷分辨率: {dpi} DPI (1:1 像素无损输出)',
      undoSuccess: '已复原上一步操作',
      redoSuccess: '已重做下一步操作',
      toneApplied: '色调调整已成功套用！',
      toneFailed: '套用调色失败: {err}',
      fileClosed: '档案已关闭。',
      copyPrompt: '请先在画布上框选一个区域再进行复制。',
      copySuccess: '已复制选取区域！',
      deletePrompt: '请先在画布上框選一个区域再进行删除。',
      pasteCancel: '已取消并移除贴上图层！',
      deleteSuccess: '已删除选取区域并使用周边色彩补平！',
      blurPrompt: '请先在画布上框选一個区域再进行模糊。',
      blurSuccess: '已模糊框选区域！',
      pastePrompt: '剪贴簿目前为空，请先复制一个区域。',
      pasteReady: '已贴上悬浮影像！可用鼠标在画布上自由拖曳移动它，最后点选确认贴上。',
      pasteConfirm: '已完成贴上与合并影像！',
      loadOnnx: '载入 ONNX 去背模型...',
      recognizingCutout: '辨识主体边缘并执行透明度遮罩中...',
      cutoutSuccess: '去背完成 (本地 WebGPU 加速)',
      scanningOcr: '扫描敏感个资中 (OCR: 身份证、卡号、人脸)...',
      scanOcrResultAlert: '【DevPixel AI 隐私防护扫描】\n\n扫描完毕！在此文件中未侦测到典型的「身份证字号、信用卡号、或人脸」。\n\n💡 提示：您可以使用左侧的「区域框选工具 (M)」框住 any 敏感个资（例如数字或关键字），接着在右侧「影像编辑」分页点选「模糊框选区域」进行手动安全遮罩。',
      scanOcrSuccess: '扫描完成，未侦测到敏感个资。',
      convertingColor: '正在进行色彩转换与印刷封装...',
      pngExportSuccess: 'sRGB PNG 导出成功！',
      exportSuccess: '{format} 导出成功！',
      exportSuccessAlert: '【DevPixel 印刷导出成功】\n档名: {filename}\n尺寸: {size}\n分辨率: {dpi} DPI\n位元深度: 8-bit CMYK\n\n档案已完美包含输出目的描述档 (Fogra39) 与印刷裁切框设定！',
      exportFailed: '导出失败: {err}',
      appliedRes: '已套用本尺寸建议最佳分辨率: {dpi} DPI'
    },
    presets: {
      A0: 'A0 超大版面看板，建议观赏距离 > 2 米。调低分辨率能大幅缩减档案大小，且列印效果极佳。',
      A1: 'A1 大型展板与海报，建议观赏距离 1.5 ~ 2 米。150 DPI 已能保证绝佳视觉完整度。',
      A2: 'A2 中型展会海报与挂轴，建议观赏距离 1 ~ 1.5 米。200 DPI 可兼顾容量与细致度。',
      A3B4: 'A3/B4 宣传海报与精致菜单，建议观賞距离 0.5 ~ 1 米。250 DPI 能呈现清晰文字细节。',
      customLarge: '超大自订规格，建议观赏距离 > 2 米。适度调低 DPI 能显著优化档案大小，输出不受影响。',
      customMedLarge: '中大自订规格，建议观赏距离 1 ~ 2 米。180 DPI 是可平衡输出与细节的建议值。',
      customMed: '中型自订印刷，建议觀賞距離 0.5 ~ 1 米。250 DPI 能展现充足的细部细节。',
      customSmall: '小型手持印刷规格，建议观赏距离 < 0.5 米。建议设定至少 600 DPI 以呈现精致细节。',
      defaultHandheld: '手持阅读书册、证件照或精致相片，建议观赏距离 < 0.5 米。必须设定 300 ~ 600 DPI 才能保证近看文字无颗粒感。'
    }
  },
  ja: {
    studioMode: 'スタジオモード',
    fitCanvas: 'キャンバスに合わせる',
    resetAdjustments: '調整をリセット',
    printResolution: '印刷出力解像度',
    dpi72: '72 DPI (Web)',
    dpi150: '150 DPI (一般コピー)',
    dpi300: '300 DPI (プロ印刷)',
    dpiCustom: 'カスタム DPI',
    dpiValue: '値',
    saveAndExport: '保存と書き出し',
    savePNG: '一般画像として保存 (PNG)',
    savePNGDesc: 'Web共有や一般的な画面表示に適しています (sRGB)。',
    saveTIFF: '一般写真用として保存 (TIFF)',
    saveTIFFDesc: 'コピーショップや写真印刷に適しています (CMYK)。',
    savePDF: 'プロフェッショナルPDF/X印刷ファイルとして保存',
    savePDFDesc: '印刷所や大量出版に適しています (3mmの塗り足しとカラープロファイルを含む)。',
    closeFile: '現在のファイルを閉じる',
    closeFileDesc: 'ワークスペースをクリアしてアップロード画面に戻ります。',
    tooltips: {
      openFile: '新しいファイルを開く',
      panZoom: 'パンとズーム (H)',
      crop: '印刷サイズに切り抜き (C)',
      markup: 'ベクターマークアップツール (A)',
      signature: 'セキュア署名 (S)',
      marquee: '矩形選択ツール (M)',
      help: 'ヘルプとショートカット (F1)'
    },
    dragOverlay: {
      title: '画像をここにドラッグして読み込む',
      desc: 'PNG, JPEG, TIFF, RAW 形式に対応'
    },
    noImage: {
      title: '画像を開くか、ここにドラッグしてください',
      desc: 'PNG, JPEG, TIFF, PDF/X 形式などに対応',
      button: 'ファイルを選択'
    },
    canvas: {
      bleedLabel: '3mm塗り足し安全エリア (Trim Boundary)',
      confirmPaste: '貼り付けを確定',
      cancel: 'キャンセル',
      signatureTitle: '暗号化ベクター署名ボード',
      signatureDesc: 'タッチパッドで署名後、Touch IDでロック解除',
      securityLevel: 'セキュリティレベル: AES-256',
      signatureBtn: 'Touch IDで署名'
    },
    tabs: {
      adjust: '画像調整',
      print: 'ワンクリック印刷',
      ai: 'AIアシスタント',
      edit: '画像編集'
    },
    adjustPanel: {
      title: '非破壊カラー編集 (WebGL加速)',
      exposure: '露出量 (Exposure)',
      brightness: '明るさ (Brightness)',
      contrast: 'コントラスト (Contrast)',
      saturation: '彩度 (Saturation)',
      bakeBtn: '色調変更を適用 (Bake)',
      gamutTitle: 'CMYK印刷色域プレビュー',
      gamutBtn: 'プレビュー',
      gamutDesc: '有効にすると、Coated FOGRA39印刷範囲外の高彩度で印刷時にくすむ色が紫色の斜線で表示されます。'
    },
    printPanel: {
      title: 'ワンクリック仕様リセット',
      orientation: '用紙の向き (Orientation)',
      portrait: '縦向き',
      landscape: '横向き',
      customSize: 'カスタムサイズ',
      width: '幅 (mm)',
      height: '高さ (mm)',
      pixelCalc: '印刷ピクセル計算',
      targetSize: 'ターゲットサイズ:',
      resolution: '解像度:',
      requiredPixels: '必要なピクセル:',
      currentImgSize: '現在の画像サイズ:',
      formula: '計算式: (サイズ / 25.4) * DPI = 必要ピクセル数',
      sufficient: '✅ 現在の画像解像度は十分です！高品質な印刷出力に適しています（書き出し時に自動でリサンプリング最適化されます）。',
      insufficientBilinear: '⚠️ 元画像の解像度が不足しています！印刷時に引き伸ばされます。現在バイリニア補間に設定されています。下の品質アシスタントで [Lanczos-3] 超解像に変更するか、高解像度の画像に変更することをお勧めします。',
      insufficientLanczos: 'ℹ️ 解像度が不足していますが、ご安心ください！システムは [{algo}] 補間に設定されています。書き出し時に {dpi} DPI印刷を満たすよう、自動的に {w} x {h} px にアップスケーリングされます。',
      optimizerTitle: 'プリプレススケーリング＆品質アシスタント',
      qualityRating: '出力品質評価:',
      qualityPerfect: '🌟 完璧 (Perfect)',
      qualityFine: '🟢 良好 (Fine)',
      qualityAcceptable: '🟡 許容 (Acceptable)',
      qualityPoor: '🔴 不足 (Poor)',
      descPerfect: '近距離で読む冊子、アルバム、チラシに適しています',
      descFine: 'ポスター、屋内広告（最適な視聴距離 0.5〜1m）に適しています',
      descAcceptable: '遠くから見るポスター、展示会の背景壁（最適な視聴距離 1〜2m）に適しています',
      descPoor: '大判出力には適しておらず、ぼやける可能性があります（高解像度の画像にするか印刷サイズを小さくしてください）',
      viewingDistance: '推奨最適視聴距離:',
      metersOrMore: 'メートル以上',
      recRes: 'このサイズでの推奨解像度:',
      applyLimit: '推奨上限値を適用 ({val} DPI)',
      upscaleLabel: 'アップサンプリングアルゴリズム',
      forceMinDpi: '最小安全解像度 (100 DPI) を強制ロック',
      autoDpi: 'DPIと画像を1:1で劣化なく最適化適合',
      showBleed: '3mmの塗り足し線を表示',
      bleedDesc: '塗り足し境界線を描画し、カット安全線（3mm余白）を示します。'
    },
    aiPanel: {
      title: 'ローカルAIアシスタントエンジン (ONNX)',
      cutoutTitle: 'AIスマート背景切り抜き',
      cutoutAccel: 'CoreML 加速',
      cutoutDesc: '前景の被写体を検出し、背景を削除します。ローカルで完全にオフラインで動作。',
      cutoutBtn: 'スマート切り抜きを実行',
      redactTitle: 'スマートプライバシーマスク',
      redactAccel: 'OCR検出',
      redactDesc: 'ワンクリックで個人情報（身分証明書、カード番号、顔）を自動検出してぼかします。',
      redactBtn: 'プライバシー非表示処理を実行'
    },
    editPanel: {
      title: '矩形選択と画像編集機能',
      desc: '左のツールバーで「矩形選択ツール (M)」を有効にし、画像上をドラッグして領域を選択してください。',
      copyBtn: '選択範囲をコピー (Copy)',
      pasteBtn: 'キャンバス中央に貼り付け (Paste)',
      deleteBtn: '選択範囲の削除 / 貼り付けキャンセル (Delete)',
      blurBtn: '選択範囲をぼかす (Blur)',
      selectionArea: '現在の選択範囲',
      startCoords: '開始座標 (X, Y):',
      dimensions: '幅と高さ (W x H):',
      clipboardTitle: 'クリップボードプレビュー',
      clipboardSize: 'サイズ:'
    },
    footer: {
      file: 'ファイル:',
      dim: '画像解像度:',
      physical: '印刷サイズ:',
      zoom: 'ズーム:',
      targetSpace: '色空間:'
    },
    helpModal: {
      title: 'DevPixel 画像＆プリプレス調整アシスタント ヘルプ',
      close: '閉じる (Esc)',
      tabManual: '📖 機能と操作マニュアル',
      tabPrivacy: '🔒 プライバシーポリシー',
      manual: {
        sections: [
          {
            title: '1. パンとズーム (Pan & Zoom)',
            content: '左側の「手ツール (H)」を選択し、キャンバス上を左ドラッグで移動できます。他のツールを使用中でも、キーボードの「スペースキー」を長押しすることで一時的にドラッグ移動が可能です。画面上部のスライダー、ズームボタン、またはマウスホイールで拡大・縮小できます。安全ズーム制限により画像の紛失を防ぎます。'
          },
          {
            title: '2. カラー調整と適用 (Baking)',
            content: '右側の「画像調整」タブで、明るさや露出量などをWebGLシェーダーでリアルタイムプレビューしながら調整できます。調整が完了したら、必ず下の「色調変更を適用 (Bake)」ボタンをクリックしてピクセルデータに適用し、履歴に保存してください。'
          },
          {
            title: '3. 選択範囲編集、自動修復、レイヤー貼り付け',
            content: '左側の「矩形選択ツール (M)」を選択し、キャンバス上でドラッグして範囲を作成します。コピー＆ペースト: コピーをクリックしてピクセルをクリップボードに保存します。ペーストするとフローティングレイヤーが生成され、ドラッグで位置調整し、ダブルクリックまたは確定ボタンでキャンバスに結合できます。レイヤーの削除はキャンセルをクリックするか Delete / Backspace キーを押します。自動修復: 「選択範囲を削除」をクリックするか Delete / Backspace キーを押すと、周囲のピクセルから自動的に修復・消去されます。プライバシーぼかし: 「選択範囲をぼかす」をクリックすると、強力な25x25ボックスぼかしを適用し、文字を完全に読み取り不能にします。'
          },
          {
            title: '4. 印刷仕様、塗り足し線、品質アシスタント',
            content: '左側の「切り抜きツール (C)」を選択し、右側の「ワンクリック印刷」タブで詳細設定を行います。塗り足し: 縦・横の自動検出と手動切り替えをサポートし、3mmの塗り足し点線枠をレンダリングします。推奨DPI: 選択した仕様（A0〜A5）に応じて推奨解像度を動的に提示します。「推奨上限値を適用」をクリックすると、ファイルサイズが肥大化するのを防ぎながら最適なDPIに設定できます。DPIロック: 最低安全解像度にチェックを入れるとDPIの下限が100 DPIにロックされ、印刷の粗さを防ぎます。リサンプリング: Bilinear、Bicubic、Lanczos-3を提供。元の画像が印刷ピクセル数より小さい場合、高品質なLanczos-3リサンプリングで自動拡大し、鮮明な印刷品質を保ちます。'
          },
          {
            title: '5. ローカルAI背景切り抜きと個人情報保護スキャン',
            content: '右側の「AIアシスタント」タブで、「スマート切り抜き」をクリックすると、完全ローカルで動作するAI背景切り抜きが実行され、背景が透明化されます。「プライバシー非表示処理」をクリックすると、画像内の個人情報を自動スキャンし、必要に応じてマスキング処理を案内します。'
          }
        ],
        shortcutsTitle: '⌨️ ショートカットキー一覧',
        shortcuts: [
          { key: 'Space (長押し)', desc: 'ドラッグ移動 (Pan)' },
          { key: 'Cmd / Ctrl + Z', desc: '元に戻す (Undo)' },
          { key: 'Cmd / Ctrl + Shift + Z', desc: 'やり直し (Redo)' },
          { key: 'Delete / Backspace', desc: '選択範囲の削除 / レイヤーキャンセル' },
          { key: 'H', desc: '手ツールに切り替え' },
          { key: 'C', desc: '切り抜きツールに切り替え' },
          { key: 'M', desc: '選択ツールに切り替え' },
          { key: 'A', desc: 'マークアップツールに切り替え' },
          { key: 'S', desc: 'セキュア署名に切り替え' },
          { key: 'F1', desc: 'ヘルプ画面を表示' }
        ]
      },
      privacy: {
        bannerTitle: '100% ローカルオフラインプライバシー安全宣言',
        bannerContent: 'DevPixelプロジェクトは、「プライバシーファースト (Privacy First)」を掲げています。すべてのコア処理はお客様のローカル端末内でのみ実行され、外部ネットワークへのデータ漏洩リスクはゼロです。',
        sections: [
          {
            title: '一、100% ローカル処理アーキテクチャ',
            content: '当アプリに読み込まれるすべての画像、写真、ドキュメントは、WebGLによる画像処理、Canvasの編集、ピクセル自動修復、Lanczos-3リサンプリングを含め、すべてローカルブラウザ / Tauriサンドボックス内で処理されます。クラウドサーバーにアップロードされることは一切ありません。'
          },
          {
            title: '二、AIおよび個人情報検出の完全オフライン動作',
            content: '搭載されているAIスマート背景切り抜きや個人情報のOCR自動検出機能は、ローカルに組み込まれたAIエンジンによってデバイス上で推論実行されます。外部テレメトリAPI等は一切含まず、検出結果も一時的にUI上に表示されるのみで、第三者への送信や保存は行われません。'
          },
          {
            title: '三、プリプレス出力と色空間変換の安全性',
            content: '付属の `@devpixel/cmyk-wasm` モジュールは、Rustで記述された完全にローカルなWebAssemblyモジュールです。sRGBからCMYK（FOGRA39）への色空間変換、TIFF書き出し、PDF/X-1a仕様のコンパイルは、すべてお客様のデバイス上で行われ、直接ハードディスクに保存されます。商業デザイン等の機密性も完全に保持されます。'
          },
          {
            title: '四、プライバシーぼかし処理について',
            content: '「選択範囲をぼかす」機能は、数学的に復元不可能な25x25ボックスぼかしを適用します。これにより、マスキング処理された個人情報やテキストは、いかなる解析によっても復元されることはなく、安全性が保証されます。'
          }
        ],
        effectiveDate: '2026年7月11日 改訂・施行。ネットワークから完全に遮断されたオフライン状態でも、すべての機能を安全にご利用いただけます。'
      }
    },
    alerts: {
      autoMatchedDpi: '最適な解像度に自動適合しました: {dpi} DPI (1:1 ピクセルロスレス)',
      undoSuccess: '操作を取り消しました',
      redoSuccess: '操作をやり直しました',
      toneApplied: '色調調整が適用されました。',
      toneFailed: '色調適用失敗: {err}',
      fileClosed: 'ファイルを閉じました。',
      copyPrompt: 'コピーする前に、キャンバス上で領域を選択してください。',
      copySuccess: '選択した領域をコピーしました！',
      deletePrompt: '削除する前に、キャンバス上で領域を選択してください。',
      pasteCancel: 'レイヤーをキャンセルし、削除しました。',
      deleteSuccess: '選択範囲を削除し、周囲の色で塗りつぶしました！',
      blurPrompt: 'ぼかす前に、キャンバス上で領域を選択してください。',
      blurSuccess: '選択範囲をぼかしました！',
      pastePrompt: 'クリップボードが空です。先に領域をコピーしてください。',
      pasteReady: 'レイヤーを貼り付けました！ドラッグで移動し、確定ボタンを押して結合してください。',
      pasteConfirm: 'レイヤーの貼り付けと結合が完了しました。',
      loadOnnx: 'ローカルAI切り抜きモデルを読み込み中...',
      recognizingCutout: '被写体の輪郭を検出して透明マスクを適用中...',
      cutoutSuccess: '背景切り抜き完了 (GPU加速)',
      scanningOcr: '個人情報をスキャン中 (OCR: ID、カード、顔)...',
      scanOcrResultAlert: '【DevPixel AIプライバシースキャン】\n\nスキャン完了！この画像内から典型的な「身分証明書、クレジットカード、顔」は検出されませんでした。\n\n💡 提示: 左の「矩形選択ツール (M)」で個人情報を囲み、右の「画像編集」から「選択範囲をぼかす」で手動でマスクをかけることができます。',
      scanOcrSuccess: 'スキャン完了。個人情報は検出されませんでした。',
      convertingColor: '色変換および印刷用パッケージを作成中...',
      pngExportSuccess: 'sRGB PNG の書き出しが成功しました！',
      exportSuccess: '{format} の書き出しが成功しました！',
      exportSuccessAlert: '【DevPixel 印刷書き出し成功】\nファイル名: {filename}\nサイズ: {size}\n解像度: {dpi} DPI\nビット深度: 8-bit CMYK\n\nファイルに出力インテント (Fogra39) とトリムマーク設定が正しく埋め込まれました！',
      exportFailed: '書き出し失敗: {err}',
      appliedRes: '推奨解像度を適用しました: {dpi} DPI'
    },
    presets: {
      A0: 'A0看板などの超大判仕様。推奨視聴距離は2m以上です。DPIを下げることでファイル容量を大幅に削減できます。',
      A1: 'A1大型ポスター仕様。推奨視聴距離は1.5〜2mです。150 DPIで十分な画質が得られます。',
      A2: 'A2中型ポスターや展示仕様。推奨視聴距離は1〜1.5mです。200 DPIが容量と画質のバランスが良い推奨値です。',
      A3B4: 'A3/B4のチラシやメニュー。推奨視聴距離は0.5〜1mです。250 DPIで文字までくっきり印刷されます。',
      customLarge: '超大型のカスタム仕様。推奨視聴距離は2m以上です。DPIを抑えることで画質を保ったまま容量を最適化できます。',
      customMedLarge: '中大型のカスタム仕様。推奨視聴距離は1〜2mです。180 DPIが最適です。',
      customMed: '中型のカスタム印刷。推奨視聴距離は0.5〜1mです。250 DPIで十分な詳細表現が可能です。',
      customSmall: '小型のカスタム印刷。推奨視聴距離は0.5m未満です。高精細な仕上がりのために600 DPI以上を推奨します。',
      defaultHandheld: '手元で見る書籍、写真、証明写真仕様。推奨視聴距離は0.5m未満です。文字や画像の粒状感を無くすために300〜600 DPIが必須です。'
    }
  },
  ko: {
    studioMode: '스튜디오 모드',
    fitCanvas: '캔버스에 맞춤',
    resetAdjustments: '조정 리셋',
    printResolution: '인쇄 출력 해상도',
    dpi72: '72 DPI (웹)',
    dpi150: '150 DPI (일반 복사)',
    dpi300: '300 DPI (전문 인쇄)',
    dpiCustom: '사용자 정의 DPI',
    dpiValue: '값',
    saveAndExport: '저장 및 내보내기',
    savePNG: '일반 이미지로 저장 (PNG)',
    savePNGDesc: '웹 공유 및 일반 화면 보기에 적합합니다 (sRGB).',
    saveTIFF: '일반 사진용 파일로 저장 (TIFF)',
    saveTIFFDesc: '사진 인쇄 및 인쇄소 출력에 적합합니다 (CMYK).',
    savePDF: '전문 PDF/X 인쇄용 파일로 저장',
    savePDFDesc: '인쇄소 및 대량 출판 인쇄에 적합합니다 (3mm 도련 및 컬러 프로파일 포함).',
    closeFile: '현재 파일 닫기',
    closeFileDesc: '작업 영역을 비우고 업로드 메인 화면으로 돌아갑니다.',
    tooltips: {
      openFile: '새 파일 열기',
      panZoom: '이동 및 확대/축소 (H)',
      crop: '인쇄 크기 자르기 (C)',
      markup: '벡터 마크업 도구 (A)',
      signature: '보안 서명 (S)',
      marquee: '영역 선택 도구 (M)',
      help: '사용법 및 단축키 설명 (F1)'
    },
    dragOverlay: {
      title: '이미지를 여기에 드래그하여 로드',
      desc: 'PNG, JPEG, TIFF, RAW 형식 지원'
    },
    noImage: {
      title: '이미지를 열거나 여기에 드래그하십시오',
      desc: 'PNG, JPEG, TIFF, PDF/X 형식 등 지원',
      button: '파일 선택'
    },
    canvas: {
      bleedLabel: '3mm 도련 안전 영역 (Trim Boundary)',
      confirmPaste: '붙여넣기 확인',
      cancel: '취소',
      signatureTitle: '암호화 벡터 서명판',
      signatureDesc: '터치패드 서명 후 Touch ID로 잠금 해제',
      securityLevel: '보안 등급: AES-256',
      signatureBtn: 'Touch ID로 서명'
    },
    tabs: {
      adjust: '이미지 조정',
      print: '원클릭 인쇄',
      ai: 'AI 어시스턴트',
      edit: '이미지 편집'
    },
    adjustPanel: {
      title: '비파괴 색상 조정 (WebGL 가속)',
      exposure: '노출 (Exposure)',
      brightness: '밝기 (Brightness)',
      contrast: '대비 (Contrast)',
      saturation: '채도 (Saturation)',
      bakeBtn: '색조 변경 적용 (Bake)',
      gamutTitle: 'CMYK 인쇄 색역 소프트 프리뷰',
      gamutBtn: '프리뷰',
      gamutDesc: '활성화하면 Coated FOGRA39 인쇄 범위를 벗어나는 고채도 색상이 보라색 사선으로 표시됩니다.'
    },
    printPanel: {
      title: '원클릭 인쇄 규격 재설정',
      orientation: '방향 (Orientation)',
      portrait: '세로',
      landscape: '가로',
      customSize: '사용자 정의 크기',
      width: '너비 (mm)',
      height: '높이 (mm)',
      pixelCalc: '실제 인쇄 픽셀 계산',
      targetSize: '대상 크기:',
      resolution: '해상도:',
      requiredPixels: '필요한 픽셀:',
      currentImgSize: '현재 이미지 크기:',
      formula: '계산 공식: (크기 / 25.4) * DPI = 필요한 픽셀',
      sufficient: '✅ 현재 이미지 해상도가 충분합니다! 고품질 인쇄에 적합합니다 (내보낼 때 자동 리샘플링 최적화).',
      insufficientBilinear: '⚠️ 원본 해상도가 부족합니다! 인쇄 시 강제로 확대됩니다. 현재 빌리어리어 보간으로 설정되어 있습니다. 아래 품질 어시스턴트에서 [Lanczos-3] 초해상도 업스케일로 변경하거나 더 고해상도 이미지를 사용하십시오.',
      insufficientLanczos: 'ℹ️ 해상도가 부족하지만 걱정하지 마십시오! 시스템이 [{algo}] 업스케일링으로 설정되어 있습니다. 내보낼 때 {dpi} DPI 인쇄를 충족하도록 자동으로 {w} x {h} px로 변환됩니다.',
      optimizerTitle: '프리프레스 스케일링 및 품질 어시스턴트',
      qualityRating: '출력 품질 등급:',
      qualityPerfect: '🌟 완벽 (Perfect)',
      qualityFine: '🟢 우수 (Fine)',
      qualityAcceptable: '🟡 허용 (Acceptable)',
      qualityPoor: '🔴 부족 (Poor)',
      descPerfect: '근거리 독서용 책자, 앨범, 리플릿에 적합',
      descFine: '포스터, 실내 광고 (최적 감상 거리 0.5~1m)에 적합',
      descAcceptable: '원거리 포스터, 전시장 부스 배경 (최적 감상 거리 1~2m)에 적합',
      descPoor: '대형 출력에는 적합하지 않으며 흐리게 출력될 수 있음 (고해상도 이미지 또는 작은 인쇄 크기 추천)',
      viewingDistance: '권장 최적 감상 거리:',
      metersOrMore: '미터 이상',
      recRes: '이 규격의 권장 해상도:',
      applyLimit: '권장 상한값 적용 ({val} DPI)',
      upscaleLabel: '업샘플링 알고리즘',
      forceMinDpi: '최소 안전 해상도 (100 DPI) 강제 고정',
      autoDpi: 'DPI와 이미지를 1:1로 화질 저하 없이 최적화 일치',
      showBleed: '3mm 도련선 표시',
      bleedDesc: '도련 경계선을 캔버스에 그려 재단 안전선(3mm 여백)을 표시합니다.'
    },
    aiPanel: {
      title: '로컬 AI 어시스턴트 엔진 (ONNX)',
      cutoutTitle: 'AI 스마트 배경 지우기',
      cutoutAccel: 'CoreML 가속',
      cutoutDesc: '전경의 피사체를 감지하고 배경을 투명하게 지웁니다. 장치 내 로컬 오프라인 실행.',
      cutoutBtn: '스마트 배경 지우기 실행',
      redactTitle: '스마트 개인정보 보호 마스크',
      redactAccel: 'OCR 감지',
      redactDesc: '원클릭으로 개인정보(신분증, 카드 번호, 얼굴)를 자동 감지하여 모자이크 처리합니다.',
      redactBtn: '개인정보 보호 마스크 실행'
    },
    editPanel: {
      title: '영역 선택 및 이미지 편집 기능',
      desc: '왼쪽 도구 모음에서 「영역 선택 도구 (M)」를 활성화하고 이미지 위를 드래그하여 영역을 선택하십시오.',
      copyBtn: '선택 영역 복사 (Copy)',
      pasteBtn: '이미지 중앙에 붙여넣기 (Paste)',
      deleteBtn: '선택 영역 삭제 / 붙여넣기 취소 (Delete)',
      blurBtn: '선택 영역 흐리게 (Blur)',
      selectionArea: '현재 선택 영역',
      startCoords: '시작 좌표 (X, Y):',
      dimensions: '크기 (W x H):',
      clipboardTitle: '클립보드 임시 버퍼',
      clipboardSize: '크기:'
    },
    footer: {
      file: '파일:',
      dim: '이미지 해상도:',
      physical: '실제 출력 크기:',
      zoom: '확대 비율:',
      targetSpace: '색상 공간:'
    },
    helpModal: {
      title: 'DevPixel 이미지 및 프리프레스 조정 어시스턴트 도움말',
      close: '닫기 (Esc)',
      tabManual: '📖 기능 및 조작 매뉴얼',
      tabPrivacy: '🔒 개인정보 보호 정책',
      manual: {
        sections: [
          {
            title: '1. 이동 및 확대/축소 (Pan & Zoom)',
            content: '왼쪽의 「이동 도구 (H)」를 선택하고 캔버스를 드래그하여 이동할 수 있습니다. 다른 도구를 사용하는 도중에도 키보드의 「스페이스바」를 길게 누르면 임시로 캔버스를 드래그하여 이동할 수 있습니다. 상단 슬라이더, 돋보기 버튼, 마우스 휠을 통해 확대/축소할 수 있으며 캔버스 이탈 방지 기능이 내장되어 있습니다.'
          },
          {
            title: '2. 이미지 조정 및 굽기 (Baking)',
            content: '우측의 「이미지 조정」 탭에서 밝기, 노출 등을 WebGL 셰이더로 실시간 미리 보며 조절할 수 있습니다. 조정을 완료하려면 반드시 하단의 「색조 변경 적용 (Bake)」 버튼을 클릭하여 이미지 픽셀에 기록하고 작업 내역에 저장해야 합니다.'
          },
          {
            title: '3. 영역 편집, 자동 리터칭 및 붙여넣기',
            content: '왼쪽의 「영역 선택 도구 (M)」를 선택하고 드래그하여 선택 영역을 지정합니다. 복사 및 붙여넣기: 복사를 누르면 픽셀이 임시 저장되며, 붙여넣기를 누르면 플로팅 레이어가 생성됩니다. 레이어는 마우스로 이동할 수 있으며 더블 클릭이나 확인을 클릭하여 적용합니다. 취소는 삭제/취소 버튼 또는 Delete/Backspace 키를 누릅니다. 자동 리터칭: 「선택 영역 삭제」를 클릭하거나 Delete/Backspace 키를 누르면 주변 픽셀을 분석하여 자연스럽게 지워집니다. 개인정보 흐리게: 「선택 영역 흐리게」를 누르면 강력한 25x25 박스 블러가 적용되어 텍스트를 판독 불가능하게 만듭니다.'
          },
          {
            title: '4. 인쇄 규격, 도련 및 품질 어시스턴트 (Pre-press Optimizer)',
            content: '왼쪽의 「자르기 도구 (C)」를 선택한 후 우측의 「원클릭 인쇄」 탭에서 상세 설정을 조절합니다. 도련선: 가로/세로 방향 자동 감지 및 수동 전환을 지원하며 3mm 재단 도련선을 빨간 점선으로 보여줍니다. 권장 DPI: 선택한 크기(A0~A5)에 따라 권장 DPI를 계산해줍니다. 「권장 상한값 적용」 버튼을 클릭하면 파일 용량 증가를 막으며 최적의 DPI로 설정할 수 있습니다. DPI 고정: 최소 안전 해상도를 체크하면 해상도가 100 DPI 밑으로 떨어지지 않게 고정합니다. 업스케일 알고리즘: Bilinear, Bicubic, Lanczos-3를 제공하며 원본 이미지가 작을 때 Lanczos-3 인쇄용 보간법을 사용하여 화질을 보존하며 출력합니다.'
          },
          {
            title: '5. 로컬 AI 배경 지우기 및 개인정보 보호 진단',
            content: '우측의 「AI 어시스턴트」 탭에서 「스마트 배경 지우기」를 클릭하면 로컬 AI 엔진이 인물이나 전경을 감지하고 배경을 투명하게 만들어 줍니다. 「개인정보 보호 마스크」를 누르면 이미지 내 개인정보를 자동으로 진단하고 흐리게 처리를 유도합니다.'
          }
        ],
        shortcutsTitle: '⌨️ 키보드 단축키 안내',
        shortcuts: [
          { key: 'Space (길게 누름)', desc: '화면 잡고 이동 (Pan)' },
          { key: 'Cmd / Ctrl + Z', desc: '이전 단계 (Undo)' },
          { key: 'Cmd / Ctrl + Shift + Z', desc: '다음 단계 (Redo)' },
          { key: 'Delete / Backspace', desc: '선택 영역 삭제 / 레이어 취소' },
          { key: 'H', desc: '화면 이동 도구로 전환' },
          { key: 'C', desc: '자르기 도구로 전환' },
          { key: 'M', desc: '영역 선택 도구로 전환' },
          { key: 'A', desc: '마크업 도구로 전환' },
          { key: 'S', desc: '보안 서명으로 전환' },
          { key: 'F1', desc: '도움말 열기' }
        ]
      },
      privacy: {
        bannerTitle: '100% 로컬 오프라인 개인정보 보호 안전 선언',
        bannerContent: '개인정보 보호 최우선 (Privacy First) 원칙을 준수합니다. 모든 핵심 연산은 사용자의 로컬 컴퓨터 내에서 실행되며 외부 유출 위험이 없습니다.',
        sections: [
          {
            title: '일, 100% 로컬 연산 아키텍처',
            content: '본 프로그램에 불러온 모든 이미지, 사진, 개인 문서는 WebGL 이미지 처리, 캔버스 편집, 자동 리터칭, Lanczos-3 리샘플링을 포함하여 모두 오프라인 브라우저 및 Tauri 샌드박스 내부에서 독립적으로 연산되며 외부 서버로 전송되지 않습니다.'
          },
          {
            title: '이, AI 및 개인정보 OCR 스캔의 기기 내 추론',
            content: '내장된 AI 배경 지우기 및 개인정보 OCR 스캔 기능은 장치 내부의 오프라인 스마트 엔진에 의해 실행됩니다. 외부 모니터링 API 등을 일절 포함하지 않으며 진단 결과는 임시로 화면에만 노출될 뿐 저장되거나 업로드되지 않습니다.'
          },
          {
            title: '삼, 안전한 CMYK 색상 변환 및 인쇄 파일 내보내기',
            content: '제공되는 `@devpixel/cmyk-wasm` 모듈은 Rust 기반으로 빌드된 로컬 WebAssembly 모듈입니다. sRGB에서 CMYK (FOGRA39)로의 색상 변환, TIFF 내보내기, PDF/X-1a 변환 빌드는 로컬 기기 내부에서 이루어지며 설계 자산의 보안을 보장합니다.'
          },
          {
            title: '사, 개인정보 모자이크 흐림 처리 (Redaction)',
            content: '「선택 영역 흐리게」 처리는 수학적으로 복구가 불가능한 25x25 박스 블러를 사용하여 가려진 개인정보 및 텍스트 데이터를 확실하게 식별 불가능한 상태로 보존합니다.'
          }
        ],
        effectiveDate: '2026년 7월 11일 개정 및 발효. 완전한 비연결 인터넷(오프라인) 상태에서도 모든 기능이 정상 작동하므로 안심하고 사용해 주십시오.'
      }
    },
    alerts: {
      autoMatchedDpi: '최적의 인쇄 해상도로 맞췄습니다: {dpi} DPI (1:1 픽셀 무손실)',
      undoSuccess: '이전 작업을 취소했습니다',
      redoSuccess: '취소한 작업을 다시 실행했습니다',
      toneApplied: '색조 조정이 성공적으로 적용되었습니다!',
      toneFailed: '색조 적용 실패: {err}',
      fileClosed: '파일이 닫혔습니다.',
      copyPrompt: '복사하려면 먼저 캔버스에 영역을 지정하십시오.',
      copySuccess: '선택 영역을 복사했습니다!',
      deletePrompt: '삭제하려면 먼저 캔버스에 영역을 지정하십시오.',
      pasteCancel: '붙여넣기를 취소하고 레이어를 제거했습니다.',
      deleteSuccess: '선택 영역을 삭제하고 주변 색상으로 채웠습니다!',
      blurPrompt: '흐리게 하려면 먼저 캔버스에 영역을 지정하십시오.',
      blurSuccess: '선택 영역을 흐리게 처리했습니다!',
      pastePrompt: '클립보드가 비어 있습니다. 먼저 영역을 복사하십시오.',
      pasteReady: '레이어를 임시 붙여넣기 했습니다! 드래그하여 이동하고 확인을 눌러 결합하십시오.',
      pasteConfirm: '붙여넣기 및 이미지 결합을 완료했습니다.',
      loadOnnx: '로컬 AI 지우기 모델 로드 중...',
      recognizingCutout: '주체 테두리를 인식하고 투명 마스크를 만드는 중...',
      cutoutSuccess: '배경 지우기 완료 (로컬 GPU 가속)',
      scanningOcr: '개인정보 스캔 중 (OCR: 주민등록증, 카드 번호, 얼굴)...',
      scanOcrResultAlert: '【DevPixel AI 개인정보 보호 진단】\n\n스캔 완료! 이 문서에서 전형적인 「주민등록번호, 신용카드 번호, 얼굴」이 감지되지 않았습니다.\n\n💡 팁: 왼쪽의 「영역 선택 도구 (M)」로 가리고자 하는 개인정보 영역을 지정한 후 우측의 「이미지 편집」에서 「선택 영역 흐리게」를 통해 수동으로 모자이크 처리를 할 수 있습니다.',
      scanOcrSuccess: '스캔 완료. 감지된 개인정보가 없습니다.',
      convertingColor: '색상 변환 및 인쇄 패키징 진행 중...',
      pngExportSuccess: 'sRGB PNG 파일을 성공적으로 내보냈습니다!',
      exportSuccess: '{format} 파일을 성공적으로 내보냈습니다!',
      exportSuccessAlert: '【DevPixel 인쇄 내보내기 완료】\n파일 이름: {filename}\n크기: {size}\n해상도: {dpi} DPI\n색상 깊이: 8-bit CMYK\n\n파일에 Fogra39 출력 인텐트 및 재단선 상자가 정확히 내장되었습니다!',
      exportFailed: '내보내기 실패: {err}',
      appliedRes: '권장 해상도를 적용했습니다: {dpi} DPI'
    },
    presets: {
      A0: 'A0 대형 간판 규격. 감상 거리는 2m 이상입니다. DPI를 낮추면 화질 손상 없이 파일 용량을 대폭 아낄 수 있습니다.',
      A1: 'A1 대형 포스터 규격. 감상 거리는 1.5~2m입니다. 150 DPI만 설정해도 선명하게 보입니다.',
      A2: 'A2 중형 광고 규격. 감상 거리는 1~1.5m입니다. 200 DPI 설정이 최적의 화질과 파일 크기 밸런스를 보여줍니다.',
      A3B4: 'A3/B4 전단지 및 메뉴판 규격. 감상 거리는 0.5~1m입니다. 250 DPI 설정으로 작은 글씨까지 살려냅니다.',
      customLarge: '초대형 규격. 감상 거리는 2m 이상입니다. 적절한 DPI 설정으로 파일 최적화를 진행할 수 있습니다.',
      customMedLarge: '중대형 규격. 감상 거리는 1~2m입니다. 180 DPI 설정을 추천합니다.',
      customMed: '중형 인쇄물 규격. 감상 거리는 0.5~1m입니다. 250 DPI 설정으로 충분히 상세한 묘사가 가능합니다.',
      customSmall: '소형 휴대 규격. 감상 거리는 0.5m 미만입니다. 고해상도 품질을 위해 600 DPI 이상을 추천합니다.',
      defaultHandheld: '책자, 인화용 사진, 증명사진 등 손으로 들고 보는 규격. 감상 거리 0.5m 미만. 인쇄 망점 및 입자감을 없애기 위해 300~600 DPI 설정이 필수입니다.'
    }
  },
  de: {
    studioMode: 'STUDIO-MODUS',
    fitCanvas: 'An Leinwand anpassen',
    resetAdjustments: 'Änderungen zurücksetzen',
    printResolution: 'Druckauflösung',
    dpi72: '72 DPI (Web)',
    dpi150: '150 DPI (Kopieren)',
    dpi300: '300 DPI (Profi-Druck)',
    dpiCustom: 'Eigene DPI',
    dpiValue: 'Wert',
    saveAndExport: 'Speichern & Exportieren',
    savePNG: 'Als Standardbild speichern (PNG)',
    savePNGDesc: 'Geeignet für Webfreigabe und allgemeine Bildschirmanzeige (sRGB).',
    saveTIFF: 'Als Standard-Foto speichern (TIFF)',
    saveTIFFDesc: 'Geeignet für Copyshops und Fotodruck (CMYK).',
    savePDF: 'Als Profi-PDF/X-Druckdatei speichern',
    savePDFDesc: 'Geeignet für Druckereien und Massenpublikationen (inkl. 3mm Anschnitt und Farbprofilen).',
    closeFile: 'Aktuelle Datei schließen',
    closeFileDesc: 'Arbeitsbereich leeren und zum Upload-Bildschirm zurückkehren.',
    tooltips: {
      openFile: 'Neue Datei öffnen',
      panZoom: 'Verschieben & Zoomen (H)',
      crop: 'Druckgröße zuschneiden (C)',
      markup: 'Vektor-Markierungswerkzeug (A)',
      signature: 'Sichere Signatur (S)',
      marquee: 'Auswahlrahmen-Werkzeug (M)',
      help: 'Hilfe & Tastenkombinationen (F1)'
    },
    dragOverlay: {
      title: 'Bild hierher ziehen zum Laden',
      desc: 'Unterstützt die Formate PNG, JPEG, TIFF, RAW'
    },
    noImage: {
      title: 'Bitte öffnen Sie ein Bild oder ziehen Sie es hierher',
      desc: 'Unterstützt PNG, JPEG, TIFF, PDF/X usw.',
      button: 'Datei auswählen'
    },
    canvas: {
      bleedLabel: '3mm Anschnitt-Sicherheitszone (Trim Boundary)',
      confirmPaste: 'Einfügen bestätigen',
      cancel: 'Abbrechen',
      signatureTitle: 'Verschlüsseltes Vektor-Signaturpad',
      signatureDesc: 'Auf Touchpad unterschreiben, dann mit Touch ID freigeben',
      securityLevel: 'Sicherheitsstufe: AES-256',
      signatureBtn: 'Mit Touch ID signieren'
    },
    tabs: {
      adjust: 'Bildanpassung',
      print: 'Ein-Klick-Druck',
      ai: 'AI-Assistent',
      edit: 'Bildbearbeitung'
    },
    adjustPanel: {
      title: 'Zerstörungsfreie Farbanpassung (WebGL)',
      exposure: 'Belichtung',
      brightness: 'Helligkeit',
      contrast: 'Kontrast',
      saturation: 'Sättigung',
      bakeBtn: 'Farbtonänderungen anwenden (Bake)',
      gamutTitle: 'CMYK-Farbraum-Softproofing',
      gamutBtn: 'Prüfen',
      gamutDesc: 'Wenn aktiviert, werden Farbtöne außerhalb des CMYK-Farbraums für Coated FOGRA39 mit violetten Streifen markiert.'
    },
    printPanel: {
      title: 'Ein-Klick-Druckgröße zurücksetzen',
      orientation: 'Ausrichtung',
      portrait: 'Hochformat',
      landscape: 'Querformat',
      customSize: 'Eigene Größe',
      width: 'Breite (mm)',
      height: 'Höhe (mm)',
      pixelCalc: 'Berechnung der physischen Druckpixel',
      targetSize: 'Zielgröße:',
      resolution: 'Auflösung:',
      requiredPixels: 'Benötigte Pixel:',
      currentImgSize: 'Aktuelle Bildgröße:',
      formula: 'Formel: (Größe / 25,4) * DPI = Benötigte Pixel',
      sufficient: '✅ Bildauflösung ist ausreichend! Geeignet für hochwertigen Druck (wird beim Export optimiert).',
      insufficientBilinear: '⚠️ Bildauflösung ist unzureichend! Das Bild wird gestreckt. Derzeit ist Bilinear eingestellt. Wir empfehlen, unten auf [Lanczos-3] umzustellen oder ein Bild mit höherer Auflösung hochzuladen.',
      insufficientLanczos: 'ℹ️ Die Bildauflösung ist unzureichend, aber keine Sorge! Das System ist auf [{algo}]-Upsampling eingestellt. Das Bild wird beim Export automatisch auf {w} x {h} Pixel hochskaliert, um einen {dpi} DPI-Druck ohne Qualitätsverlust zu ermöglichen.',
      optimizerTitle: 'Druckvorbereitungs- und Qualitätsassistent',
      qualityRating: 'Qualitätsbewertung:',
      qualityPerfect: '🌟 Perfekt',
      qualityFine: '🟢 Gut',
      qualityAcceptable: '🟡 Akzeptabel',
      qualityPoor: '🔴 Mangelhaft',
      descPerfect: 'Geeignet für Lektüre aus nächster Nähe (Bücher, Alben, Flyer)',
      descFine: 'Geeignet für Poster, Innenwerbung (Betrachtungsabstand 0,5–1 m)',
      descAcceptable: 'Geeignet für Plakate in der Ferne, Messewände (Betrachtungsabstand 1–2 m)',
      descPoor: 'Mangelhafte Qualität, Neigung zu Unschärfe (höhere Bildauflösung oder kleineres Druckformat empfohlen)',
      viewingDistance: 'Empfohlener Betrachtungsabstand:',
      metersOrMore: 'Meter oder mehr',
      recRes: 'Empfohlene Auflösung für diese Größe:',
      applyLimit: 'Empfohlenes Limit anwenden ({val} DPI)',
      upscaleLabel: 'Skalierungsalgorithmus',
      forceMinDpi: 'Mindestauflösung erzwingen (100 DPI)',
      autoDpi: 'DPI an das Bild 1:1 verlustfrei anpassen',
      showBleed: '3mm Anschnittlinie anzeigen',
      bleedDesc: 'Zeigt die Anschnittgrenzen (3 mm Sicherheitsabstand).'
    },
    aiPanel: {
      title: 'Lokale KI-Engine (ONNX)',
      cutoutTitle: 'KI-Hintergrundentfernung',
      cutoutAccel: 'CoreML-beschleunigt',
      cutoutDesc: 'Vordergrundobjekt erkennen und Hintergrund entfernen. Vollständig offline.',
      cutoutBtn: 'Hintergrund entfernen',
      redactTitle: 'Intelligente Zensurmaske',
      redactAccel: 'OCR-Erkennung',
      redactDesc: 'Automatische Zensur mit einem Klick für: Ausweise, Kreditkarten, Gesichter.',
      redactBtn: 'Zensur ausführen'
    },
    editPanel: {
      title: 'Auswahl & Bildbearbeitung',
      desc: 'Aktivieren Sie das Auswahlrahmen-Werkzeug (M) links und ziehen Sie einen Bereich auf dem Bild auf.',
      copyBtn: 'Auswahl kopieren (Copy)',
      pasteBtn: 'In Bildmitte einfügen (Paste)',
      deleteBtn: 'Auswahl löschen / Einfügen abbrechen (Delete)',
      blurBtn: 'Auswahl weichzeichnen (Blur)',
      selectionArea: 'Aktuelle Auswahl',
      startCoords: 'Startkoordinaten (X, Y):',
      dimensions: 'Abmessungen (W x H):',
      clipboardTitle: 'Zwischenablage-Puffer',
      clipboardSize: 'Größe:'
    },
    footer: {
      file: 'DATEI:',
      dim: 'BILDGRÖSSE:',
      physical: 'PHYSISCH:',
      zoom: 'ZOOM:',
      targetSpace: 'FARBRAUM:'
    },
    helpModal: {
      title: 'DevPixel Bild- und Druckvorbereitungshilfe',
      close: 'Schließen (Esc)',
      tabManual: '📖 Benutzerhandbuch',
      tabPrivacy: '🔒 Datenschutzrichtlinie',
      manual: {
        sections: [
          {
            title: '1. Verschieben & Zoomen (Pan & Zoom)',
            content: 'Wählen Sie links das Hand-Werkzeug (H), klicken und ziehen Sie auf der Leinwand mit der linken Maustaste, um das Bild zu verschieben. Sie können auch in jedem Werkzeug die "Leertaste" gedrückt halten, um das Bild zu verschieben. Zoomen Sie mit dem Regler oben, den Zoomknöpfen oder dem Mausrad. Sicherheitsgrenzen verhindern das Verschwinden des Bildes.'
          },
          {
            title: '2. Bildanpassung & Einbrennen (Baking)',
            content: 'Nutzen Sie die Bildanpassungs-Schieberegler rechts für Echtzeit-Vorschauen über WebGL. Wenn Sie zufrieden sind, müssen Sie auf "Farbtonänderungen anwenden (Bake)" klicken, um die Änderungen dauerhaft auf das Bild anzuwenden.'
          },
          {
            title: '3. Auswahl, Inpainting & Einfügen',
            content: 'Ziehen Sie mit dem Auswahlrahmen-Werkzeug (M) links ein Feld auf dem Bild. Kopieren & Einfügen: Kopiert Pixel in die Zwischenablage. Durch Einfügen entsteht eine schwebende Ebene. Ziehen Sie sie an die gewünschte Position und doppelklicken Sie zum Bestätigen. Klicken Sie zum Entfernen auf Abbrechen oder drücken Sie Entf. Inpainting: Klicken Sie auf Auswahl löschen oder drücken Sie Entf, um den Bereich nahtlos auszufüllen. Weichzeichnen: Verpixeln Sie Text durch Weichzeichnen unlesbar.'
          },
          {
            title: '4. Druckgrößen, Anschnitt & Optimierung',
            content: 'Aktivieren Sie das Zuschneidewerkzeug (C) links und stellen Sie die Optionen unter "Ein-Klick-Druck" rechts ein. Anschnitt: Unterstützt Hoch- und Querformat und zeichnet eine 3-mm-Sicherheitslinie. Empfohlene DPI: Schlägt je nach Format (A0–A5) die passende Auflösung vor. Verwenden Sie "Empfohlenes Limit anwenden", um DPI anzupassen. DPI-Sperre: Verhindert Pixelbildung durch Blockieren niedriger DPI-Werte. Skalierungsalgorithmen: Wenn das Bild zu klein ist, verbessert Lanczos-3 die Kantenqualität beim Vergrößern.'
          },
          {
            title: '5. Offline-KI-Zuschneiden & Datenschutz',
            content: 'Unter "AI-Assistent" können Sie Hintergründe entfernen und sensible Daten durch OCR-Scans aufdecken, um sie anschließend weichzuzeichnen.'
          }
        ],
        shortcutsTitle: '⌨️ Tastenkombinationen',
        shortcuts: [
          { key: 'Leertaste (halten)', desc: 'Hand-Verschieben' },
          { key: 'Cmd / Ctrl + Z', desc: 'Rückgängig' },
          { key: 'Cmd / Ctrl + Shift + Z', desc: 'Wiederholen' },
          { key: 'Entf / Backspace', desc: 'Auswahl löschen / Ebene abbrechen' },
          { key: 'H', desc: 'Hand-Werkzeug aktivieren' },
          { key: 'C', desc: 'Zuschneidewerkzeug aktivieren' },
          { key: 'M', desc: 'Auswahlwerkzeug aktivieren' },
          { key: 'A', desc: 'Markierungswerkzeug aktivieren' },
          { key: 'S', desc: 'Signaturwerkzeug aktivieren' },
          { key: 'F1', desc: 'Hilfe-Dialog öffnen' }
        ]
      },
      privacy: {
        bannerTitle: '100% Offline Datenschutz-Garantie',
        bannerContent: 'Das DevPixel-Projekt verfolgt einen strikten Datenschutz-Ansatz ("Privacy First"). Alle Operationen finden ausschließlich lokal statt. Es werden keine Daten übertragen.',
        sections: [
          {
            title: '1. 100% lokale Rechenarchitektur',
            content: 'Alle geladenen Bilder und Dokumente werden nur in Ihrem Browser bzw. der Tauri-Sandbox verarbeitet. Es erfolgt kein Upload auf Cloud-Server.'
          },
          {
            title: '2. Offline-Inferenz für KI- und OCR-Scans',
            content: 'Hintergrundentfernung und OCR-Erkennung laufen vollständig offline über lokale Algorithmen. Keine Analyse-Tools oder Datenspeicherung.'
          },
          {
            title: '3. Sichere CMYK-Konvertierung und Dateiausgabe',
            content: 'Das Modul `@devpixel/cmyk-wasm` läuft als WebAssembly direkt auf Ihrem Computer. Die Umwandlung in CMYK (FOGRA39) erfolgt ohne Serverzugriffe.'
          },
          {
            title: '4. Unumkehrbare Zensur',
            content: 'Die Zensur durch Weichzeichnen verwendet einen starken 25x25 Box-Blur-Filter. Dieser Vorgang ist mathematisch unumkehrbar, sodass verdeckte Texte sicher geschützt sind.'
          }
        ],
        effectiveDate: 'Gültig ab 11. Juli 2026. Alle Funktionen sind ohne Internetverbindung uneingeschränkt nutzbar.'
      }
    },
    alerts: {
      autoMatchedDpi: 'Optimale Druckauflösung angepasst: {dpi} DPI (1:1 verlustfrei)',
      undoSuccess: 'Aktion rückgängig gemacht',
      redoSuccess: 'Aktion wiederholt',
      toneApplied: 'Farbanpassungen erfolgreich angewendet!',
      toneFailed: 'Farbanpassung fehlgeschlagen: {err}',
      fileClosed: 'Datei geschlossen.',
      copyPrompt: 'Bitte wählen Sie zuerst einen Bereich auf der Leinwand aus.',
      copySuccess: 'Ausgewählter Bereich kopiert!',
      deletePrompt: 'Bitte wählen Sie zuerst einen Bereich aus, um ihn zu löschen.',
      pasteCancel: 'Ebene gelöscht und Einfügen abgebrochen.',
      deleteSuccess: 'Auswahl gelöscht und mit Umgebungsfarben gefüllt!',
      blurPrompt: 'Bitte wählen Sie zuerst einen Bereich aus, um ihn weichzuzeichnen.',
      blurSuccess: 'Ausgewählter Bereich weichgezeichnet!',
      pastePrompt: 'Zwischenablage ist leer. Kopieren Sie zuerst einen Bereich.',
      pasteReady: 'Ebene eingefügt. Verschieben Sie sie und doppelklicken Sie zum Bestätigen.',
      pasteConfirm: 'Ebene erfolgreich eingefügt und verbunden.',
      loadOnnx: 'Lade lokales KI-Modell...',
      recognizingCutout: 'Erkenne Kanten und wende Transparenzmaske an...',
      cutoutSuccess: 'Hintergrund erfolgreich entfernt (lokale GPU)',
      scanningOcr: 'Scanne nach sensiblen Daten (OCR)...',
      scanOcrResultAlert: '【DevPixel KI-Datenschutzscan】\n\nScan abgeschlossen. Es wurden keine typischen Ausweise, Kreditkarten oder Gesichter erkannt.\n\n💡 Tipp: Sie können sensible Daten mit dem Auswahlwerkzeug (M) links markieren und unter "Bildbearbeitung" rechts weichzeichnen.',
      scanOcrSuccess: 'Scan abgeschlossen. Keine sensiblen Daten gefunden.',
      convertingColor: 'Konvertiere Farbraum und erstelle Druckdatei...',
      pngExportSuccess: 'sRGB PNG erfolgreich exportiert!',
      exportSuccess: '{format} erfolgreich exportiert!',
      exportSuccessAlert: '【DevPixel Druckexport erfolgreich】\nDateiname: {filename}\nFormat: {size}\nAuflösung: {dpi} DPI\nFarbtiefe: 8-Bit CMYK\n\nDie Datei enthält das Fogra39 Farbprofil und die Anschnitteinstellungen.',
      exportFailed: 'Export failed: {err}',
      appliedRes: 'Empfohlene Auflösung angewendet: {dpi} DPI'
    },
    presets: {
      A0: 'A0 Billboard, Betrachtungsabstand > 2m. Eine niedrigere DPI reduziert die Dateigröße bei hervorragenden Ergebnissen.',
      A1: 'A1 Poster, Betrachtungsabstand 1,5–2m. 150 DPI sind völlig ausreichend.',
      A2: 'A2 Poster/Banner, Betrachtungsabstand 1–1,5m. 200 DPI ist der optimale Kompromiss aus Details und Dateigröße.',
      A3B4: 'A3/B4 Flyer/Speisekarte, Betrachtungsabstand 0,5–1m. 250 DPI sorgen für gestochen scharfen Text.',
      customLarge: 'Sehr großes Sonderformat, Betrachtungsabstand > 2m. Eine Reduzierung der DPI schont die Systemressourcen.',
      customMedLarge: 'Mittelgroßes Sonderformat, Betrachtungsabstand 1–2m. 180 DPI empfohlen.',
      customMed: 'Mittelgroßer Druck, Betrachtungsabstand 0,5–1m. 250 DPI zeigen feine Details.',
      customSmall: 'Kleines Handformat, Betrachtungsabstand < 0,5m. Mindestens 600 DPI empfohlen.',
      defaultHandheld: 'Handheld-Publikation, Foto oder Ausweis, Betrachtungsabstand < 0,5m. 300–600 DPI sind erforderlich, damit der Druck nicht pixelig wirkt.'
    }
  },
  ru: {
    studioMode: 'РЕЖИМ СТУДИИ',
    fitCanvas: 'По размеру холста',
    resetAdjustments: 'Сбросить изменения',
    printResolution: 'Разрешение печати',
    dpi72: '72 DPI (Веб)',
    dpi150: '150 DPI (Копирование)',
    dpi300: '300 DPI (Проф. печать)',
    dpiCustom: 'Свой DPI',
    dpiValue: 'Значение',
    saveAndExport: 'Сохранить и экспорт',
    savePNG: 'Сохранить обычное изображение (PNG)',
    savePNGDesc: 'Подходит для веб-публикаций и просмотра на экранах (sRGB).',
    saveTIFF: 'Сохранить как стандартное фото (TIFF)',
    saveTIFFDesc: 'Подходит для копицентров и фотопечати (CMYK).',
    savePDF: 'Сохранить как профессиональный PDF/X для печати',
    savePDFDesc: 'Подходит для типографий и массовых изданий (с вылетами 3 мм и цветовыми профилями).',
    closeFile: 'Закрыть текущий файл',
    closeFileDesc: 'Очистить рабочую область и вернуться к экрану загрузки.',
    tooltips: {
      openFile: 'Открыть новый файл',
      panZoom: 'Панорамирование и масштаб (H)',
      crop: 'Обрезка под размер печати (C)',
      markup: 'Векторная разметка (A)',
      signature: 'Безопасная подпись (S)',
      marquee: 'Прямоугольное выделение (M)',
      help: 'Справка и горячие клавиши (F1)'
    },
    dragOverlay: {
      title: 'Перетащите изображение сюда для загрузки',
      desc: 'Поддерживаются форматы PNG, JPEG, TIFF, RAW'
    },
    noImage: {
      title: 'Откройте или перетащите изображение сюда',
      desc: 'Поддерживаются форматы PNG, JPEG, TIFF, PDF/X и др.',
      button: 'Выбрать файл'
    },
    canvas: {
      bleedLabel: 'Безопасная зона вылетов 3 мм (Trim Boundary)',
      confirmPaste: 'Подтвердить вставку',
      cancel: 'Отмена',
      signatureTitle: 'Зашифрованная векторная панель подписи',
      signatureDesc: 'Подпишитесь на тачпаде, затем разблокируйте с помощью Touch ID',
      securityLevel: 'Уровень безопасности: AES-256',
      signatureBtn: 'Подписать с помощью Touch ID'
    },
    tabs: {
      adjust: 'Коррекция',
      print: 'Печать',
      ai: 'ИИ-помощник',
      edit: 'Редактор'
    },
    adjustPanel: {
      title: 'Неразрушающая цветокоррекция (WebGL)',
      exposure: 'Экспозиция',
      brightness: 'Яркость',
      contrast: 'Контрастность',
      saturation: 'Насыщенность',
      bakeBtn: 'Применить изменения цвета (Bake)',
      gamutTitle: 'Цветопроба для CMYK печати',
      gamutBtn: 'Проба',
      gamutDesc: 'Если включено, цвета, выходящие за пределы цветового охвата печати Coated FOGRA39, будут отмечены фиолетовой штриховкой.'
    },
    printPanel: {
      title: 'Сброс физических параметров печати',
      orientation: 'Ориентация',
      portrait: 'Книжная',
      landscape: 'Альбомная',
      customSize: 'Свой размер',
      width: 'Ширина (мм)',
      height: 'Высота (мм)',
      pixelCalc: 'Расчет пикселей для физической печати',
      targetSize: 'Целевой размер:',
      resolution: 'Разрешение:',
      requiredPixels: 'Необходимые пиксели:',
      currentImgSize: 'Размер изображения:',
      formula: 'Формула: (Размер / 25.4) * DPI = Необходимые пиксели',
      sufficient: '✅ Разрешения достаточно! Подходит для высококачественной печати (будет оптимизировано при экспорте).',
      insufficientBilinear: '⚠️ Недостаточно разрешения! Изображение будет растянуто. Сейчас выбрано Билинейное размытие. Рекомендуем переключить на [Lanczos-3] ниже или использовать изображение большего размера.',
      insufficientLanczos: 'ℹ️ Разрешения недостаточно, но не волнуйтесь! Система настроена на масштабирование [{algo}]. Изображение будет автоматически увеличено до {w} x {h} пикселей при экспорте для соответствия печати в {dpi} DPI без потери резкости.',
      optimizerTitle: 'Помощник допечатной подготовки и качества',
      qualityRating: 'Оценка качества:',
      qualityPerfect: '🌟 Отлично',
      qualityFine: '🟢 Хорошо',
      qualityAcceptable: '🟡 Приемлемо',
      qualityPoor: '🔴 Недостаточно',
      descPerfect: 'Подходит для чтения с близкого расстояния (книги, альбомы, флаеры)',
      descFine: 'Подходит для плакатов, интерьерной рекламы (дистанция просмотра 0.5–1 м)',
      descAcceptable: 'Подходит для наружных плакатов, выставочных стендов (дистанция просмотра 1–2 м)',
      descPoor: 'Недостаточное качество, возможно размытие (рекомендуется изображение большего размера или меньший формат)',
      viewingDistance: 'Рекомендуемая дистанция просмотра:',
      metersOrMore: 'метров и более',
      recRes: 'Рекомендуемое разрешение для этого размера:',
      applyLimit: 'Применить рекомендуемый лимит ({val} DPI)',
      upscaleLabel: 'Алгоритм масштабирования',
      forceMinDpi: 'Ограничить минимальное разрешение (100 DPI)',
      autoDpi: 'Оптимизировать DPI под изображение 1:1 без потерь',
      showBleed: 'Показывать линию вылетов 3 мм',
      bleedDesc: 'Отображает границы вылетов под обрез (безопасное расстояние 3 мм).'
    },
    aiPanel: {
      title: 'Локальный ИИ-движок (ONNX)',
      cutoutTitle: 'Умное удаление фона',
      cutoutAccel: 'Ускорение CoreML',
      cutoutDesc: 'Обнаруживает объект на переднем плане и удаляет фон. Полностью офлайн.',
      cutoutBtn: 'Удалить фон',
      redactTitle: 'Умное скрытие данных',
      redactAccel: 'Распознавание OCR',
      redactDesc: 'Автоматическое скрытие в один клик: паспорта, номера карт, лица.',
      redactBtn: 'Выполнить скрытие'
    },
    editPanel: {
      title: 'Выделение и редактирование изображения',
      desc: 'Включите инструмент прямоугольного выделения (M) слева и выделите область на изображении.',
      copyBtn: 'Копировать выделение (Copy)',
      pasteBtn: 'Вставить в центр изображения (Paste)',
      deleteBtn: 'Удалить выделенные пиксели / Отменить вставку (Delete)',
      blurBtn: 'Размыть выделение (Blur)',
      selectionArea: 'Текущее выделение',
      startCoords: 'Начальные координаты (X, Y):',
      dimensions: 'Размеры (W x H):',
      clipboardTitle: 'Буфер обмена',
      clipboardSize: 'Размер:'
    },
    footer: {
      file: 'ФАЙЛ:',
      dim: 'РАЗМЕР:',
      physical: 'ФИЗИЧЕСКИЙ:',
      zoom: 'МАСШТАБ:',
      targetSpace: 'ЦВЕТОВОЕ ПРОСТРАНСТВО:'
    },
    helpModal: {
      title: 'Справка по обработке изображений и допечатной подготовке',
      close: 'Закрыть (Esc)',
      tabManual: '📖 Руководство пользователя',
      tabPrivacy: '🔒 Политика конфиденциальности',
      manual: {
        sections: [
          {
            title: '1. Панорамирование и масштаб (Pan & Zoom)',
            content: 'Выберите инструмент «Рука (H)» слева, зажмите левую кнопку мыши на холсте для перемещения. Вы также можете зажать «Пробел» при любом активном инструменте для временного панорамирования. Масштабируйте ползунком сверху, кнопками масштаба или колесиком мыши. Ограничения масштаба предотвращают потерю изображения.'
          },
          {
            title: '2. Цветокоррекция и запекание (Baking)',
            content: 'Настройте параметры на панели «Коррекция» справа. Изменения рендерятся в реальном времени с помощью WebGL. Когда вы закончите, нажмите кнопку «Применить изменения цвета (Bake)», чтобы записать изменения в пиксели изображения и сохранить их в истории.'
          },
          {
            title: '3. Выделение, ретушь и вставка слоев',
            content: 'Выделите область инструментом прямоугольного выделения (M) слева. Копирование и вставка: скопируйте пиксели в буфер. При вставке создается плавающий слой, который можно перемещать и подтверждать двойным кликом. Для удаления нажмите «Отмена» или клавишу Del. Умное удаление: нажмите «Удалить выделение» или клавишу Del для бесшовного заполнения области окружающими цветами. Размытие: скройте конфиденциальный текст с помощью размытия.'
          },
          {
            title: '4. Форматы печати, вылеты и оптимизация',
            content: 'Выберите инструмент «Обрезка (C)» слева и настройте параметры на панели «Печать» справа. Вылеты: поддерживает книжную и альбомную ориентацию и отображает 3-мм безопасную рамку. Рекомендуемый DPI: предлагает разрешение в зависимости от формата (A0–A5). Ограничитель DPI: предотвращает сильное ухудшение качества. Алгоритмы масштабирования: Lanczos-3 обеспечивает максимальную четкость при увеличении небольших изображений.'
          },
          {
            title: '5. Офлайн ИИ-удаление фона и скрытие данных',
            content: 'На панели «ИИ-помощник» вы можете удалять фон локально и использовать сканирование OCR для выявления конфиденциальных данных и их последующего размытия.'
          }
        ],
        shortcutsTitle: '⌨️ Горячие клавиши',
        shortcuts: [
          { key: 'Пробел (зажать)', desc: 'Панорамирование' },
          { key: 'Cmd / Ctrl + Z', desc: 'Отменить действие' },
          { key: 'Cmd / Ctrl + Shift + Z', desc: 'Вернуть действие' },
          { key: 'Del / Backspace', desc: 'Удалить выделение / Отменить вставку' },
          { key: 'H', desc: 'Инструмент «Рука»' },
          { key: 'C', desc: 'Инструмент «Обрезка»' },
          { key: 'M', desc: 'Инструмент «Выделение»' },
          { key: 'A', desc: 'Инструмент «Разметка»' },
          { key: 'S', desc: 'Инструмент «Подпись»' },
          { key: 'F1', desc: 'Открыть справку' }
        ]
      },
      privacy: {
        bannerTitle: 'Декларация о 100% локальной конфиденциальности',
        bannerContent: 'Проект DevPixel придерживается принципа «Конфиденциальность превыше всего» ("Privacy First"). Все вычисления происходят исключительно на вашем локальном устройстве.',
        sections: [
          {
            title: '1. 100% локальная архитектура вычислений',
            content: 'Любые изображения и документы обрабатываются только внутри вашего браузера или песочницы Tauri. Загрузка на облачные серверы полностью исключена.'
          },
          {
            title: '2. Офлайн-обработка для ИИ и распознавания OCR',
            content: 'Удаление фона и сканирование OCR выполняются локально с помощью встроенных умных модулей. Программа не содержит аналитических API и не сохраняет данные.'
          },
          {
            title: '3. Безопасность экспорта в CMYK и цветоделения',
            content: 'Модуль `@devpixel/cmyk-wasm` скомпилирован на Rust и работает как WebAssembly на вашем ПК. Преобразование в CMYK (FOGRA39) выполняется без участия удаленных серверов.'
          },
          {
            title: '4. Необратимое скрытие данных',
            content: 'Размытие выделенной области использует фильтр 25x25 Box Blur. Данный процесс математически необратим, что гарантирует полную защиту конфиденциальных текстов от восстановления.'
          }
        ],
        effectiveDate: 'Действует с 11 июля 2026 года. Все функции работают без подключения к интернету; используйте приложение со спокойной душой.'
      }
    },
    alerts: {
      autoMatchedDpi: 'Оптимальное разрешение подобрано: {dpi} DPI (1:1 без потерь)',
      undoSuccess: 'Действие отменено',
      redoSuccess: 'Действие возвращено',
      toneApplied: 'Цветокоррекция успешно применена!',
      toneFailed: 'Ошибка применения: {err}',
      fileClosed: 'Файл закрыт.',
      copyPrompt: 'Пожалуйста, выделите область на холсте перед копированием.',
      copySuccess: 'Выделенная область скопирована!',
      deletePrompt: 'Пожалуйста, выделите область перед удалением.',
      pasteCancel: 'Вставка отменена, слой удален.',
      deleteSuccess: 'Выделенная область удалена и заполнена окружающими пикселями!',
      blurPrompt: 'Пожалуйста, выделите область перед размытием.',
      blurSuccess: 'Выделенная область размыта!',
      pastePrompt: 'Буфер обмена пуст. Сначала скопируйте область.',
      pasteReady: 'Слой вставлен. Переместите его и дважды кликните для подтверждения.',
      pasteConfirm: 'Слой успешно вставлен и объединен.',
      loadOnnx: 'Загрузка локальной ИИ-модели...',
      recognizingCutout: 'Определение контуров и наложение маски прозрачности...',
      cutoutSuccess: 'Удаление фона завершено (локальный GPU)',
      scanningOcr: 'Сканирование на наличие конфиденциальных данных (OCR)...',
      scanOcrResultAlert: '【ИИ-сканирование конфиденциальности DevPixel】\n\nСканирование завершено. В этом документе не обнаружено типичных паспортов, банковских карт или лиц.\n\n💡 Совет: вы можете выделить конфиденциальные данные инструментом выделения (M) слева и размыть их на панели «Редактор» справа.',
      scanOcrSuccess: 'Сканирование завершено. Конфиденциальные данные не обнаружены.',
      convertingColor: 'Выполняется преобразование цветов и допечатная подготовка...',
      pngExportSuccess: 'sRGB PNG успешно экспортирован!',
      exportSuccess: '{format} успешно экспортирован!',
      exportSuccessAlert: '【DevPixel допечатный экспорт успешно завершен】\nИмя файла: {filename}\nФормат: {size}\nРазрешение: {dpi} DPI\nГлубина цвета: 8-бит CMYK\n\nФайл содержит цветовой профиль Fogra39 и настройки вылетов под обрез!',
      exportFailed: 'Ошибка экспорта: {err}',
      appliedRes: 'Применено рекомендуемое разрешение: {dpi} DPI'
    },
    presets: {
      A0: 'Билборд A0, дистанция просмотра > 2м. Снижение DPI существенно уменьшает размер файла без видимой потери качества.',
      A1: 'Плакат A1, дистанция просмотра 1.5–2м. 150 DPI вполне достаточно для отличного результата.',
      A2: 'Афиша A2, дистанция просмотра 1–1.5м. 200 DPI обеспечивает наилучший баланс деталей и веса файла.',
      A3B4: 'Листовка/меню A3/B4, дистанция просмотра 0.5–1м. 250 DPI сохраняет четкость мелкого текста.',
      customLarge: 'Очень крупный особый размер, дистанция просмотра > 2м. Снижение DPI помогает оптимизировать размер файла.',
      customMedLarge: 'Средне-крупный особый размер, дистанция просмотра 1–2m. Рекомендуется 180 DPI.',
      customMed: 'Средний формат печати, дистанция просмотра 0.5–1м. 250 DPI отображает мелкие детали.',
      customSmall: 'Маленький ручной формат, дистанция просмотра < 0.5м. Рекомендуется от 600 DPI.',
      defaultHandheld: 'Книга, фотография или удостоверение личности, дистанция просмотра < 0.5м. Требуется 300–600 DPI, чтобы печать не казалась зернистой.'
    }
  },
  es: {
    studioMode: 'MODO ESTUDIO',
    fitCanvas: 'Ajustar al Lienzo',
    resetAdjustments: 'Restablecer Ajustes',
    printResolution: 'Resolución de Impresión',
    dpi72: '72 DPI (Web)',
    dpi150: '150 DPI (Copia común)',
    dpi300: '300 DPI (Impresión Pro)',
    dpiCustom: 'DPI Personalizado',
    dpiValue: 'Valor',
    saveAndExport: 'Guardar y Exportar',
    savePNG: 'Guardar imagen común (PNG)',
    savePNGDesc: 'Adecuado para compartir en la web y visualización en pantallas (sRGB).',
    saveTIFF: 'Guardar foto estándar (TIFF)',
    saveTIFFDesc: 'Adecuado para copisterías e impresión fotográfica (CMYK).',
    savePDF: 'Guardar PDF/X de impresión profesional',
    savePDFDesc: 'Adecuado para imprentas y publicaciones masivas (incluye 3mm de sangrado y perfiles de color).',
    closeFile: 'Cerrar archivo actual',
    closeFileDesc: 'Limpia el área de trabajo y regresa a la pantalla de carga.',
    tooltips: {
      openFile: 'Abrir nuevo archivo',
      panZoom: 'Desplazamiento y Zoom (H)',
      crop: 'Recorte de tamaño de impresión (C)',
      markup: 'Herramienta de marcas vectoriales (A)',
      signature: 'Firma segura (S)',
      marquee: 'Herramienta de selección (M)',
      help: 'Ayuda y atajos de teclado (F1)'
    },
    dragOverlay: {
      title: 'Arrastre la imagen aquí para cargar',
      desc: 'Soporta formatos PNG, JPEG, TIFF, RAW'
    },
    noImage: {
      title: 'Abra o arrastre una imagen aquí',
      desc: 'Soporta formatos PNG, JPEG, TIFF, PDF/X, etc.',
      button: 'Seleccionar archivo'
    },
    canvas: {
      bleedLabel: 'Zona de seguridad de sangrado de 3mm (Trim Boundary)',
      confirmPaste: 'Confirmar pegado',
      cancel: 'Cancelar',
      signatureTitle: 'Panel de firma vectorial encriptada',
      signatureDesc: 'Firme en el panel táctil, luego desbloquee con Touch ID',
      securityLevel: 'Nivel de seguridad: AES-256',
      signatureBtn: 'Firmar con Touch ID'
    },
    tabs: {
      adjust: 'Ajuste de Imagen',
      print: 'Impresión',
      ai: 'Asistente AI',
      edit: 'Edición'
    },
    adjustPanel: {
      title: 'Ajuste de color no destructivo (WebGL)',
      exposure: 'Exposición',
      brightness: 'Brillo',
      contrast: 'Contraste',
      saturation: 'Saturación',
      bakeBtn: 'Aplicar cambios de tono (Bake)',
      gamutTitle: 'Prueba en pantalla de gama de impresión CMYK',
      gamutBtn: 'Prueba',
      gamutDesc: 'Cuando está activado, los colores fuera de la gama de impresión de Coated FOGRA39 se marcarán con franjas moradas.'
    },
    printPanel: {
      title: 'Restablecer especificaciones de tamaño',
      orientation: 'Orientación',
      portrait: 'Vertical',
      landscape: 'Horizontal',
      customSize: 'Tamaño personalizado',
      width: 'Ancho (mm)',
      height: 'Alto (mm)',
      pixelCalc: 'Cálculo de píxeles para impresión física',
      targetSize: 'Tamaño de destino:',
      resolution: 'Resolución:',
      requiredPixels: 'Píxeles requeridos:',
      currentImgSize: 'Tamaño de imagen actual:',
      formula: 'Fórmula: (Tamaño / 25.4) * DPI = Píxeles Requeridos',
      sufficient: '✅ ¡La resolución es suficiente! Adecuada para impresión de alta calidad (se optimizará al exportar).',
      insufficientBilinear: '⚠️ ¡La resolución es insuficiente! La imagen se estirará. Actualmente configurada en Bilinear. Recomendamos cambiar a [Lanczos-3] abajo o subir una imagen de mayor resolución.',
      insufficientLanczos: 'ℹ️ La resolución es insuficiente, pero no se preocupe. El sistema está configurado en [{algo}] upsampling. Se escalará automáticamente a {w} x {h} px durante la exportación para cumplir con la impresión a {dpi} DPI.',
      optimizerTitle: 'Asistente de preprensa y calidad',
      qualityRating: 'Calificación de calidad:',
      qualityPerfect: '🌟 Perfecto',
      qualityFine: '🟢 Excelente',
      qualityAcceptable: '🟡 Aceptable',
      qualityPoor: '🔴 Deficiente',
      descPerfect: 'Adecuado para lectura cercana (libros, álbumes, volantes)',
      descFine: 'Adecuado para carteles, publicidad en interiores (distancia 0.5–1 m)',
      descAcceptable: 'Adecuado para carteles distantes, fondos de stands (distancia 1–2 m)',
      descPoor: 'Calidad deficiente, propensa a borrosidad (se recomienda mayor resolución o menor formato)',
      viewingDistance: 'Distancia de visualización recomendada:',
      metersOrMore: 'metros o más',
      recRes: 'Resolución recomendada para este tamaño:',
      applyLimit: 'Aplicar límite recomendado ({val} DPI)',
      upscaleLabel: 'Algoritmo de escalado',
      forceMinDpi: 'Forzar bloqueo de resolución mínima (100 DPI)',
      autoDpi: 'Optimizar DPI para que coincida con la imagen 1:1 sin pérdida',
      showBleed: 'Mostrar línea de sangrado de 3mm',
      bleedDesc: 'Dibuja los límites del sangrado de seguridad (margen de 3 mm).'
    },
    aiPanel: {
      title: 'Motor de Inteligencia Artificial local (ONNX)',
      cutoutTitle: 'Eliminación inteligente de fondo',
      cutoutAccel: 'Aceleración CoreML',
      cutoutDesc: 'Detecta el sujeto en primer plano y elimina el fondo. Totalmente local y offline.',
      cutoutBtn: 'Eliminar fondo',
      redactTitle: 'Zensura de privacidad inteligente',
      redactAccel: 'Detección OCR',
      redactDesc: 'Zensura automática en un clic para: documentos, tarjetas de crédito, rostros.',
      redactBtn: 'Ejecutar zensura'
    },
    editPanel: {
      title: 'Selección y edición de imagen',
      desc: 'Active la herramienta de selección (M) a la izquierda y dibuje un área sobre la imagen.',
      copyBtn: 'Copiar área seleccionada (Copy)',
      pasteBtn: 'Pegar en el centro de la imagen (Paste)',
      deleteBtn: 'Eliminar selección / Cancelar pegado (Delete)',
      blurBtn: 'Difuminar selección (Blur)',
      selectionArea: 'Selección actual',
      startCoords: 'Coordenadas iniciales (X, Y):',
      dimensions: 'Dimensiones (W x H):',
      clipboardTitle: 'Búfer del portapapeles',
      clipboardSize: 'Tamaño:'
    },
    footer: {
      file: 'ARCHIVO:',
      dim: 'TAMAÑO:',
      physical: 'FÍSICO:',
      zoom: 'ZOOM:',
      targetSpace: 'ESPACIO DE COLOR:'
    },
    helpModal: {
      title: 'Ayuda de procesamiento y preprensa de imágenes',
      close: 'Cerrar (Esc)',
      tabManual: '📖 Manual del usuario',
      tabPrivacy: '🔒 Política de privacidad',
      manual: {
        sections: [
          {
            title: '1. Desplazamiento y Zoom (Pan & Zoom)',
            content: 'Seleccione la herramienta de mano (H) a la izquierda, haga clic y arrastre sobre el lienzo para desplazarse. También puede mantener presionada la "barra espaciadora" en cualquier herramienta para desplazarse temporalmente. Use el control deslizante, los botones de zoom o la rueda del mouse para cambiar el tamaño. Los límites de seguridad evitan que la imagen se pierda de vista.'
          },
          {
            title: '2. Ajuste de imagen y horneado (Baking)',
            content: 'Use los controles a la derecha para vistas previas en tiempo real mediante WebGL. Cuando esté satisfecho, haga clic en "Aplicar cambios de tono (Bake)" para aplicar permanentemente las modificaciones a la imagen y guardarlas en el historial.'
          },
          {
            title: '3. Selección, retoque inteligente y pegado',
            content: 'Dibuje un cuadro con la herramienta de selección (M) a la izquierda. Copiar y pegar: copia los píxeles. Al pegar, se genera una capa flotante que puede arrastrar y confirmar con doble clic. Para eliminar, haga clic en Cancelar o presione la tecla Supr. Borrado inteligente: presione "Eliminar selección" o Supr para rellenar el área de forma nat con los colores circundantes. Difuminar: difumine la información confidencial para hacerla ilegible.'
          },
          {
            title: '4. Formatos de impresión, sangrado y asistente',
            content: 'Active la herramienta de recorte (C) a la izquierda y configure las opciones a la derecha. Sangrado: admite formatos vertical u horizontal y dibuja una línea de sangrado de 3mm. DPI sugerido: calcula la resolución adecuada según el formato seleccionado. Bloqueo de DPI: evita la pixelación al impedir valores de resolución demasiado bajos. Escalado: Lanczos-3 proporciona la mejor nitidez al agrandar imágenes pequeñas.'
          },
          {
            title: '5. Eliminación de fondo con IA y zensura de privacidad local',
            content: 'En la pestaña "Asistente AI", puede eliminar fondos de forma local y escanear datos confidenciales con OCR para difuminarlos.'
          }
        ],
        shortcutsTitle: '⌨️ Atajos de teclado',
        shortcuts: [
          { key: 'Espacio (mantener)', desc: 'Desplazarse (Mano)' },
          { key: 'Cmd / Ctrl + Z', desc: 'Deshacer' },
          { key: 'Cmd / Ctrl + Shift + Z', desc: 'Rehacer' },
          { key: 'Supr / Backspace', desc: 'Eliminar selección / Cancelar capa' },
          { key: 'H', desc: 'Activar herramienta Mano' },
          { key: 'C', desc: 'Activar herramienta Recorte' },
          { key: 'M', desc: 'Activar herramienta Selección' },
          { key: 'A', desc: 'Activar herramienta de Marcas' },
          { key: 'S', desc: 'Activar herramienta de Firma' },
          { key: 'F1', desc: 'Abrir ayuda' }
        ]
      },
      privacy: {
        bannerTitle: 'Declaración de privacidad 100% offline local',
        bannerContent: 'El proyecto DevPixel se adhiere a un enfoque estricto de privacidad ("Privacy First"). Todas las operaciones se realizan exclusivamente de forma local en su dispositivo.',
        sections: [
          {
            title: '1. Arquitectura de computación 100% local',
            content: 'Cualquier imagen o documento cargado se procesa solo en su navegador o en la caja de arena de Tauri. Está completamente descartada la carga a servidores en la nube.'
          },
          {
            title: '2. Procesamiento offline para IA y OCR',
            content: 'La eliminación del fondo y el escaneo OCR se ejecutan localmente a través de algoritmos integrados sin API de telemetría ni almacenamiento de datos.'
          },
          {
            title: '3. Conversión segura a CMYK y salida de archivos',
            content: 'El módulo `@devpixel/cmyk-wasm` se ejecuta como WebAssembly directamente en su PC. La conversión a CMYK (FOGRA39) se realiza sin involucrar servidores externos.'
          },
          {
            title: '4. Difuminado de zensura irreversible',
            content: 'La zensura por difuminado utiliza un filtro fuerte de 25x25 Box Blur. Este proceso es matemáticamente irreversible, lo que garantiza que los textos ocultos estén protegidos contra cualquier intento de reconstrucción.'
          }
        ],
        effectiveDate: 'Vigente a partir del 11 de julio de 2026. Todas las funciones se pueden utilizar sin conexión a Internet.'
      }
    },
    alerts: {
      autoMatchedDpi: 'Resolución de impresión óptima ajustada: {dpi} DPI (1:1 sin pérdidas)',
      undoSuccess: 'Acción deshecha',
      redoSuccess: 'Acción rehecha',
      toneApplied: '¡Ajustes de color aplicados con éxito!',
      toneFailed: 'Error al aplicar el ajuste: {err}',
      fileClosed: 'Archivo cerrado.',
      copyPrompt: 'Por favor, seleccione primero un área en el lienzo.',
      copySuccess: '¡Área seleccionada copiada!',
      deletePrompt: 'Por favor, seleccione primero un área para eliminar.',
      pasteCancel: 'Capa eliminada y pegado cancelado.',
      deleteSuccess: '¡Selección eliminada y rellenada con colores circundantes!',
      blurPrompt: 'Por favor, seleccione primero un área para difuminar.',
      blurSuccess: '¡Área seleccionada difuminada!',
      pastePrompt: 'El portapapeles está vacío. Copie un área primero.',
      pasteReady: 'Capa pegada. Muévala y haga doble clic para confirmar.',
      pasteConfirm: 'Capa pegada y fusionada con éxito.',
      loadOnnx: 'Cargando modelo local de IA...',
      recognizingCutout: 'Detectando bordes y aplicando máscara de transparencia...',
      cutoutSuccess: 'Fondo eliminado con éxito (GPU local)',
      scanningOcr: 'Escaneando datos confidenciales (OCR)...',
      scanOcrResultAlert: '【Escaneo de privacidad DevPixel IA】\n\nEscaneo completado. No se detectaron documentos típicos, tarjetas ni rostros.\n\n💡 Consejo: Puede marcar la información confidencial con la herramienta de selección (M) a la izquierda y difuminarla en el panel de edición a la derecha.',
      scanOcrSuccess: 'Escaneo completado. No se encontraron datos confidenciales.',
      convertingColor: 'Converting color space and preparing print file...',
      pngExportSuccess: '¡sRGB PNG exportado con éxito!',
      exportSuccess: '¡{format} exportado con éxito!',
      exportSuccessAlert: '【Exportación de impresión exitosa】\nNombre de archivo: {filename}\nTamaño: {size}\nResolución: {dpi} DPI\nProfundidad: CMYK de 8 bits\n\nEl archivo incluye el perfil Fogra39 y los límites de sangrado correctos.',
      exportFailed: 'Error de exportación: {err}',
      appliedRes: 'Resolución recomendada aplicada: {dpi} DPI'
    },
    presets: {
      A0: 'Valla publicitaria A0, distancia > 2m. Un DPI más bajo reduce significativamente el tamaño del archivo con excelentes resultados.',
      A1: 'Cartel A1, distancia de 1.5–2m. 150 DPI son totalmente suficientes.',
      A2: 'Cartel/Póster A2, distancia de 1–1.5m. 200 DPI es el equilibrio óptimo entre detalles y peso.',
      A3B4: 'Folleto/Menú A3/B4, distancia de 0.5–1m. 250 DPI para texto nítido.',
      customLarge: 'Tamaño personalizado muy grande, distancia > 2m. Bajar el DPI ahorra espacio.',
      customMedLarge: 'Tamaño personalizado mediano-grande, distancia de 1–2m. Recomendado 180 DPI.',
      customMed: 'Tamaño personalizado mediano, distancia de 0.5–1m. 250 DPI muestra detalles finos.',
      customSmall: 'Tamaño personalizado pequeño, distancia < 0.5m. Recomendado al menos 600 DPI.',
      defaultHandheld: 'Libro, foto o documento de mano, distancia < 0.5m. Se requiere de 300–600 DPI para evitar que la impresión se vea pixelada.'
    }
  },
  pt: {
    studioMode: 'MODO ESTÚDIO',
    fitCanvas: 'Ajustar à Tela',
    resetAdjustments: 'Redefinir Ajustes',
    printResolution: 'Resolução de Impressão',
    dpi72: '72 DPI (Web)',
    dpi150: '150 DPI (Cópia comum)',
    dpi300: '300 DPI (Impressão Pro)',
    dpiCustom: 'DPI Personalizado',
    dpiValue: 'Valor',
    saveAndExport: 'Salvar e Exportar',
    savePNG: 'Salvar imagem comum (PNG)',
    savePNGDesc: 'Adequado para compartilhamento na web e visualização em telas (sRGB).',
    saveTIFF: 'Salvar foto padrão (TIFF)',
    saveTIFFDesc: 'Adequado para copiadoras e impressão fotográfica (CMYK).',
    savePDF: 'Salvar PDF/X de impressão profissional',
    savePDFDesc: 'Adequado para gráficas e publicações em massa (inclui 3mm de sangria e perfis de cor).',
    closeFile: 'Fechar arquivo atual',
    closeFileDesc: 'Limpa a área de trabalho e retorna à tela de carregamento.',
    tooltips: {
      openFile: 'Abrir novo arquivo',
      panZoom: 'Deslocamento e Zoom (H)',
      crop: 'Recorte de tamanho de impressão (C)',
      markup: 'Ferramenta de marcações vetoriais (A)',
      signature: 'Assinatura segura (S)',
      marquee: 'Ferramenta de seleção (M)',
      help: 'Ajuda e atalhos do teclado (F1)'
    },
    dragOverlay: {
      title: 'Arraste a imagem aqui para carregar',
      desc: 'Suporta formatos PNG, JPEG, TIFF, RAW'
    },
    noImage: {
      title: 'Abra ou arraste uma imagem aqui',
      desc: 'Suporta formatos PNG, JPEG, TIFF, PDF/X, etc.',
      button: 'Selecionar arquivo'
    },
    canvas: {
      bleedLabel: 'Zona de segurança de sangria de 3mm (Trim Boundary)',
      confirmPaste: 'Confirmar colagem',
      cancel: 'Cancelar',
      signatureTitle: 'Painel de assinatura vetorial criptografada',
      signatureDesc: 'Assine no touchpad, depois desbloqueie com Touch ID',
      securityLevel: 'Nível de segurança: AES-256',
      signatureBtn: 'Assinar com Touch ID'
    },
    tabs: {
      adjust: 'Ajuste de Imagem',
      print: 'Impressão',
      ai: 'Assistente AI',
      edit: 'Edição'
    },
    adjustPanel: {
      title: 'Ajuste de cor não destrutivo (WebGL)',
      exposure: 'Exposição',
      brightness: 'Brilho',
      contrast: 'Contraste',
      saturation: 'Saturação',
      bakeBtn: 'Aplicar alterações de tom (Bake)',
      gamutTitle: 'Prova em tela de gama de impressão CMYK',
      gamutBtn: 'Prova',
      gamutDesc: 'Quando ativado, as cores fora da gama de impressão do Coated FOGRA39 serão marcadas com listras roxas.'
    },
    printPanel: {
      title: 'Redefinir especificações de tamanho',
      orientation: 'Orientação',
      portrait: 'Vertical',
      landscape: 'Horizontal',
      customSize: 'Tamanho personalizado',
      width: 'Largura (mm)',
      height: 'Altura (mm)',
      pixelCalc: 'Cálculo de pixels para impressão física',
      targetSize: 'Tamanho de destino:',
      resolution: 'Resolução:',
      requiredPixels: 'Pixels requeridos:',
      currentImgSize: 'Tamanho de imagem atual:',
      formula: 'Fórmula: (Tamanho / 25.4) * DPI = Pixels Requeridos',
      sufficient: '✅ A resolução é suficiente! Adequada para impressão de alta qualidade (será otimizada ao exportar).',
      insufficientBilinear: '⚠️ A resolução é insuficiente! A imagem será esticada. Configurada atualmente em Bilinear. Recomendamos mudar para [Lanczos-3] abaixo ou carregar uma imagem de maior resolução.',
      insufficientLanczos: 'ℹ️ A resolução é insuficiente, mas não se preocupe. O sistema está configurado em [{algo}] upsampling. Será redimensionada automaticamente para {w} x {h} px durante a exportação para atender à impressão em {dpi} DPI.',
      optimizerTitle: 'Assistente de pré-impressão e qualidade',
      qualityRating: 'Classificação de qualidade:',
      qualityPerfect: '🌟 Perfeito',
      qualityFine: '🟢 Excelente',
      qualityAcceptable: '🟡 Aceitável',
      qualityPoor: '🔴 Deficiente',
      descPerfect: 'Adequado para leitura próxima (livros, álbuns, panfletos)',
      descFine: 'Adequado para cartazes, publicidade em interiores (distância 0.5–1 m)',
      descAcceptable: 'Adequado para cartazes distantes, painéis de estandes (distância 1–2 m)',
      descPoor: 'Qualidade deficiente, propensa a desfoque (recomenda-se maior resolução ou menor formato)',
      viewingDistance: 'Distância de visualização recomendada:',
      metersOrMore: 'metros ou mais',
      recRes: 'Resolução recomendada para este tamanho:',
      applyLimit: 'Aplicar limite recomendado ({val} DPI)',
      upscaleLabel: 'Algoritmo de escala',
      forceMinDpi: 'Forçar bloqueio de resolução mínima (100 DPI)',
      autoDpi: 'Otimizar DPI para coincidir com a imagem 1:1 sem perda',
      showBleed: 'Mostrar linha de sangria de 3mm',
      bleedDesc: 'Desenha os limites da sangria de segurança (margem de 3 mm).'
    },
    aiPanel: {
      title: 'Motor de Inteligência Artificial local (ONNX)',
      cutoutTitle: 'Remoção inteligente de fundo',
      cutoutAccel: 'Aceleração CoreML',
      cutoutDesc: 'Detecta o objeto em primeiro plano e remove o fundo. Totalmente local e offline.',
      cutoutBtn: 'Remover fundo',
      redactTitle: 'Censura de privacidade inteligente',
      redactAccel: 'Detecção OCR',
      redactDesc: 'Censura automática em um clique para: documentos, cartões de crédito, rostos.',
      redactBtn: 'Executar censura'
    },
    editPanel: {
      title: 'Seleção e edição de imagem',
      desc: 'Ative a ferramenta de seleção (M) à esquerda e desenhe uma área sobre a imagem.',
      copyBtn: 'Copiar área selecionada (Copy)',
      pasteBtn: 'Colar no centro da imagem (Paste)',
      deleteBtn: 'Eliminar seleção / Cancelar colagem (Delete)',
      blurBtn: 'Desfocar seleção (Blur)',
      selectionArea: 'Seleção atual',
      startCoords: 'Coordenadas iniciais (X, Y):',
      dimensions: 'Dimensões (W x H):',
      clipboardTitle: 'Buffer da área de transferência',
      clipboardSize: 'Tamanho:'
    },
    footer: {
      file: 'ARQUIVO:',
      dim: 'TAMANHO:',
      physical: 'FÍSICO:',
      zoom: 'ZOOM:',
      targetSpace: 'ESPAÇO DE COR:'
    },
    helpModal: {
      title: 'Ajuda de processamento e pré-impressão de imagens',
      close: 'Fechar (Esc)',
      tabManual: '📖 Manual do usuário',
      tabPrivacy: '🔒 Política de privacidade',
      manual: {
        sections: [
          {
            title: '1. Deslocamento e Zoom (Pan & Zoom)',
            content: 'Selecione a ferramenta de mão (H) à esquerda, clique e arraste sobre a tela para se deslocar. Também pode manter pressionada a "barra de espaço" em qualquer ferramenta para se deslocar temporariamente. Use o controle deslizante, os botões de zoom ou a roda do mouse para alterar o tamanho. Os limites de segurança evitam que a imagem se perca de vista.'
          },
          {
            title: '2. Ajuste de imagem e cozimento (Baking)',
            content: 'Use os controles à direita para visualizações em tempo real via WebGL. Quando estiver satisfeito, clique em "Aplicar alterações de tom (Bake)" para aplicar permanentemente as modificações à imagem e salvá-las no histórico.'
          },
          {
            title: '3. Seleção, retoque inteligente e colagem',
            content: 'Desenhe um quadro com a ferramenta de seleção (M) à esquerda. Copiar e colar: copia os pixels. Ao colar, cria-se uma camada flutuante que pode arrastar e confirmar com duplo clique. Para eliminar, clique em Cancelar ou pressione a tecla Delete. Apagar inteligente: pressione "Eliminar seleção" ou Delete para preencher a área de forma nat com as cores circundantes. Desfocar: desfoque a informação confidencial para torná-la ilegível.'
          },
          {
            title: '4. Formatos de impressão, sangria e assistente',
            content: 'Ative a ferramenta de recorte (C) à esquerda e configure as opções à direita. Sangria: suporta formatos vertical ou horizontal e desenha uma linha de sangria de 3mm. DPI sugerido: calcula la resolución adecuada de acuerdo con el formato seleccionado. Bloqueio de DPI: evita a pixelização ao impedir valores de resolução demasiado baixos. Redimensionamento: Lanczos-3 fornece a melhor nitidez ao aumentar imagens pequenas.'
          },
          {
            title: '5. Remoção de fundo com IA e censura de privacidade local',
            content: 'Na guia "AI Assistant", pode remover fundos de forma local e escanear dados confidenciais com OCR para desfocá-los.'
          }
        ],
        shortcutsTitle: '⌨️ Atalhos do teclado',
        shortcuts: [
          { key: 'Espaço (manter)', desc: 'Deslocar-se (Mão)' },
          { key: 'Cmd / Ctrl + Z', desc: 'Desfazer' },
          { key: 'Cmd / Ctrl + Shift + Z', desc: 'Refazer' },
          { key: 'Delete / Backspace', desc: 'Eliminar seleção / Cancelar camada' },
          { key: 'H', desc: 'Ativar ferramenta Mão' },
          { key: 'C', desc: 'Ativar ferramenta Recorte' },
          { key: 'M', desc: 'Ativar ferramenta Seleção' },
          { key: 'A', desc: 'Activar ferramenta de Marcas' },
          { key: 'S', desc: 'Activar ferramenta de Assinatura' },
          { key: 'F1', desc: 'Abrir ajuda' }
        ]
      },
      privacy: {
        bannerTitle: 'Declaração de privacidade 100% offline local',
        bannerContent: 'O projeto DevPixel adere a uma abordagem estrita de privacidade ("Privacy First"). Todas as operações realizam-se exclusivamente de forma local no seu dispositivo.',
        sections: [
          {
            title: '1. Arquitetura de computação 100% local',
            content: 'Qualquer imagem ou documento carregado é processado apenas no seu navegador ou na caixa de areia do Tauri. Está completamente descartada a carga para servidores na nuvem.'
          },
          {
            title: '2. Processamento offline para IA e OCR',
            content: 'A remoção do fundo e o escaneamento OCR executam-se localmente através de algoritmos integrados sem API de telemetria nem armazenamento de dados.'
          },
          {
            title: '3. Conversão segura para CMYK e saída de ficheiros',
            content: 'O módulo `@devpixel/cmyk-wasm` executa-se como WebAssembly diretamente no seu PC. A conversão para CMYK (FOGRA39) realiza-se sem envolver servidores externos.'
          },
          {
            title: '4. Desfocado de censura irreversível',
            content: 'A censura por desfocado utiliza um filtro forte de 25x25 Box Blur. Este processo é matematicamente irreversível, o que garante que os textos ocultos estejam protegidos contra qualquer tentativa de reconstrução.'
          }
        ],
        effectiveDate: 'Vigente a partir de 11 de julho de 2026. Todas as funções podem ser utilizadas sem ligação à Internet.'
      }
    },
    alerts: {
      autoMatchedDpi: 'Resolução de impressão ideal ajustada: {dpi} DPI (1:1 sem perdas)',
      undoSuccess: 'Ação desfeita',
      redoSuccess: 'Ação refeita',
      toneApplied: 'Ajustes de cor aplicados com sucesso!',
      toneFailed: 'Falha ao aplicar o ajuste: {err}',
      fileClosed: 'Arquivo fechado.',
      copyPrompt: 'Por favor, selecione primeiro uma área na tela.',
      copySuccess: 'Área selecionada copiada!',
      deletePrompt: 'Por favor, selecione primeiro uma área para eliminar.',
      pasteCancel: 'Camada eliminada e colagem cancelada.',
      deleteSuccess: 'Seleção eliminada e preenchida com cores circundantes!',
      blurPrompt: 'Por favor, selecione primeiro uma área para desfocar.',
      blurSuccess: 'Área selecionada desfocada!',
      pastePrompt: 'A área de transferência está vazia. Copie uma área primeiro.',
      pasteReady: 'Camada colada. Mova-a e clique duas vezes para confirmar.',
      pasteConfirm: 'Camada colada e mesclada com sucesso.',
      loadOnnx: 'Carregando modelo local de IA...',
      recognizingCutout: 'Detectando bordas e aplicando máscara de transparência...',
      cutoutSuccess: 'Fundo removido com sucesso (GPU local)',
      scanningOcr: 'Escaneando dados confidenciais (OCR)...',
      scanOcrResultAlert: '【Escaneamento de privacidade DevPixel IA】\n\nEscaneamento concluído. Não foram detectados documentos típicos, cartões ou rostos.\n\n💡 Dica: Pode marcar a informação confidencial com a ferramenta de seleção (M) à esquerda e desfocá-la no painel de edição à direita.',
      scanOcrSuccess: 'Escaneamento concluído. Não foram encontrados dados confidenciais.',
      convertingColor: 'Convertendo espaço de cor e preparando arquivo de impressão...',
      pngExportSuccess: 'sRGB PNG exportado com sucesso!',
      exportSuccess: '{format} exportado com sucesso!',
      exportSuccessAlert: '【Exportação de impressão bem-sucedida】\nNome de arquivo: {filename}\nTamanho: {size}\nResolução: {dpi} DPI\nProfundidade: CMYK de 8 bits\n\nO arquivo inclui o perfil Fogra39 e os limites de sangria corretos.',
      exportFailed: 'Erro de exportação: {err}',
      appliedRes: 'Resolução recomendada aplicada: {dpi} DPI'
    },
    presets: {
      A0: 'Outdoor A0, distância > 2m. Um DPI mais baixo reduz significativamente o tamanho do arquivo com excelentes resultados.',
      A1: 'Cartaz A1, distância de 1.5–2m. 150 DPI são totalmente suficientes.',
      A2: 'Cartaz/Pôster A2, distância de 1–1.5m. 200 DPI é o equilíbrio ideal entre detalhes e peso.',
      A3B4: 'Folheto/Menu A3/B4, distância de 0.5–1m. 250 DPI para texto nítido.',
      customLarge: 'Tamanho personalizado muito grande, distância > 2m. Baixar o DPI economiza espaço.',
      customMedLarge: 'Tamanho personalizado médio-gra, distância de 1–2m. Recomendado 180 DPI.',
      customMed: 'Tamanho personalizado médio, distância de 0.5–1m. 250 DPI mostra detalhes finos.',
      customSmall: 'Tamanho personalizado pequeno, distância < 0.5m. Recomendado pelo menos 600 DPI.',
      defaultHandheld: 'Livro, foto ou documento de mão, distância < 0.5m. É necessário de 300–600 DPI para evitar que a impressão pareça pixelada.'
    }
  },
  th: {
    studioMode: 'โหมดสตูดิโอ',
    fitCanvas: 'พอดีกับหน้าจอ',
    resetAdjustments: 'รีเซ็ตการปรับแต่ง',
    printResolution: 'ความละเอียดการพิมพ์',
    dpi72: '72 DPI (เว็บ)',
    dpi150: '150 DPI (ถ่ายเอกสารทั่วไป)',
    dpi300: '300 DPI (พิมพ์ระดับมืออาชีพ)',
    dpiCustom: 'กำหนด DPI เอง',
    dpiValue: 'ค่าความละเอียด',
    saveAndExport: 'บันทึกและส่งออก',
    savePNG: 'บันทึกเป็นรูปภาพทั่วไป (PNG)',
    savePNGDesc: 'เหมาะสำหรับแชร์บนเว็บและดูบนหน้าจอทั่วไป (sRGB)',
    saveTIFF: 'บันทึกเป็นไฟล์ภาพถ่ายมาตรฐาน (TIFF)',
    saveTIFFDesc: 'เหมาะสำหรับร้านถ่ายเอกสารและพิมพ์ภาพถ่าย (CMYK)',
    savePDF: 'บันทึกเป็นไฟล์ PDF/X สำหรับพิมพ์ระดับมืออาชีพ',
    savePDFDesc: 'เหมาะสำหรับโรงพิมพ์และการจัดพิมพ์จำนวนมาก (รวมระยะตัดตก 3 มม. และโปรไฟล์สี)',
    closeFile: 'ปิดไฟล์ปัจจุบัน',
    closeFileDesc: 'ล้างพื้นที่ทำงานและกลับไปที่หน้าจออัปโหลดหลัก',
    tooltips: {
      openFile: 'เปิดไฟล์ใหม่',
      panZoom: 'เลื่อนและย่อขยาย (H)',
      crop: 'ครอบตัดขนาดพิมพ์ (C)',
      markup: 'เครื่องมือทำเครื่องหมายเวกเตอร์ (A)',
      signature: 'ลายเซ็นที่ปลอดภัย (S)',
      marquee: 'เครื่องมือเลือกพื้นที่ (M)',
      help: 'คำแนะนำการใช้งานและคีย์ลัด (F1)'
    },
    dragOverlay: {
      title: 'ลากรูปภาพมาวางที่นี่เพื่อโหลด',
      desc: 'รองรับไฟล์ประเภท PNG, JPEG, TIFF, RAW'
    },
    noImage: {
      title: 'กรุณาเปิดไฟล์หรือลากรูปภาพมาวางที่นี่',
      desc: 'รองรับไฟล์ PNG, JPEG, TIFF, PDF/X และอื่นๆ',
      button: 'เลือกไฟล์'
    },
    canvas: {
      bleedLabel: 'ระยะปลอดภัยตัดตก 3 มม. (Trim Boundary)',
      confirmPaste: 'ยืนยันการวาง',
      cancel: 'ยกเลิก',
      signatureTitle: 'กระดานลายเซ็นเวกเตอร์เข้ารหัส',
      signatureDesc: 'เซ็นชื่อบนทัชแพด จากนั้นปลดล็อกด้วย Touch ID',
      securityLevel: 'ระดับความปลอดภัย: AES-256',
      signatureBtn: 'ลงลายมือชื่อด้วย Touch ID'
    },
    tabs: {
      adjust: 'ปรับแต่งภาพ',
      print: 'พิมพ์ด่วน',
      ai: 'ผู้ช่วย AI',
      edit: 'แก้ไขภาพ'
    },
    adjustPanel: {
      title: 'ปรับแต่งสีแบบไม่ทำลายไฟล์ (เร่งความเร็วด้วย WebGL)',
      exposure: 'การเปิดรับแสง (Exposure)',
      brightness: 'ความสว่าง (Brightness)',
      contrast: 'ความต่างระดับสี (Contrast)',
      saturation: 'ความอิ่มตัวของสี (Saturation)',
      bakeBtn: 'ใช้การปรับโทนสี (Bake)',
      gamutTitle: 'การตรวจสอบขอบเขตสีการพิมพ์ CMYK (Soft Proof)',
      gamutBtn: 'ตรวจสอบ',
      gamutDesc: 'เมื่อเปิดใช้งาน สีที่มีความอิ่มตัวสูงเกินขอบเขตการพิมพ์ Coated FOGRA39 จะถูกทำเครื่องหมายด้วยแถบสีม่วง'
    },
    printPanel: {
      title: 'รีเซ็ตข้อกำหนดทางกายภาพในคลิกเดียว',
      orientation: 'การจัดวางหน้ากระดาษ (Orientation)',
      portrait: 'แนวตั้ง',
      landscape: 'แนวนอน',
      customSize: 'ขนาดที่กำหนดเอง',
      width: 'ความกว้าง (มม.)',
      height: 'ความสูง (มม.)',
      pixelCalc: 'การคำนวณพิกเซลสำหรับการพิมพ์จริง',
      targetSize: 'ขนาดเป้าหมาย:',
      resolution: 'ความละเอียด:',
      requiredPixels: 'พิกเซลที่ต้องการ:',
      currentImgSize: 'ขนาดรูปภาพปัจจุบัน:',
      formula: 'สูตรคำนวณ: (ขนาด / 25.4) * DPI = พิกเซลที่ต้องการ',
      sufficient: '✅ ความละเอียดของภาพเพียงพอ! เหมาะสำหรับการพิมพ์คุณภาพสูง (จะปรับคุณภาพอัตโนมัติเมื่อส่งออก)',
      insufficientBilinear: '⚠️ ความละเอียดดั้งเดิมไม่เพียงพอ! การพิมพ์จะถูกดึงยืดขยาย ปัจจุบันตั้งค่าเป็น Bilinear แนะนำให้เปลี่ยนเป็น [Lanczos-3] ด้านล่าง หรืออัปโหลดภาพที่มีความละเอียดสูงกว่านี้',
      insufficientLanczos: 'ℹ️ ความละเอียดไม่เพียงพอ แต่ไม่ต้องกังวล! ระบบได้รับการตั้งค่าเป็นดึงภาพแบบ [{algo}] ระบบจะปรับขนาดภาพเป็น {w} x {h} px โดยอัตโนมัติระหว่างการส่งออกเพื่อให้พิมพ์เต็มแผ่นที่ความละเอียด {dpi} DPI ได้โดยไม่ต้องลด DPI',
      optimizerTitle: 'ผู้ช่วยสเกลภาพและควบคุมคุณภาพก่อนพิมพ์',
      qualityRating: 'ระดับคุณภาพผลลัพธ์:',
      qualityPerfect: '🌟 สมบูรณ์แบบ (Perfect)',
      qualityFine: '🟢 ดีเยี่ยม (Fine)',
      qualityAcceptable: '🟡 ยอมรับได้ (Acceptable)',
      qualityPoor: '🔴 ไม่เพียงพออย่างมาก (Poor)',
      descPerfect: 'เหมาะสำหรับการอ่านระยะใกล้ (เช่น หนังสือ อัลบั้ม ใบปลิว)',
      descFine: 'เหมาะสำหรับโปสเตอร์ โฆษณาในร่ม (ระยะมองที่เหมาะสม 0.5–1 เมตร)',
      descAcceptable: 'เหมาะสำหรับโปสเตอร์ระยะไกล ฉากหลังบูธนิทรรศการ (ระยะมองที่เหมาะสม 1–2 เมตร)',
      descPoor: 'คุณภาพไม่ดี ภาพอาจเบลอ (แนะนำให้เปลี่ยนภาพที่มีความละเอียดสูงขึ้นหรือลดขนาดงานพิมพ์)',
      viewingDistance: 'ระยะมองที่เหมาะสมที่สุดที่แนะนำ:',
      metersOrMore: 'เมตรขึ้นไป',
      recRes: 'ความละเอียดที่แนะนำสำหรับขนาดนี้:',
      applyLimit: 'ใช้ค่าจำกัดความละเอียดสูงสุดที่แนะนำ ({val} DPI)',
      upscaleLabel: 'อัลกอริทึมการขยายรูปภาพ',
      forceMinDpi: 'บังคับล็อกความละเอียดขั้นต่ำ (100 DPI)',
      autoDpi: 'ปรับ DPI ให้ตรงกับรูปภาพแบบ 1:1 โดยไม่สูญเสียความละเอียด',
      showBleed: 'แสดงเส้นตัดตก 3 มม.',
      bleedDesc: 'แสดงขอบตัดตกเพื่อเตือนเส้นปลอดภัยในการตัดขอบ (ระยะปลอดภัย 3 มม.)'
    },
    aiPanel: {
      title: 'เครื่องมือช่วยตัดสินใจ AI ท้องถิ่น (ONNX)',
      cutoutTitle: 'AI ลบพื้นหลังอัจฉริยะ',
      cutoutAccel: 'เร่งความเร็วด้วย CoreML',
      cutoutDesc: 'ตรวจจับวัตถุหลักและลบพื้นหลัง ทำงานแบบออฟไลน์ทั้งหมดในเครื่องของคุณ',
      cutoutBtn: 'ลบพื้นหลังด้วย AI',
      redactTitle: 'หน้ากากปกป้องความเป็นส่วนตัวอัจฉริยะ',
      redactAccel: 'ตรวจจับด้วย OCR',
      redactDesc: 'ตรวจจับและเบลอข้อมูลส่วนบุคคลโดยอัตโนมัติในคลิกเดียว: บัตรประชาชน, หมายเลขบัตรเครดิต, ใบหน้า',
      redactBtn: 'เซ็นเซอร์ข้อมูลส่วนตัวที่สำคัญ'
    },
    editPanel: {
      title: 'ฟังก์ชันการเลือกพื้นที่และแก้ไขรูปภาพ',
      desc: 'โปรดเปิดใช้ "เครื่องมือเลือกพื้นที่ (M)" ที่แถบเครื่องมือด้านซ้าย จากนั้นลากเมาส์บนรูปภาพเพื่อเลือกพื้นที่',
      copyBtn: 'คัดลอกพื้นที่ที่เลือก (Copy)',
      pasteBtn: 'วางที่กึ่งกลางภาพ (Paste)',
      deleteBtn: 'ลบพิกเซลที่เลือก / ยกเลิกการวาง (Delete)',
      blurBtn: 'เบลอพื้นที่ที่เลือก (Blur)',
      selectionArea: 'พื้นที่ที่เลือกปัจจุบัน',
      startCoords: 'พิกัดเริ่มต้น (X, Y):',
      dimensions: 'ขนาดกว้าง x สูง (W x H):',
      clipboardTitle: 'คลิปบอร์ดรูปภาพ (พร้อมใช้งาน)',
      clipboardSize: 'ขนาด:'
    },
    footer: {
      file: 'ไฟล์:',
      dim: 'ขนาดพิกเซล:',
      physical: 'ขนาดพิมพ์จริง:',
      zoom: 'อัตราการย่อขยาย:',
      targetSpace: 'พื้นที่สี:'
    },
    helpModal: {
      title: 'คำแนะนำเครื่องมือปรับแต่งภาพและควบคุมคุณภาพก่อนพิมพ์ DevPixel',
      close: 'ปิด (Esc)',
      tabManual: '📖 คู่มือการใช้งานและฟังก์ชัน',
      tabPrivacy: '🔒 นโยบายความเป็นส่วนตัวและการปกป้องข้อมูล',
      manual: {
        sections: [
          {
            title: '1. การเลื่อนและย่อขยาย (Pan & Zoom)',
            content: 'เลือกเครื่องมือเลื่อน (H) ด้านซ้าย คลิกเมาส์ซ้ายค้างไว้บนหน้าจอเพื่อเลื่อนภาพ หรือกดปุ่ม "Spacebar" บนคีย์บอร์ดค้างไว้ขณะใช้เครื่องมืออื่นเพื่อเลื่อนชั่วคราว หมุนลูกกลิ้งเมาส์หรือใช้ปุ่มด้านบนในการย่อขยายภาพ ระบบมีระบบล็อกปลอดภัยเพื่อป้องกันภาพหลุดหน้าจอ'
          },
          {
            title: '2. การปรับแต่งสีและบันทึกค่าลงภาพ (Baking)',
            content: 'ไปที่แท็บ "ปรับแต่งภาพ" ทางด้านขวา ลากแถบระดับความสว่าง การเปิดรับแสง ฯลฯ เพื่อพรีวิวสีภาพแบบเรียลไทม์ผ่าน WebGL เมื่อพอใจแล้ว ต้องคลิกปุ่ม "ใช้การปรับโทนสี (Bake)" ด้านล่าง เพื่อนำค่าสีไปบันทึกลงพิกเซลภาพจริงและจัดเก็บลงประวัติการทำงาน'
          },
          {
            title: '3. การแก้ไขพื้นที่, ลบอัตโนมัติ และเลเยอร์วางภาพ',
            content: 'ใช้เครื่องมือเลือกพื้นที่ (M) ลากกล่องขอบเขตบนภาพ: คัดลอกและวาง: คลิกคัดลอกพิกเซลลงคลิปบอร์ด เมื่อวางจะเกิดเลเยอร์ลอย สามารถลากเมาส์เลื่อนตำแหน่งได้ ดับเบิลคลิกหรือกดตกลงเพื่อรวมเข้ากับภาพหลัก ลบหรือยกเลิกโดยคลิกปุ่มยกเลิกหรือกดปุ่ม Delete/Backspace บนคีย์บอร์ด ลบพื้นที่แบบเนียน: คลิก "ลบพื้นที่เลือก" หรือกด Delete/Backspace ระบบจะเฉลี่ยสีรอบข้างมาถมแทนที่อย่างเนียนตา เบลอป้องกันข้อมูลส่วนตัว: คลิก "เบลอพื้นที่เลือก" เพื่อทำเบลอแบบ 25x25 อย่างหนาแน่น ทำให้ข้อความไม่สามารถอ่านได้'
          },
          {
            title: '4. ข้อกำหนดงานพิมพ์, เส้นตัดตก และผู้ช่วยก่อนพิมพ์',
            content: 'เลือกเครื่องมือครอบตัด (C) ด้านซ้าย แล้วตั้งค่าที่แท็บ "พิมพ์ด่วน" ด้านขวา: เส้นตัดตก: รองรับการหมุนแนวตั้งแนวนอนอัตโนมัติและแสดงเส้นตัดตกแบบเส้นประระยะ 3 มม. แนะนำ DPI: ระบบจะคำนวณ DPI แนะนำตามขนาดพิมพ์ที่เลือก (A0-A5) สามารถกด "ใช้ค่าจำกัดความละเอียดสูงสุดที่แนะนำ" เพื่อให้ได้ DPI สูงสุดโดยไฟล์ไม่ใหญ่เกินไป ล็อก DPI ต่ำสุด: ป้องกันภาพแตกเป็นพิกเซลโดยล็อก DPI ต่ำสุดที่ 100 DPI การขยายภาพ: หากภาพเล็กเกินไป อัลกอริทึม Lanczos-3 จะช่วยเพิ่มความคมชัดของขอบรูปภาพเมื่อพิมพ์ใหญ่โดยไม่ต้องลด DPI'
          },
          {
            title: '5. AI ลบพื้นหลังออฟไลน์และการสแกนความเป็นส่วนตัว',
            content: 'ในแท็บ "ผู้ช่วย AI" คลิก "ลบพื้นหลังด้วย AI" เพื่อลบภาพพื้นหลังออกในเครื่อง และคลิก "ตรวจจับความเป็นส่วนตัว" เพื่อสแกนหาข้อมูลส่วนบุคคลที่อาจหลุดและเข้าทำการเบลอปิดบัง'
          }
        ],
        shortcutsTitle: '⌨️ ตารางแป้นพิมพ์ลัด (Shortcuts)',
        shortcuts: [
          { key: 'Space (กดค้าง)', desc: 'เลื่อนหน้าจอ (Hand Pan)' },
          { key: 'Cmd / Ctrl + Z', desc: 'เลิกทำขั้นตอนก่อนหน้า (Undo)' },
          { key: 'Cmd / Ctrl + Shift + Z', desc: 'ทำซ้ำขั้นตอน (Redo)' },
          { key: 'Delete / Backspace', desc: 'ลบพื้นที่เลือก / ยกเลิกเลเยอร์วาง' },
          { key: 'H', desc: 'เปลี่ยนเป็นเครื่องมือเลื่อน' },
          { key: 'C', desc: 'เปลี่ยนเป็นเครื่องมือครอบตัด' },
          { key: 'M', desc: 'เปลี่ยนเป็นเครื่องมือเลือกพื้นที่' },
          { key: 'A', desc: 'เปลี่ยนเป็นเครื่องมือเขียนเวกเตอร์' },
          { key: 'S', desc: 'เปลี่ยนเป็นเครื่องมือลงลายเซ็น' },
          { key: 'F1', desc: 'เปิดหน้าต่างความช่วยเหลือ' }
        ]
      },
      privacy: {
        bannerTitle: 'คำประกาศความปลอดภัยข้อมูลแบบออฟไลน์และภายในเครื่อง 100%',
        bannerContent: 'โครงการ DevPixel ยึดมั่นในหลักการ "ความเป็นส่วนตัวต้องมาก่อน (Privacy First)" กระบวนการคำนวณและการทำงานทั้งหมดจะเกิดขึ้นเฉพาะภายในเครื่องคอมพิวเตอร์ของคุณเท่านั้น ปราศจากความเสี่ยงต่อการรั่วไหลผ่านเครือข่าย',
        sections: [
          {
            title: '1. สถาปัตยกรรมการทำงานในเครื่อง 100%',
            content: 'รูปภาพ เอกสาร หรือบัตรประชาชนใดๆ ที่นำเข้าสู่แอปพลิเคชันนี้ จะถูกประมวลผลผ่าน WebGL, ตัวจัดการ Canvas, ระบบลบภาพลบรอยแผล และการดึงสเกล Lanczos-3 ภายในบราวเซอร์หรือแซนด์บ็อกซ์ของแอปพลิเคชันฝั่งเครื่องของคุณเท่านั้น ไม่มีการอัปโหลดส่งต่อไปยังเซิร์ฟเวอร์คลาวด์ภายนอกใดๆ ทั้งสิ้น'
          },
          {
            title: '2. การทำงานออฟไลน์ของระบบ AI และ OCR',
            content: 'ระบบลบพื้นหลังด้วย AI และระบบสแกนตัวอักษร OCR ทำงานผ่านโมดูลอัจฉริยะที่อยู่ในตัวแอปพลิเคชันโดยตรง แอปพลิเคชันไม่มีระบบการรายงานข้อมูลใช้งาน (Telemetry APIs) และผลสแกนจะแสดงบนหน้าจอเพียงชั่วคราวเท่านั้น ไม่มีการจัดเก็บหรือส่งต่อให้บุคคลที่สาม'
          },
          {
            title: '3. ความปลอดภัยในการแปลงพื้นที่สีและการส่งออกไฟล์ก่อนพิมพ์',
            content: 'โมดูล `@devpixel/cmyk-wasm` เป็นโค้ดภาษา Rust ที่คอมไพล์ทำงานแบบ WebAssembly ภายในบราวเซอร์ของคุณโดยตรง การแปลงสี sRGB เป็น CMYK (Fogra39), ไฟล์ TIFF และไฟล์ PDF/X-1a จะถูกสร้างขึ้นในเครื่องและบันทึกตรงลงดิสก์ของคุณ ปลอดภัยต่อทรัพย์สินทางปัญญาเชิงพาณิชย์ของคุณสูงสุด'
          },
          {
            title: '4. การเบลอเซ็นเซอร์ข้อมูลส่วนบุคคลที่ย้อนคืนไม่ได้',
            content: 'เมื่อคุณใช้งานระบบเบลอภาพ ระบบจะคำนวณเบลอแบบ Box Blur ขนาด 25x25 ซึ่งตามหลักคณิตศาสตร์แล้วจะไม่สามารถย้อนกระบวนการกลับมาเป็นภาพเดิมได้ ช่วยยืนยันว่าข้อมูลที่เซ็นเซอร์ไปจะปลอดภัย 100% จากการถอดรหัสย้อนกลับ'
          }
        ],
        effectiveDate: 'ปรับปรุงล่าสุดและมีผลบังคับใช้เมื่อวันที่ 11 กรกฎาคม พ.ศ. 2569 แอปพลิเคชันนี้สามารถทำงานได้ตามปกติแม้ไม่ได้เชื่อมต่ออินเทอร์เน็ต โปรดใช้งานด้วยความอุ่นใจ'
      }
    },
    alerts: {
      autoMatchedDpi: 'ปรับระดับความละเอียดที่เหมาะสมอัตโนมัติแล้ว: {dpi} DPI (ส่งออก 1:1 ไร้การสูญเสียคุณภาพ)',
      undoSuccess: 'ยกเลิกขั้นตอนก่อนหน้าแล้ว',
      redoSuccess: 'ทำซ้ำขั้นตอนล่าสุดแล้ว',
      toneApplied: 'ปรับแต่งโทนสีสำเร็จแล้ว!',
      toneFailed: 'การปรับสีล้มเหลว: {err}',
      fileClosed: 'ปิดไฟล์ภาพแล้ว',
      copyPrompt: 'โปรดเลือกพื้นที่บนหน้าจอก่อนทำการคัดลอก',
      copySuccess: 'คัดลอกพื้นที่ที่เลือกเรียบร้อยแล้ว!',
      deletePrompt: 'โปรดเลือกพื้นที่บนหน้าจอก่อนทำการลบ',
      pasteCancel: 'ยกเลิกและลบเลเยอร์วางเรียบร้อยแล้ว!',
      deleteSuccess: 'ลบพื้นที่ที่เลือกและถมสีตามขอบรอบข้างเรียบร้อยแล้ว!',
      blurPrompt: 'โปรดเลือกพื้นที่บนหน้าจอก่อนทำการเบลอ',
      blurSuccess: 'เบลอพื้นที่ที่เลือกสำเร็จแล้ว!',
      pastePrompt: 'ไม่มีข้อมูลในคลิปบอร์ด โปรดคัดลอกพื้นที่ก่อนทำการวาง',
      pasteReady: 'วางเลเยอร์ภาพแล้ว! สามารถลากเพื่อปรับตำแหน่งและดับเบิลคลิกเพื่อรวมภาพเข้าด้วยกัน',
      pasteConfirm: 'วางและรวมภาพสำเร็จแล้ว!',
      loadOnnx: 'กำลังโหลดโมเดล AI ลบพื้นหลัง...',
      recognizingCutout: 'กำลังตรวจหาขอบวัตถุและทำมาส์กโปร่งใส...',
      cutoutSuccess: 'ลบพื้นหลังสำเร็จแล้ว (เร่งความเร็วด้วย GPU ในเครื่อง)',
      scanningOcr: 'กำลังสแกนหาข้อมูลส่วนบุคคลที่สำคัญ (OCR)...',
      scanOcrResultAlert: '【ระบบช่วยตรวจสแกนความเป็นส่วนตัว AI】\n\nสแกนเสร็จสิ้น! ไม่พบข้อมูลประเภทบัตรประชาชน หมายเลขบัตรเครดิต หรือใบหน้าบุคคลทั่วไปในรูปภาพนี้\n\n💡 คำแนะนำ: คุณสามารถใช้เครื่องมือเลือกพื้นที่ (M) ทางด้านซ้ายครอบคลุมข้อมูลที่สำคัญ จากนั้นเลือก "เบลอพื้นที่เลือก" ในส่วนการแก้ไขภาพด้านขวาเพื่อเซ็นเซอร์ด้วยตนเองได้',
      scanOcrSuccess: 'สแกนเสร็จสิ้น ไม่พบข้อมูลส่วนตัวที่สำคัญ',
      convertingColor: 'กำลังแปลงรูปแบบสีและสร้างไฟล์สำหรับส่งพิมพ์...',
      pngExportSuccess: 'ส่งออกไฟล์ sRGB PNG สำเร็จแล้ว!',
      exportSuccess: 'ส่งออกไฟล์ {format} สำเร็จแล้ว!',
      exportSuccessAlert: '【ส่งออกไฟล์พิมพ์สำเร็จ】\nชื่อไฟล์: {filename}\nขนาดพิมพ์: {size}\nความละเอียด: {dpi} DPI\nระดับความลึกสี: 8-bit CMYK\n\nไฟล์ภาพมีโปรไฟล์สี Fogra39 และขอบตัดตกที่ถูกต้องสำหรับการส่งโรงพิมพ์เรียบร้อยแล้ว!',
      exportFailed: 'การส่งออกล้มเหลว: {err}',
      appliedRes: 'ใช้ค่าจำกัดความละเอียดแนะนำแล้ว: {dpi} DPI'
    },
    presets: {
      A0: 'ป้ายโฆษณาขนาดใหญ่พิเศษ A0 ระยะมองที่เหมาะสมมากกว่า 2 เมตร การตั้ง DPI ต่ำช่วยให้ขนาดไฟล์เล็กลงมากโดยภาพยังคมชัดสวยงามเมื่อมองระยะจริง',
      A1: 'โปสเตอร์ขนาดใหญ่ A1 ระยะมองที่แนะนำ 1.5 - 2 เมตร ตั้งค่าที่ 150 DPI ก็เพียงพอต่อความสวยงามคมชัดสูงสุดแล้ว',
      A2: 'โปสเตอร์ขนาดกลางหรือป้ายนิทรรศการ A2 ระยะมองที่แนะนำ 1 - 1.5 เมตร ค่า 200 DPI ช่วยรักษาสมดุลระหว่างคุณภาพความชัดและขนาดไฟล์ได้ดีที่สุด',
      A3B4: 'แผ่นพับหรือเมนูอาหารขนาด A3/B4 ระยะมองที่แนะนำ 0.5 - 1 เมตร แนะนำ 250 DPI เพื่อให้อ่านตัวหนังสือขนาดเล็กได้คมกริบ',
      customLarge: 'ขนาดที่กำหนดเองขนาดใหญ่พิเศษ ระยะมองที่เหมาะสมมากกว่า 2 เมตร การลด DPI ช่วยลดภาระการประมวลผลและลดขนาดไฟล์',
      customMedLarge: 'ขนาดที่กำหนดเองขนาดปานกลางถึงใหญ่ ระยะมองแนะนำ 1 - 2 เมตร แนะนำตั้งค่าที่ 180 DPI',
      customMed: 'ขนาดกำหนดเองขนาดกลาง ระยะมองแนะนำ 0.5 - 1 เมตร ตั้งค่า 250 DPI ให้ภาพออกมารายละเอียดครบถ้วน',
      customSmall: 'ขนาดกำหนดเองขนาดเล็กสำหรับดูระยะใกล้ ระยะมองต่ำกว่า 0.5 เมตร แนะนำตั้งค่าอย่างน้อย 600 DPI เพื่อความเนียนตา',
      defaultHandheld: 'หนังสือ ภาพถ่าย หรือรูปที่ต้องมองระยะใกล้ ระยะมองต่ำกว่า 0.5 เมตร ต้องใช้ 300 - 600 DPI เท่านั้นเพื่อไม่ให้เห็นเม็ดพิกเซลบนภาพ'
    }
  },
  id: {
    studioMode: 'MODE STUDIO',
    fitCanvas: 'Sesuaikan Kanvas',
    resetAdjustments: 'Atur Ulang Penyesuaian',
    printResolution: 'Resolusi Output Cetak',
    dpi72: '72 DPI (Web)',
    dpi150: '150 DPI (Penyalinan Umum)',
    dpi300: '300 DPI (Cetak Profesional)',
    dpiCustom: 'DPI Kustom',
    dpiValue: 'Nilai',
    saveAndExport: 'Simpan & Ekspor',
    savePNG: 'Simpan gambar biasa (PNG)',
    savePNGDesc: 'Cocok untuk dibagikan di web dan dilihat di layar umum (sRGB).',
    saveTIFF: 'Simpan file foto standar (TIFF)',
    saveTIFFDesc: 'Cocok untuk toko fotokopi dan cetak foto (CMYK).',
    savePDF: 'Simpan file cetak PDF/X profesional',
    savePDFDesc: 'Cocok untuk percetakan dan penerbitan massal (dengan bleed 3mm dan profil warna).',
    closeFile: 'Tutup File Saat Ini',
    closeFileDesc: 'Bersihkan area kerja dan kembali ke layar unggah utama.',
    tooltips: {
      openFile: 'Buka file baru',
      panZoom: 'Geser & Zoom (H)',
      crop: 'Potong Ukuran Cetak (C)',
      markup: 'Alat Markup Vektor (A)',
      signature: 'Tanda Tangan Aman (S)',
      marquee: 'Alat Pilihan Marquee (M)',
      help: 'Panduan & Pintasan (F1)'
    },
    dragOverlay: {
      title: 'Seret gambar ke sini untuk memuat',
      desc: 'Mendukung format PNG, JPEG, TIFF, RAW'
    },
    noImage: {
      title: 'Silakan buka atau seret gambar ke sini',
      desc: 'Mendukung format PNG, JPEG, TIFF, PDF/X, dll.',
      button: 'Pilih File'
    },
    canvas: {
      bleedLabel: 'Zona Aman Bleed 3mm (Trim Boundary)',
      confirmPaste: 'Konfirmasi Tempel',
      cancel: 'Batal',
      signatureTitle: 'Papan Tanda Tangan Vektor Terenkripsi',
      signatureDesc: 'Tanda tangan di touchpad lalu buka kunci dengan Touch ID',
      securityLevel: 'Tingkat Keamanan: AES-256',
      signatureBtn: 'Tanda Tangan dengan Touch ID'
    },
    tabs: {
      adjust: 'Penyesuaian Gambar',
      print: 'Cetak Satu Klik',
      ai: 'Asisten AI',
      edit: 'Edit Gambar'
    },
    adjustPanel: {
      title: 'Penyuntingan Warna Non-destruktif (Akselerasi WebGL)',
      exposure: 'Eksposur (Exposure)',
      brightness: 'Kecerahan (Brightness)',
      contrast: 'Kontras (Contrast)',
      saturation: 'Saturasi (Saturation)',
      bakeBtn: 'Terapkan Perubahan Nada (Bake)',
      gamutTitle: 'Soft Proofing Gamut Cetak CMYK',
      gamutBtn: 'Bukti',
      gamutDesc: 'Saat diaktifkan, warna jenuh di luar gamut cetak untuk Coated FOGRA39 akan ditandai dengan garis-garis ungu.'
    },
    printPanel: {
      title: 'Atur Ulang Spesifikasi Fisik Satu Klik',
      orientation: 'Orientasi Halaman (Orientation)',
      portrait: 'Potret',
      landscape: 'Lanskap',
      customSize: 'Ukuran Kustom',
      width: 'Lebar (mm)',
      height: 'Tinggi (mm)',
      pixelCalc: 'Perhitungan Piksel Cetak Fisik',
      targetSize: 'Ukuran Target:',
      resolution: 'Resolusi:',
      requiredPixels: 'Piksel yang Dibutuhkan:',
      currentImgSize: 'Ukuran Gambar Saat Ini:',
      formula: 'Rumus: (Ukuran / 25.4) * DPI = Piksel yang Dibutuhkan',
      sufficient: '✅ Resolusi gambar cukup! Cocok untuk pencetakan berkualitas tinggi (dioptimalkan otomatis saat ekspor).',
      insufficientBilinear: '⚠️ Resolusi gambar tidak cukup! Pencetakan akan diregangkan. Saat ini diatur ke Bilinear. Disarankan untuk beralih ke upsampling [Lanczos-3] di bawah, atau unggah gambar dengan resolusi lebih tinggi.',
      insufficientLanczos: 'ℹ️ Resolusi tidak cukup, tapi jangan khawatir! Sistem diatur ke upsampling [{algo}]. Gambar akan secara otomatis ditingkatkan menjadi {w} x {h} px saat ekspor untuk memenuhi cetak penuh {dpi} DPI tanpa menurunkan DPI.',
      optimizerTitle: 'Asisten Pra-cetak & Kualitas',
      qualityRating: 'Peringkat Kualitas Output:',
      qualityPerfect: '🌟 Sempurna (Perfect)',
      qualityFine: '🟢 Baik (Fine)',
      qualityAcceptable: '🟡 Cukup (Acceptable)',
      qualityPoor: '🔴 Kurang (Poor)',
      descPerfect: 'Cocok untuk dibaca dari jarak dekat (buku, album, brosur)',
      descFine: 'Cocok untuk poster, iklan dalam ruangan (jarak pandang 0.5-1m)',
      descAcceptable: 'Cocok untuk poster jarak jauh, dinding latar pameran (jarak pandang 1-2m)',
      descPoor: 'Kualitas kurang, rentan kabur (disarankan gambar dengan resolusi lebih tinggi atau ukuran cetak lebih kecil)',
      viewingDistance: 'Jarak Pandang yang Direkomendasikan:',
      metersOrMore: 'meter atau lebih',
      recRes: 'Resolusi yang Direkomendasikan:',
      applyLimit: 'Terapkan Batas Rekomendasi ({val} DPI)',
      upscaleLabel: 'Algoritma Upsampling',
      forceMinDpi: 'Kunci resolusi aman minimum (100 DPI)',
      autoDpi: 'Optimalkan DPI agar cocok dengan gambar 1:1 tanpa kehilangan kualitas',
      showBleed: 'Tampilkan Garis Bleed 3mm',
      bleedDesc: 'Gambarkan batas bleed, menunjukkan garis aman trim (margin 3 mm).'
    },
    aiPanel: {
      title: 'Mesin Asisten AI Lokal (ONNX)',
      cutoutTitle: 'AI Penghapus Latar Belakang',
      cutoutAccel: 'Akselerasi CoreML',
      cutoutDesc: 'Deteksi subjek latar depan dan hapus latar belakang. Sepenuhnya offline di perangkat Anda.',
      cutoutBtn: 'Jalankan Hapus Latar Belakang',
      redactTitle: 'Masker Sensor Privasi Cerdas',
      redactAccel: 'Deteksi OCR',
      redactDesc: 'Deteksi dan buramkan informasi pribadi secara otomatis dalam satu klik: KTP, nomor kartu kredit, wajah.',
      redactBtn: 'Jalankan Sensor Privasi'
    },
    editPanel: {
      title: 'Fitur Seleksi & Edit Gambar',
      desc: 'Silakan aktifkan "Alat Pilihan Marquee (M)" dari bilah alat kiri, lalu seret di kanvas untuk memilih area.',
      copyBtn: 'Salin Area Seleksi (Copy)',
      pasteBtn: 'Tempel ke Tengah Gambar (Paste)',
      deleteBtn: 'Hapus Piksel Seleksi / Batalkan Tempel (Delete)',
      blurBtn: 'Buramkan Area Seleksi (Blur)',
      selectionArea: 'Area Seleksi Saat Ini',
      startCoords: 'Koordinat Mulai (X, Y):',
      dimensions: 'Dimensi (W x H):',
      clipboardTitle: 'Buffer Papan Klip (Siap)',
      clipboardSize: 'Size:'
    },
    footer: {
      file: 'FILE:',
      dim: 'DIMENSI:',
      physical: 'FISIK:',
      zoom: 'ZOOM:',
      targetSpace: 'RUANG WARNA:'
    },
    helpModal: {
      title: 'Panduan Penyesuaian Gambar & Asisten Pra-cetak DevPixel',
      close: 'Tutup (Esc)',
      tabManual: '📖 Panduan Pengoperasian & Ciri',
      tabPrivacy: '🔒 Kebijakan Privasi & Perlindungan Data',
      manual: {
        sections: [
          {
            title: '1. Geser & Zoom (Pan & Zoom)',
            content: 'Pilih Alat Geser (H) di sebelah kiri, klik dan seret pada kanvas untuk menggeser. Anda juga dapat menahan "tombol spasi" di alat mana pun untuk menggeser sementara. Zoom menggunakan bilah atas, tombol zoom, atau roda mouse. Batas zoom aman mencegah gambar hilang dari layar.'
          },
          {
            title: '2. Penyesuaian Gambar & Penerapan (Baking)',
            content: 'Pergi to tab "Penyesuaian Gambar" di sebelah kanan, geser kecerahan, eksposur, dll., untuk melihat pratinjau warna secara real-time melalui WebGL. Setelah puas, Anda harus mengklik tombol "Terapkan Perubahan Nada (Bake)" di bawah untuk menyimpan perubahan pada piksel gambar dan riwayat kerja.'
          },
          {
            title: '3. Edit Area, Penghapusan Mulus, & Lapisan Tempel',
            content: 'Gunakan Alat Seleksi (M) untuk menyeret area pada gambar: Salin & Tempel: Salin piksel ke papan klip. Saat ditempel, akan muncul lapisan melayang yang bisa digeser dengan mouse. Klik dua kali atau konfirmasi di sebelah kanan untuk menggabungkan. Batal dengan klik batal atau tekan Delete/Backspace pada keyboard. Penghapusan Mulus: Klik "Hapus Area Seleksi" atau tekan Delete/Backspace, sistem akan menyamakan piksel sekitar secara otomatis. Buram Privasi: Klik "Buramkan Area Seleksi" untuk menerapkan buram Box Blur 25x25 yang sangat kuat, membuat teks sama sekali tidak terbaca.'
          },
          {
            title: '4. Spesifikasi Cetak, Bleed, & Asisten Pra-cetak',
            content: 'Pilih Alat Potong (C) di kiri, lalu atur opsi di tab "Cetak Satu Klik" di kanan. Bleed: Mendukung orientasi otomatis/manual e menampilkan garis bleed putus-putus 3mm. Rekomendasi DPI: Menghitung DPI yang disarankan berdasarkan ukuran cetak (A0-A5). Klik "Terapkan Batas Rekomendasi" untuk menetapkan DPI optimal tanpa membuat file terlalu besar. Kunci DPI Minimum: Mencegah gambar pecah dengan mengunci DPI minimum pada 100 DPI. Algoritma Upsampling: Jika gambar kecil, algoritma Lanczos-3 membantu mempertajam tepi gambar saat dicetak besar.'
          },
          {
            title: '5. AI Hapus Latar Belakang Offline & Pemindaian Privasi',
            content: 'Di tab "AI Assistant", klik "Jalankan Hapus Latar Belakang" untuk menghapus latar belakang secara lokal, dan klik "Jalankan Sensor Privasi" untuk memindai data pribadi yang mungkin bocor dan menutupinya.'
          }
        ],
        shortcutsTitle: '⌨️ Pintasan Keyboard (Shortcuts)',
        shortcuts: [
          { key: 'Space (Tahan)', desc: 'Geser Layar (Hand Pan)' },
          { key: 'Cmd / Ctrl + Z', desc: 'Batalkan (Undo)' },
          { key: 'Cmd / Ctrl + Shift + Z', desc: 'Ulangi (Redo)' },
          { key: 'Delete / Backspace', desc: 'Hapus Seleksi / Batalkan Tempel' },
          { key: 'H', desc: 'Ganti ke Alat Geser' },
          { key: 'C', desc: 'Ganti ke Alat Potong' },
          { key: 'M', desc: 'Ganti ke Alat Seleksi' },
          { key: 'A', desc: 'Ganti ke Alat Markup' },
          { key: 'S', desc: 'Ganti ke Alat Tanda Tangan' },
          { key: 'F1', desc: 'Buka Panduan Bantuan' }
        ]
      },
      privacy: {
        bannerTitle: 'Pernyataan Keamanan Data Lokal & Offline 100%',
        bannerContent: 'Proyek DevPixel menjunjung tinggi prinsip "Privasi Utama (Privacy First)". Semua proses komputasi dan kerja dilakukan di dalam komputer Anda, bebas dari risiko kebocoran data.',
        sections: [
          {
            title: '1. Arsitektur Komputasi Lokal 100%',
            content: 'Setiap gambar, dokumen, atau kartu identitas yang dimuat akan diproses melalui WebGL, Canvas, penghapusan noda, e upsampling Lanczos-3 di browser atau sandbox lokal Anda saja. Tidak ada data yang diunggah ke server cloud eksternal.'
          },
          {
            title: '2. Operasi Offline AI & OCR',
            content: 'Penghapusan latar belakang dengan AI dan pemindaian OCR dijalankan secara lokal di perangkat Anda. Aplikasi tidak memiliki API pelaporan data (telemetri) dan hasil pemindaian hanya muncul sementara di skrin tanpa disimpan.'
          },
          {
            title: '3. Keamanan Konversi Warna & Ekspor Pra-cetak',
            content: 'Modul `@devpixel/cmyk-wasm` adalah kode Rust que dikompilasi ke WebAssembly para funcionar directamente en su navegador. La conversión de sRGB a CMYK (Fogra39), los archivos TIFF y PDF/X-1a se realizan en su ordenador local, manteniendo la privacidad de sus diseños.'
          },
          {
            title: '4. Buram Sensor Data Pribadi yang Tidak Dapat Dikembalikan',
            content: 'Saat menggunakan fitur buram, sistem menerapkan Box Blur 25x25 yang secara matematis tidak dapat dikembalikan ke gambar semula, menjamin data yang disensor aman 100% dari dekripsi terbalik.'
          }
        ],
        effectiveDate: 'Terakhir diperbarui dan berlaku pada 11 Juli 2026. Aplikasi ini dapat berjalan normal tanpa koneksi internet.'
      }
    },
    alerts: {
      autoMatchedDpi: 'Telah menyesuaikan resolusi cetak optimal otomatis: {dpi} DPI (ekspor 1:1 tanpa kehilangan kualitas)',
      undoSuccess: 'Telah membatalkan langkah sebelumnya',
      redoSuccess: 'Telah mengulangi langkah terakhir',
      toneApplied: 'Penyesuaian warna berhasil diterapkan!',
      toneFailed: 'Penerapan warna gagal: {err}',
      fileClosed: 'File gambar telah ditutup.',
      copyPrompt: 'Silakan pilih area di layar sebelum menyalin.',
      copySuccess: 'Area seleksi berhasil disalin!',
      deletePrompt: 'Silakan pilih area di layar sebelum menghapus.',
      pasteCancel: 'Telah membatalkan dan menghapus lapisan tempel!',
      deleteSuccess: 'Seleksi berhasil dihapus dan diisi dengan warna sekitar!',
      blurPrompt: 'Silakan pilih area di layar sebelum memburamkan.',
      blurSuccess: 'Buram area seleksi berhasil!',
      pastePrompt: 'Papan klip kosong. Silakan salin area sebelum menempel.',
      pasteReady: 'Lapisan tempel telah diletakkan! Geser untuk menyesuaikan posisi dan klik dua kali untuk menggabungkan.',
      pasteConfirm: 'Tempel dan penggabungan gambar berhasil!',
      loadOnnx: 'Sedang memuat model AI...',
      recognizingCutout: 'Sedang mendeteksi tepi subjek dan membuat masker transparan...',
      cutoutSuccess: 'Hapus latar belakang berhasil (dipercepat GPU lokal)',
      scanningOcr: 'Sedang memindai informasi pribadi yang sensitif (OCR)...',
      scanOcrResultAlert: '【Pemindaian Privasi Asisten AI DevPixel】\n\nPemindaian selesai! Tidak ada KTP, nomor kartu kredit, atau wajah yang terdeteksi di dokumen ini.\n\n💡 Tips: Anda dapat menggunakan Alat Seleksi (M) di sebelah kiri untuk menutupi informasi penting, lalu pilih "Buramkan Area Seleksi" di sebelah kanan untuk menyensor secara manual.',
      scanOcrSuccess: 'Pemindaian selesai. Tidak ada data pribadi sensitif yang ditemukan.',
      convertingColor: 'Sedang mengonversi warna dan membuat paket cetak...',
      pngExportSuccess: 'Ekspor file sRGB PNG berhasil!',
      exportSuccess: 'Ekspor file {format} berhasil!',
      exportSuccessAlert: '【Ekspor Cetak Berhasil】\nNama File: {filename}\nUkuran Cetak: {size}\nResolusi: {dpi} DPI\nKedalaman Warna: CMYK 8-bit\n\nFile gambar sekarang memiliki profil warna Fogra39 dan batas bleed yang benar untuk dikirim ke percetakan!',
      exportFailed: 'Ekspor gagal: {err}',
      appliedRes: 'Telah menerapkan batas resolusi yang disarankan: {dpi} DPI'
    },
    presets: {
      A0: 'Papan billboard besar A0, jarak pandang > 2m. Mengurangi DPI mengoptimalkan ukuran file tanpa mengurangi kualitas visual.',
      A1: 'Cartaz A1, distância de 1.5 - 2m. 150 DPI cukup untuk qualidade de impressão bem nítida.',
      A2: 'Cartaz médio A2, distância de 1 - 1.5m. 200 DPI fornece o melhor equilíbrio entre detalhes e tamanho do arquivo.',
      A3B4: 'Flyer/Menu A3/B4, distância de 0.5 - 1m. Recomendado 250 DPI para que o texto pequeno seja muito legível.',
      customLarge: 'Tamanho personalizado muito grande, distância > 2m. Reduzir o DPI ajuda a economizar o tamanho do arquivo.',
      customMedLarge: 'Tamanho personalizado médio-grande, distância de 1 - 2m. Recomendado 180 DPI.',
      customMed: 'Tamanho personalizado médio, distância de 0.5 - 1m. Use 250 DPI para detalhes suficientes.',
      customSmall: 'Tamanho personalizado pequeno para uso próximo, distância < 0.5m. Use no mínimo 600 DPI.',
      defaultHandheld: 'Livro, foto impressa ou foto de identidade para uso próximo (< 0.5m). Obrigatório usar de 300–600 DPI para evitar que a imagem pareça pixelada.'
    }
  },
  ms: {
    studioMode: 'MOD STUDIO',
    fitCanvas: 'Muat Kanvas',
    resetAdjustments: 'Tetapkan Semula Penyelarasan',
    printResolution: 'Resolusi Output Cetak',
    dpi72: '72 DPI (Web)',
    dpi150: '150 DPI (Salinan Biasa)',
    dpi300: '300 DPI (Cetak Profesional)',
    dpiCustom: 'DPI Kustom',
    dpiValue: 'Nilai',
    saveAndExport: 'Simpan & Eksport',
    savePNG: 'Simpan gambar biasa (PNG)',
    savePNGDesc: 'Sesuai untuk perkongsian di web dan tontonan di skrin umum (sRGB).',
    saveTIFF: 'Simpan fail foto standard (TIFF)',
    saveTIFFDesc: 'Sesuai untuk kedai fotokopi dan cetak foto (CMYK).',
    savePDF: 'Simpan fail cetak PDF/X profesional',
    savePDFDesc: 'Sesuai untuk percetakan dan penerbitan massa (dengan bleed 3mm dan profil warna).',
    closeFile: 'Tutup Fail Semasa',
    closeFileDesc: 'Bersihkan kawasan kerja dan kembali ke skrin muat naik utama.',
    tooltips: {
      openFile: 'Buka fail baru',
      panZoom: 'Gelongsor & Zoom (H)',
      crop: 'Potong Ukuran Cetak (C)',
      markup: 'Alat Markup Vektor (A)',
      signature: 'Tandatangan Selamat (S)',
      marquee: 'Alat Pilihan Marquee (M)',
      help: 'Panduan & Pintasan (F1)'
    },
    dragOverlay: {
      title: 'Seret gambar ke sini untuk memuatkan',
      desc: 'Menyokong format PNG, JPEG, TIFF, RAW'
    },
    noImage: {
      title: 'Sila buka atau seret gambar ke sini',
      desc: 'Menyokong format PNG, JPEG, TIFF, PDF/X, dll.',
      button: 'Pilih Fail'
    },
    canvas: {
      bleedLabel: 'Zon Selamat Bleed 3mm (Trim Boundary)',
      confirmPaste: 'Sahkan Tampal',
      cancel: 'Batal',
      signatureTitle: 'Papan Tandatangan Vektor Terenkripsi',
      signatureDesc: 'Tandatangan di touchpad kemudian buka kunci dengan Touch ID',
      securityLevel: 'Tahap Keselamatan: AES-256',
      signatureBtn: 'Tandatangan dengan Touch ID'
    },
    tabs: {
      adjust: 'Penyelarasan Gambar',
      print: 'Cetak Satu Klik',
      ai: 'Pembantu AI',
      edit: 'Edit Gambar'
    },
    adjustPanel: {
      title: 'Penyuntingan Warna Non-destruktif (Pecutan WebGL)',
      exposure: 'Pendedahan (Exposure)',
      brightness: 'Kecerahan (Brightness)',
      contrast: 'Kontras (Contrast)',
      saturation: 'Saturasi (Saturation)',
      bakeBtn: 'Apply Perubahan Nada (Bake)',
      gamutTitle: 'Soft Proofing Gamut Cetak CMYK',
      gamutBtn: 'Bukti',
      gamutDesc: 'Apabila diaktifkan, warna tepu di luar gamut cetak untuk Coated FOGRA39 akan ditandakan dengan jalur ungu.'
    },
    printPanel: {
      title: 'Tetapkan Semula Spesifikasi Fizikal Satu Klik',
      orientation: 'Orientasi Halaman (Orientation)',
      portrait: 'Potret',
      landscape: 'Landskap',
      customSize: 'Saiz Kustom',
      width: 'Lebar (mm)',
      height: 'Tinggi (mm)',
      pixelCalc: 'Pengiraan Piksel Cetak Fizikal',
      targetSize: 'Saiz Sasaran:',
      resolution: 'Resolusi:',
      requiredPixels: 'Piksel yang Diperlukan:',
      currentImgSize: 'Saiz Gambar Semasa:',
      formula: 'Formula: (Saiz / 25.4) * DPI = Piksel yang Diperlukan',
      sufficient: '✅ Resolusi gambar mencukupi! Sesuai untuk percetakan berkualiti tinggi (dioptimumkan automatik semasa eksport).',
      insufficientBilinear: '⚠️ Resolusi gambar tidak mencukupi! Percetakan akan diregangkan. Pada masa ini ditetapkan ke Bilinear. Disarankan untuk beralih ke upsampling [Lanczos-3] di bawah, or muat naik gambar dengan resolusi lebih tinggi.',
      insufficientLanczos: 'ℹ️ Resolusi tidak mencukupi, tetapi jangan risau! Sistem ditetapkan ke upsampling [{algo}]. Gambar akan secara automatik ditingkatkan menjadi {w} x {h} px semasa eksport untuk memenuhi cetak penuh {dpi} DPI tanpa menurunkan DPI.',
      optimizerTitle: 'Pembantu Pra-cetak & Kualiti',
      qualityRating: 'Penilaian Kualiti Output:',
      qualityPerfect: '🌟 Sempurna (Perfect)',
      qualityFine: '🟢 Baik (Fine)',
      qualityAcceptable: '🟡 Cukup (Acceptable)',
      qualityPoor: '🔴 Kurang (Poor)',
      descPerfect: 'Sesuai untuk dibaca dari jarak dekat (buku, album, risalah)',
      descFine: 'Sesuai untuk poster, iklan dalam ruangan (jarak pandang 0.5-1m)',
      descAcceptable: 'Sesuai untuk poster jarak jauh, dinding latar pameran (jarak pandang 1-2m)',
      descPoor: 'Kualiti kurang, mudah kabur (disyorkan gambar dengan resolusi lebih tinggi atau saiz cetak lebih kecil)',
      viewingDistance: 'Jarak Pandang yang Disyorkan:',
      metersOrMore: 'meter atau lebih',
      recRes: 'Resolusi yang Disyorkan:',
      applyLimit: 'Terapkan Had Rekomendasi ({val} DPI)',
      upscaleLabel: 'Algoritma Upsampling',
      forceMinDpi: 'Kunci resolusi selamat minimum (100 DPI)',
      autoDpi: 'Optimumkan DPI supaya sepadan dengan gambar 1:1 tanpa kehilangan kualiti',
      showBleed: 'Tunjukkan Garis Bleed 3mm',
      bleedDesc: 'Gambarkan had bleed, menunjukkan garis selamat trim (margin 3 mm).'
    },
    aiPanel: {
      title: 'Enjin Pembantu AI Tempatan (ONNX)',
      cutoutTitle: 'AI Penghapus Latar Belakang',
      cutoutAccel: 'Pecutan CoreML',
      cutoutDesc: 'Kesan subjek latar depan dan hapus latar belakang. Sepenuhnya luar talian di peranti anda.',
      cutoutBtn: 'Jalankan Hapus Latar Belakang',
      redactTitle: 'Topeng Sensor Privasi Pintar',
      redactAccel: 'Kesan OCR',
      redactDesc: 'Kesan dan kaburkan maklumat peribadi secara automatik dalam satu klik: Kad Pengenalan, nombor kad kredit, wajah.',
      redactBtn: 'Jalankan Sensor Privasi'
    },
    editPanel: {
      title: 'Ciri Pilihan & Edit Gambar',
      desc: 'Sila aktifkan "Alat Pilihan Marquee (M)" dari bar alat kiri, kemudian seret di kanvas untuk memilih kawasan.',
      copyBtn: 'Salin Kawasan Pilihan (Copy)',
      pasteBtn: 'Tampal ke Tengah Gambar (Paste)',
      deleteBtn: 'Hapus Piksel Pilihan / Batalkan Tampal (Delete)',
      blurBtn: 'Kaburkan Kawasan Pilihan (Blur)',
      selectionArea: 'Kawasan Pilihan Semasa',
      startCoords: 'Koordinat Mula (X, Y):',
      dimensions: 'Dimensi (W x H):',
      clipboardTitle: 'Buffer Papan Keratan (Sedia)',
      clipboardSize: 'Saiz:'
    },
    footer: {
      file: 'FAIL:',
      dim: 'DIMENSI:',
      physical: 'FIZIKAL:',
      zoom: 'ZOOM:',
      targetSpace: 'RUANG WARNA:'
    },
    helpModal: {
      title: 'Panduan Penyelarasan Gambar & Pembantu Pra-cetak DevPixel',
      close: 'Tutup (Esc)',
      tabManual: '📖 Panduan Pengoperasian & Ciri',
      tabPrivacy: '🔒 Dasar Privasi & Perlindungan Data',
      manual: {
        sections: [
          {
            title: '1. Gelongsor & Zoom (Pan & Zoom)',
            content: 'Pilih Alat Geser (H) di sebelah kiri, klik dan seret pada kanvas untuk menggeser. Anda juga boleh menahan "tombol spasi" di alat mana-mana untuk menggeser sementara. Zoom menggunakan bar atas, tombol zoom, atau roda mouse. Had zoom selamat menghalang gambar hilang dari skrin.'
          },
          {
            title: '2. Penyelarasan Gambar & Penerapan (Baking)',
            content: 'Pergi ke tab "Penyelarasan Gambar" di sebelah kanan, geser kecerahan, eksposur, dll., untuk melihat pratinjau warna secara real-time melalui WebGL. Setelah berpuas hati, anda mesti mengklik butang "Terapkan Perubahan Nada (Bake)" di bawah untuk menyimpan perubahan pada piksel gambar dan sejarah kerja.'
          },
          {
            title: '3. Edit Kawasan, Penghapusan Mulus, & Lapisan Tampal',
            content: 'Gunakan Alat Pilihan (M) untuk menyeret kawasan pada gambar: Salin & Tampal: Salin piksel ke papan keratan. Apabila ditempel, akan muncul lapisan melayang yang boleh digeser dengan mouse. Klik dua kali atau sahkan di sebelah kanan untuk menggabungkan. Batal dengan klik batal atau tekan Delete/Backspace pada keyboard. Penghapusan Mulus: Klik "Hapus Kawasan Pilihan" atau tekan Delete/Backspace, sistem akan menyamakan piksel sekitar secara automatik. Kabur Privasi: Klik "Kaburkan Kawasan Pilihan" untuk menerapkan kabur Box Blur 25x25 yang sangat kuat, membuat teks sama sekali tidak terbaca.'
          },
          {
            title: '4. Spesifikasi Cetak, Bleed, & Pembantu Pra-cetak',
            content: 'Pilih Alat Potong (C) di kiri, lalu atur pilihan di tab "Cetak Satu Klik" di kanan. Bleed: Menyokong orientasi automatik/manual dan menampilkan garis bleed putus-putus 3mm. Rekomendasi DPI: Menghitung DPI yang disarankan berdasarkan ukuran cetak (A0-A5). Klik "Terapkan Batas Rekomendasi" untuk menetapkan DPI optimal tanpa membuat file terlalu besar. Kunci DPI Minimum: Mencegah gambar pecah dengan mengunci DPI minimum pada 100 DPI. Algoritma Upsampling: Jika gambar kecil, algoritma Lanczos-3 membantu mempertajam tepi gambar saat dicetak besar.'
          },
          {
            title: '5. AI Hapus Latar Belakang Luar Talian & Imbasan Privasi',
            content: 'Di tab "AI Assistant", klik "Jalankan Hapus Latar Belakang" untuk menghapus latar belakang secara lokal, dan klik "Jalankan Sensor Privasi" untuk memindai data peribadi yang mungkin bocor dan menutupinya.'
          }
        ],
        shortcutsTitle: '⌨️ Pintasan Keyboard (Shortcuts)',
        shortcuts: [
          { key: 'Space (Tahan)', desc: 'Gelongsor Skrin (Hand Pan)' },
          { key: 'Cmd / Ctrl + Z', desc: 'Batalkan (Undo)' },
          { key: 'Cmd / Ctrl + Shift + Z', desc: 'Ulangi (Redo)' },
          { key: 'Delete / Backspace', desc: 'Hapus Pilihan / Batalkan Tampal' },
          { key: 'H', desc: 'Ganti ke Alat Gelongsor' },
          { key: 'C', desc: 'Ganti ke Alat Potong' },
          { key: 'M', desc: 'Ganti ke Alat Pilihan' },
          { key: 'A', desc: 'Ganti ke Alat Markup' },
          { key: 'S', desc: 'Ganti ke Alat Tandatangan' },
          { key: 'F1', desc: 'Buka Panduan Bantuan' }
        ]
      },
      privacy: {
        bannerTitle: 'Pernyataan Keselamatan Data Tempatan & Luar Talian 100%',
        bannerContent: 'Projek DevPixel menjunjung tinggi prinsip "Privasi Utama (Privacy First)". Semua proses komputasi dan kerja dilakukan di dalam komputer anda, bebas dari risiko kebocoran data.',
        sections: [
          {
            title: '1. Arsitektur Komputasi Tempatan 100%',
            content: 'Setiap gambar, dokumen, atau kad pengenalan yang dimuatkan akan diproses melalui WebGL, Canvas, penghapusan noda, dan upsampling Lanczos-3 di browser atau sandbox tempatan anda sahaja. Tiada data yang diunggah ke server cloud luar.'
          },
          {
            title: '2. Operasi Luar Talian AI & OCR',
            content: 'Penghapusan latar belakang dengan AI dan pemindaian OCR dijalankan secara tempatan di peranti anda. Aplikasi tidak mempunyai API pelaporan data (telemetri) dan hasil pemindaian hanya muncul sementara di skrin tanpa disimpan.'
          },
          {
            title: '3. Keselamatan Konversi Warna & Eksport Pra-cetak',
            content: 'Modul `@devpixel/cmyk-wasm` adalah kod Rust yang dikompilasikan ke WebAssembly untuk berjalan langsung di browser anda. Konversi sRGB ke CMYK (Fogra39), fail TIFF, dan PDF/X-1a dibuat langsung di komputer anda, menjaga rahsia reka bentuk anda.'
          },
          {
            title: '4. Kabur Sensor Data Peribadi yang Tidak Boleh Dikembangkan',
            content: 'Semasa menggunakan ciri kabur, sistem menerapkan Box Blur 25x25 yang secara matematik tidak boleh dikembalikan ke gambar semula, menjamin data yang disensor selamat 100% dari dekripsi terbalik.'
          }
        ],
        effectiveDate: 'Terakhir dikemas kini dan berlaku pada 11 Julai 2026. Aplikasi ini dapat berjalan normal tanpa sambungan internet.'
      }
    },
    alerts: {
      autoMatchedDpi: 'Telah menyesuaikan resolusi cetak optimal automatik: {dpi} DPI (eksport 1:1 tanpa kehilangan kualiti)',
      undoSuccess: 'Telah membatalkan langkah sebelumnya',
      redoSuccess: 'Telah mengulangi langkah terakhir',
      toneApplied: 'Penyesuaian warna berjaya diterapkan!',
      toneFailed: 'Penerapan warna gagal: {err}',
      fileClosed: 'Fail gambar telah ditutup.',
      copyPrompt: 'Sila pilih kawasan di skrin sebelum menyalin.',
      copySuccess: 'Kawasan pilihan berjaya disalin!',
      deletePrompt: 'Sila pilih kawasan di skrin sebelum menghapus.',
      pasteCancel: 'Telah membatalkan dan menghapus lapisan tampal!',
      deleteSuccess: 'Pilihan berjaya dihapus dan diisi dengan warna sekitar!',
      blurPrompt: 'Sila pilih kawasan di skrin sebelum memburamkan.',
      blurSuccess: 'Kabur kawasan pilihan berjaya!',
      pastePrompt: 'Papan keratan kosong. Sila salin kawasan sebelum menempel.',
      pasteReady: 'Lapisan tempel telah diletakkan! Geser untuk menyesuaikan posisi dan klik dua kali untuk menggabungkan.',
      pasteConfirm: 'Tampal dan penggabungan gambar berjaya!',
      loadOnnx: 'Sedang memuatkan model AI...',
      recognizingCutout: 'Sedang mendeteksi tepi subjek dan membuat masker telus...',
      cutoutSuccess: 'Hapus latar belakang berjaya (dipercepat GPU tempatan)',
      scanningOcr: 'Sedang memindai maklumat peribadi yang sensitif (OCR)...',
      scanOcrResultAlert: '【Pemindaian Privasi Pembantu AI DevPixel】\n\nPemindaian selesai! Tiada Kad Pengenalan, nombor kad kredit, atau wajah yang terkesan di dokumen ini.\n\n💡 Tips: Anda boleh menggunakan Alat Pilihan (M) di sebelah kiri untuk menutupi maklumat penting, lalu pilih "Kaburkan Kawasan Pilihan" di sebelah kanan untuk menyensor secara manual.',
      scanOcrSuccess: 'Pemindaian selesai. Tiada data peribadi sensitif yang ditemui.',
      convertingColor: 'Sedang mengonversi warna dan membuat paket cetak...',
      pngExportSuccess: 'Eksport fail sRGB PNG berjaya!',
      exportSuccess: 'Eksport fail {format} berjaya!',
      exportSuccessAlert: '【Eksport Cetak Berjaya】\nNama Fail: {filename}\nUkuran Cetak: {size}\nResolusi: {dpi} DPI\nKedalaman Warna: CMYK 8-bit\n\nFail gambar sekarang mempunyai profil warna Fogra39 dan had bleed yang betul untuk dikirim ke percetakan!',
      exportFailed: 'Eksport gagal: {err}',
      appliedRes: 'Telah menerapkan had resolusi yang disyorkan: {dpi} DPI'
    },
    presets: {
      A0: 'Papan billboard besar A0, jarak pandang > 2m. Mengurangi DPI mengoptimumkan saiz fail tanpa mengurangkan kualiti visual.',
      A1: 'Poster besar A1, jarak pandang 1.5 - 2m. 150 DPI cukup untuk kualiti cetak yang sangat tajam.',
      A2: 'Poster sedang A2, jarak pandang 1 - 1.5m. 200 DPI memberikan keseimbangan terbaik antara butiran dan saiz fail.',
      A3B4: 'Flyer/Menu A3/B4, jarak pandang 0.5 - 1m. Disyorkan 250 DPI supaya teks kecil terbaca sangat tajam.',
      customLarge: 'Ukuran kustom besar, jarak pandang > 2m. Mengurangi DPI membantu menghemat saiz fail.',
      customMedLarge: 'Ukuran kustom sedang-besar, jarak pandang 1 - 2m. Disyorkan 180 DPI.',
      customMed: 'Ukuran kustom sedang, jarak pandang 0.5 - 1m. Gunakan 250 DPI untuk detail yang mencukupi.',
      customSmall: 'Ukuran kustom kecil untuk jarak dekat, jarak pandang < 0.5m. Gunakan sekurang-kurangnya 600 DPI.',
      defaultHandheld: 'Buku, foto cetak, or kad pengenalan untuk jarak dekat (< 0.5m). Wajib menggunakan 300 - 600 DPI supaya pixel tidak terlihat.'
    }
  }
};
