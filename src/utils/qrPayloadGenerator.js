/**
 * Escapes characters in WiFi strings per barcode scanner spec
 */
function escapeWifiString(str) {
  if (!str) return '';
  return str.replace(/([\\;,:"])/g, '\\$1');
}

/**
 * Generates the encoded QR code payload based on the selected type and form values
 */
export function generateQRPayload(type, formData = {}) {
  switch (type) {
    case 'url': {
      const url = (formData.url || '').trim();
      if (!url) return '';
      // If user typed example.com without protocol, default to https://
      if (!/^https?:\/\//i.test(url)) {
        return `https://${url}`;
      }
      return url;
    }

    case 'text': {
      return (formData.text || '').trim();
    }

    case 'email': {
      const email = (formData.email || '').trim();
      if (!email) return '';
      const params = [];
      if (formData.subject) {
        params.push(`subject=${encodeURIComponent(formData.subject.trim())}`);
      }
      if (formData.body) {
        params.push(`body=${encodeURIComponent(formData.body.trim())}`);
      }
      const query = params.length > 0 ? `?${params.join('&')}` : '';
      return `mailto:${email}${query}`;
    }

    case 'phone': {
      const phone = (formData.phone || '').trim();
      if (!phone) return '';
      // Strip spaces, dashes, parentheses but keep leading +
      const cleanPhone = phone.replace(/[^\d+]/g, '');
      return `tel:${cleanPhone}`;
    }

    case 'whatsapp': {
      const phone = (formData.phone || '').trim().replace(/[^\d]/g, '');
      const message = (formData.message || '').trim();
      if (!phone) return '';
      const query = message ? `?text=${encodeURIComponent(message)}` : '';
      return `https://wa.me/${phone}${query}`;
    }

    case 'wifi': {
      const ssid = escapeWifiString(formData.ssid || '');
      const password = escapeWifiString(formData.password || '');
      const encryption = formData.encryption || 'WPA';
      const isHidden = Boolean(formData.hidden);

      if (!ssid) return '';

      // Wi-Fi QR Code standard syntax:
      // WIFI:T:WPA;S:mynetwork;P:mypass;H:false;;
      if (encryption === 'nopass') {
        return `WIFI:T:nopass;S:${ssid};;H:${isHidden ? 'true' : 'false'};;`;
      }
      return `WIFI:T:${encryption};S:${ssid};P:${password};H:${isHidden ? 'true' : 'false'};;`;
    }

    case 'location': {
      const lat = (formData.latitude || '').toString().trim();
      const lng = (formData.longitude || '').toString().trim();
      if (!lat || !lng) return '';
      // Standard google maps link provides universal compatibility on iOS & Android
      return `https://www.google.com/maps?q=${lat},${lng}`;
    }

    case 'vcard': {
      const firstName = (formData.firstName || '').trim();
      const lastName = (formData.lastName || '').trim();
      const org = (formData.company || '').trim();
      const title = (formData.title || '').trim();
      const phone = (formData.phone || '').trim();
      const email = (formData.email || '').trim();
      const website = (formData.website || '').trim();

      if (!firstName && !lastName && !org && !phone) return '';

      const lines = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        `N:${lastName};${firstName};;;`,
        `FN:${[firstName, lastName].filter(Boolean).join(' ')}`,
      ];
      if (org) lines.push(`ORG:${org}`);
      if (title) lines.push(`TITLE:${title}`);
      if (phone) lines.push(`TEL;TYPE=CELL:${phone}`);
      if (email) lines.push(`EMAIL:${email}`);
      if (website) lines.push(`URL:${website}`);
      lines.push('END:VCARD');

      return lines.join('\n');
    }

    default:
      return '';
  }
}

/**
 * Returns a human-friendly summary title for the QR payload for history records
 */
export function getQRSummaryTitle(type, formData = {}, t) {
  const getFallback = (key, fallback) => (t ? t(key) : fallback);

  switch (type) {
    case 'url':
      return formData.url ? formData.url.replace(/^https?:\/\//i, '') : getFallback('types.url.label', 'Website URL');
    case 'text':
      return formData.text
        ? (formData.text.length > 30 ? formData.text.substring(0, 30) + '...' : formData.text)
        : getFallback('types.text.label', 'Plain Text');
    case 'email':
      return formData.email ? `${getFallback('types.email.shortLabel', 'Email')}: ${formData.email}` : getFallback('types.email.label', 'Email Message');
    case 'phone':
      return formData.phone ? `${getFallback('types.phone.shortLabel', 'Phone')}: ${formData.phone}` : getFallback('types.phone.label', 'Phone Call');
    case 'whatsapp':
      return formData.phone ? `WhatsApp: ${formData.phone}` : getFallback('types.whatsapp.label', 'WhatsApp Chat');
    case 'wifi':
      return formData.ssid ? `${getFallback('types.wifi.shortLabel', 'Wi-Fi')}: ${formData.ssid}` : getFallback('types.wifi.label', 'Wi-Fi Network');
    case 'location':
      return formData.latitude && formData.longitude
        ? `${getFallback('types.location.shortLabel', 'Location')}: ${formData.latitude}, ${formData.longitude}`
        : getFallback('types.location.label', 'Map Location');
    case 'vcard':
      return [formData.firstName, formData.lastName].filter(Boolean).join(' ') || formData.company || getFallback('types.vcard.label', 'Contact Card');
    default:
      return 'QR Code';
  }
}
