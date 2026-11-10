/**
 * Exports QR Code rendered inside container to high-resolution PNG
 */
export async function downloadAsPNG({
  canvasRef,
  filename = 'qrify-code.png',
  bgColor = '#ffffff',
  padding = 32,
  multiplier = 2,
}) {
  try {
    const canvas = canvasRef?.current?.querySelector('canvas') || canvasRef?.current;
    if (!canvas) {
      throw new Error('Canvas element not found for export');
    }

    const srcWidth = canvas.width;
    const srcHeight = canvas.height;

    // Create high-res offscreen canvas
    const exportCanvas = document.createElement('canvas');
    const targetSize = (Math.max(srcWidth, srcHeight) + padding * 2) * multiplier;
    exportCanvas.width = targetSize;
    exportCanvas.height = targetSize;

    const ctx = exportCanvas.getContext('2d');
    if (!ctx) throw new Error('Could not get 2D context');

    // Smooth rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    // Fill background if not transparent
    if (bgColor && bgColor !== 'transparent') {
      ctx.fillStyle = bgColor;
      // Optional subtle rounded corners for the exported image card
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    } else {
      ctx.clearRect(0, 0, exportCanvas.width, exportCanvas.height);
    }

    // Draw the QR canvas centered
    const destPadding = padding * multiplier;
    const destWidth = targetSize - destPadding * 2;
    const destHeight = targetSize - destPadding * 2;

    ctx.drawImage(canvas, destPadding, destPadding, destWidth, destHeight);

    // Convert to blob and download
    const blob = await new Promise((resolve) =>
      exportCanvas.toBlob(resolve, 'image/png', 1.0)
    );

    if (!blob) throw new Error('Failed to create image blob');

    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename.endsWith('.png') ? filename : `${filename}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);

    return true;
  } catch (err) {
    console.error('Download PNG failed:', err);
    throw err;
  }
}

/**
 * Exports QR Code as vector SVG file
 */
export function downloadAsSVG({
  svgRef,
  filename = 'qrify-code.svg',
  bgColor = '#ffffff',
}) {
  try {
    const svgElement = svgRef?.current?.querySelector('svg') || svgRef?.current;
    if (!svgElement) {
      throw new Error('SVG element not found for export');
    }

    // Clone element so we can modify without affecting DOM
    const clonedSvg = svgElement.cloneNode(true);
    clonedSvg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clonedSvg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');

    // If background is needed and not already in SVG
    if (bgColor && bgColor !== 'transparent') {
      const bgRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
      bgRect.setAttribute('width', '100%');
      bgRect.setAttribute('height', '100%');
      bgRect.setAttribute('fill', bgColor);
      clonedSvg.insertBefore(bgRect, clonedSvg.firstChild);
    }

    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(clonedSvg);

    // Add XML declaration
    if (!source.match(/^<\?xml/)) {
      source = '<?xml version="1.0" standalone="no"?>\r\n' + source;
    }

    const blob = new Blob([source], { type: 'image/svg+xml;charset=utf-8' });
    const downloadUrl = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename.endsWith('.svg') ? filename : `${filename}.svg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(downloadUrl), 1000);

    return true;
  } catch (err) {
    console.error('Download SVG failed:', err);
    throw err;
  }
}

/**
 * Copies the QR code canvas directly into the system clipboard as PNG
 */
export async function copyQRImageToClipboard(canvasRef, bgColor = '#ffffff') {
  try {
    const canvas = canvasRef?.current?.querySelector('canvas') || canvasRef?.current;
    if (!canvas) throw new Error('Canvas not found');

    if (!navigator.clipboard || !window.ClipboardItem) {
      throw new Error('Clipboard image copy is not supported in this browser environment');
    }

    // Render with white background so pasting into Slack / Discord / Docs doesn't show transparent black
    const exportCanvas = document.createElement('canvas');
    const pad = 24;
    exportCanvas.width = canvas.width + pad * 2;
    exportCanvas.height = canvas.height + pad * 2;
    const ctx = exportCanvas.getContext('2d');

    if (bgColor && bgColor !== 'transparent') {
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    } else {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, exportCanvas.width, exportCanvas.height);
    }

    ctx.drawImage(canvas, pad, pad);

    const blob = await new Promise((resolve) =>
      exportCanvas.toBlob(resolve, 'image/png', 1.0)
    );

    if (!blob) throw new Error('Failed to create PNG blob');

    await navigator.clipboard.write([
      new window.ClipboardItem({
        'image/png': blob,
      }),
    ]);

    return true;
  } catch (err) {
    console.error('Clipboard copy failed:', err);
    throw err;
  }
}

/**
 * Copies plain text to clipboard
 */
export async function copyTextToClipboard(text) {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    // Fallback for older environments
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    return true;
  } catch (err) {
    console.error('Copy text failed:', err);
    throw err;
  }
}
