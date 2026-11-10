/**
 * Validates inputs for different QR types.
 * Returns an object with `isValid: boolean` and `errors: Record<string, string>`.
 * Returns translation keys for multilingual support.
 */
export function validateQRInput(type, formData = {}) {
  const errors = {};

  switch (type) {
    case 'url': {
      const url = (formData.url || '').trim();
      if (!url) {
        errors.url = 'validation.urlRequired';
      } else {
        const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/i;
        const localhostPattern = /^(https?:\/\/)?localhost(:\d+)?(\/.*)?$/i;
        if (!urlPattern.test(url) && !localhostPattern.test(url)) {
          errors.url = 'validation.urlInvalid';
        }
      }
      break;
    }

    case 'text': {
      const text = (formData.text || '').trim();
      if (!text) {
        errors.text = 'validation.textRequired';
      } else if (text.length > 2000) {
        errors.text = 'validation.textTooLong';
      }
      break;
    }

    case 'email': {
      const email = (formData.email || '').trim();
      if (!email) {
        errors.email = 'validation.emailRequired';
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          errors.email = 'validation.emailInvalid';
        }
      }
      break;
    }

    case 'phone': {
      const phone = (formData.phone || '').trim();
      if (!phone) {
        errors.phone = 'validation.phoneRequired';
      } else {
        const clean = phone.replace(/[^\d+]/g, '');
        if (clean.length < 5) {
          errors.phone = 'validation.phoneTooShort';
        }
      }
      break;
    }

    case 'whatsapp': {
      const phone = (formData.phone || '').trim();
      if (!phone) {
        errors.phone = 'validation.waRequired';
      } else {
        const clean = phone.replace(/[^\d]/g, '');
        if (clean.length < 7) {
          errors.phone = 'validation.waInvalid';
        }
      }
      break;
    }

    case 'wifi': {
      const ssid = (formData.ssid || '').trim();
      const encryption = formData.encryption || 'WPA';
      const password = formData.password || '';

      if (!ssid) {
        errors.ssid = 'validation.ssidRequired';
      }

      if (encryption !== 'nopass') {
        if (!password) {
          errors.password = 'validation.passRequired';
        } else if (encryption === 'WPA' && password.length < 8) {
          errors.password = 'validation.wpaLength';
        }
      }
      break;
    }

    case 'location': {
      const lat = parseFloat(formData.latitude);
      const lng = parseFloat(formData.longitude);

      if (formData.latitude === undefined || formData.latitude === '' || isNaN(lat)) {
        errors.latitude = 'validation.latRequired';
      } else if (lat < -90 || lat > 90) {
        errors.latitude = 'validation.latRequired';
      }

      if (formData.longitude === undefined || formData.longitude === '' || isNaN(lng)) {
        errors.longitude = 'validation.lngRequired';
      } else if (lng < -180 || lng > 180) {
        errors.longitude = 'validation.lngRequired';
      }
      break;
    }

    case 'vcard': {
      const fn = (formData.firstName || '').trim();
      const ln = (formData.lastName || '').trim();
      const org = (formData.company || '').trim();
      const phone = (formData.phone || '').trim();

      if (!fn && !ln && !org) {
        errors.firstName = 'validation.vcardNameRequired';
      }
      if (!phone && !formData.email) {
        errors.phone = 'validation.vcardContactRequired';
      }
      break;
    }

    default:
      break;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Evaluates scannability score based on contrast, density, and logo size
 */
export function checkScannability(payload, fgColor, bgColor, errorLevel, hasLogo) {
  if (!payload) return { score: 'empty', label: 'No Data', color: 'zinc' };

  // Calculate approximate color luminance contrast
  function getLuminance(hex) {
    if (!hex || hex === 'transparent') return 1;
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const r = parseInt(c.substring(0, 2), 16) / 255;
    const g = parseInt(c.substring(2, 4), 16) / 255;
    const b = parseInt(c.substring(4, 6), 16) / 255;
    const a = [r, g, b].map(v => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  }

  const l1 = getLuminance(fgColor);
  const l2 = getLuminance(bgColor);
  const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);

  if (ratio < 2.5 && bgColor !== 'transparent') {
    return {
      score: 'poor',
      label: 'Low Contrast Warning',
      description: 'Colors may not scan reliably on older smartphone cameras. Increase contrast.',
      color: 'rose',
    };
  }

  if (hasLogo && (errorLevel === 'L' || errorLevel === 'M')) {
    return {
      score: 'warning',
      label: 'Recommend Higher Error Correction',
      description: 'A center logo covers QR modules. Set error correction to Q (25%) or H (30%).',
      color: 'amber',
    };
  }

  if (payload.length > 350) {
    return {
      score: 'dense',
      label: 'Dense QR Code',
      description: 'Lots of encoded text. Ensure you print or display at a larger size.',
      color: 'indigo',
    };
  }

  return {
    score: 'optimal',
    label: 'Optimal Scannability',
    description: 'High contrast, clean matrix density. Scans instantly.',
    color: 'emerald',
  };
}
