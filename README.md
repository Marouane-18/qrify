# QRify — Modern SaaS QR Code Studio

**QRify** is a production-quality, client-side QR code generator and styling suite built with React 19, Vite, Tailwind CSS v4, Lucide icons, and full multilingual internationalization (`react-i18next`). It features a modern, clean interface inspired by tools like Linear, Vercel, and Stripe.

---

## 🌐 Multilingual & RTL Support

QRify supports instant language switching across the entire application with 100% translation coverage and persistence:

- **English (EN)** — Default language (LTR).
- **Français (FR)** — French translation (LTR).
- **العربية (AR)** — Full Right-to-Left (RTL) mode with Arabic typography (Cairo font), mirrored layouts, adapted form controls, and natural visual hierarchy.

### Features
* **Navbar Language Dropdown**: Displaying the active language, native name, and flag indicator.
* **Instant Switching**: Updates every label, placeholder, tooltip, modal, error message, and toast message immediately without reloading the page.
* **LocalStorage Persistence**: Remembers the selected language across sessions using the `qrify_language` key.
* **Dynamic Document Direction**: Automatically sets `<html dir="rtl" lang="ar">` for Arabic and `<html dir="ltr" lang="...">` for English and French.

---

## Core Features

### 1. Supported QR Types
- **Website / URL**: Automatic `https://` protocol handling, link validation, and in-tab preview.
- **Plain Text**: Multiline textarea with live character counting (up to 2,000 characters).
- **Email**: Pre-compose recipient address, subject line, and pre-filled email body.
- **Phone Call**: Direct international calling format with quick country dial code presets.
- **WhatsApp**: Direct chat initiation (`https://wa.me/`) with pre-filled message support.
- **Wi-Fi Network**: Seamless connection via camera for WPA/WPA2/WPA3, WEP, and Open networks, with hidden network support.
- **Location**: Latitude and longitude coordinates, HTML5 GPS current location detection, landmark presets, and Google Maps integration.
- **vCard (Bonus)**: Complete contact business cards that mobile cameras can save directly to device contacts.

### 2. Customization & Styling
- **Colors**: Foreground and background custom color pickers with hex inputs, swatch chips, and **transparent background** support.
- **Color Presets**: Classic Monochrome, Linear Dark, Midnight Electric, Stripe Indigo, Emerald Minimal, Sunset Rose, Cyberpunk Amber, and Ocean Cyan.
- **Center Logos / Icons**: Integrated preset icons (Web, Wi-Fi, Email, QRify mark) plus custom user image uploads with size slider and excavation mask.
- **Error Correction**: 4 levels of Reed-Solomon resilience (L - 7%, M - 15%, Q - 25%, H - 30%) with guidance indicators.
- **Size & Margins**: Configurable display size (180px - 450px) and quiet zone margin padding.
- **Live Scannability Analyzer**: Real-time evaluation of contrast ratio, module density, and error level sufficiency.

### 3. Export & Sharing
- **Download as PNG**: High-resolution canvas rendering with custom background, padding, and selectable scale (1x, 2x, 4x Ultra HD print quality).
- **Download as SVG**: Scalable vector graphics export for graphic designers and large format prints.
- **Copy Image to Clipboard**: Direct clipboard copy via `ClipboardItem` API with automatic white background fill for instant paste into Slack, Docs, or email.
- **Copy Text / Payload**: Copies raw decoded data or formatted link with one click.
- **Celebration Effects**: Confetti bursts upon export.

### 4. QR History & Archival
- **Persistent Local Storage**: Automatically saves generated codes and user custom designs.
- **Search & Filter**: Real-time search across titles, types, and raw payloads, plus category filtering.
- **Preview & Reuse**: Instant modal preview with quick re-download, or one-click load back into the generator workspace.
- **Management**: Delete individual items or clear all history with safety confirmation.

### 5. Design & UI/UX
- **Theme**: Seamless Light and Dark mode with localStorage persistence.
- **Typography**: Crisp SaaS fonts (Cairo for Arabic, Plus Jakarta Sans & JetBrains Mono for Latin).
- **Icons**: 100% Lucide React icons.
- **Security**: 100% client-side execution — credentials and QR payloads never leave the browser.

---

## Getting Started

### Prerequisites
- Node.js (v18 or newer)
- npm (or pnpm / yarn)

### Installation & Launch

```bash
# Navigate to the project directory
cd qrify

# Install dependencies (already completed)
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

---

## Tech Stack
- **Framework**: React 19 + Vite
- **Internationalization**: `i18next` + `react-i18next` + `i18next-browser-languagedetector`
- **Styling**: Tailwind CSS v4 + `@tailwindcss/vite`
- **QR Engine**: `qrcode.react` (Canvas + SVG)
- **Icons**: `lucide-react`
- **Effects**: `canvas-confetti`
