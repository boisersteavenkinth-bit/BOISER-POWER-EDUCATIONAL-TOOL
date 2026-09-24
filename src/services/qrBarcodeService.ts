import QRCode from 'qrcode';
import JsBarcode from 'jsbarcode';

// 1. Generate QR Code Data URL (PNG/SVG)
export const generateQRCodeDataUrl = async (text: string, options?: { width?: number; margin?: number; color?: { dark: string; light: string } }): Promise<string> => {
  try {
    const opts = {
      width: options?.width || 256,
      margin: options?.margin || 2,
      color: {
        dark: options?.color?.dark || '#092B62',
        light: options?.color?.light || '#FFFFFF'
      }
    };
    return await QRCode.toDataURL(text, opts);
  } catch (err) {
    console.error('QR code generation failed:', err);
    throw new Error('Failed to generate QR Code');
  }
};

// 2. Generate Barcode on an SVG / Canvas
export const generateBarcodeSVG = (text: string, format: 'CODE128' | 'CODE39' | 'EAN13' = 'CODE128'): string => {
  try {
    const svgNode = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    JsBarcode(svgNode, text, {
      format: format,
      lineColor: '#092B62',
      width: 2,
      height: 60,
      displayValue: true,
      fontSize: 14,
      font: 'monospace',
      background: '#ffffff'
    });
    const serializer = new XMLSerializer();
    return serializer.serializeToString(svgNode);
  } catch (err: any) {
    console.error('Barcode generation error:', err);
    throw new Error(`Invalid format or content for barcode: ${err.message || 'Error'}`);
  }
};

// 3. Generate Barcode as Data URL via offscreen canvas
export const generateBarcodeDataUrl = (text: string, format: 'CODE128' | 'CODE39' | 'EAN13' = 'CODE128'): string => {
  try {
    const canvas = document.createElement('canvas');
    JsBarcode(canvas, text, {
      format: format,
      lineColor: '#092B62',
      width: 2,
      height: 70,
      displayValue: true,
      fontSize: 14,
      font: 'monospace',
      background: '#ffffff'
    });
    return canvas.toDataURL('image/png');
  } catch (err: any) {
    console.error('Barcode canvas rendering failed:', err);
    throw new Error(`Barcode generation error: ${err.message || 'Invalid barcode input'}`);
  }
};

// 4. Barcode Validation
export const validateBarcodeValue = (value: string, format: 'CODE128' | 'CODE39' | 'EAN13'): { valid: boolean; message?: string } => {
  if (!value || value.trim().length === 0) {
    return { valid: false, message: 'Barcode value cannot be empty' };
  }
  if (format === 'EAN13') {
    if (!/^\d{12,13}$/.test(value.trim())) {
      return { valid: false, message: 'EAN-13 requires exactly 12 or 13 numeric digits' };
    }
  }
  if (format === 'CODE39') {
    if (!/^[0-9A-Z\-\.\ \$\/\+\%]+$/.test(value.trim().toUpperCase())) {
      return { valid: false, message: 'Code 39 only accepts uppercase letters, digits, and - . $ / + %' };
    }
  }
  return { valid: true };
};
