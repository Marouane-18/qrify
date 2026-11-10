import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QRCodeCanvas, QRCodeSVG } from 'qrcode.react';
import confetti from 'canvas-confetti';
import {
  Download,
  Copy,
  Check,
  Share2,
  FileCode,
  BookmarkPlus,
  ShieldCheck,
  AlertTriangle,
  Sparkles,
} from 'lucide-react';
import {
  downloadAsPNG,
  downloadAsSVG,
  copyQRImageToClipboard,
  copyTextToClipboard,
} from '../utils/qrExport';
import { checkScannability } from '../utils/validation';
import { useToast } from '../context/ToastContext';

export default function QRPreview({
  payload,
  config,
  type,
  title,
  onSaveHistory,
  _isValid,
}) {
  const { t } = useTranslation();
  const toast = useToast();
  const canvasRef = useRef(null);
  const svgRef = useRef(null);

  const [copiedImage, setCopiedImage] = useState(false);
  const [copiedText, setCopiedText] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [exportResolution, setExportResolution] = useState(2); // 1x, 2x, 4x

  const isTransparent = config.bgColor === 'transparent';
  const scannability = checkScannability(
    payload,
    config.fgColor,
    config.bgColor,
    config.errorLevel,
    Boolean(config.logoSrc)
  );

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#6366F1', '#4F46E5', '#10B981', '#F59E0B'],
      });
    } catch {
      // Ignore if confetti not supported
    }
  };

  const handleDownloadPNG = async () => {
    if (!payload) {
      toast.error(t('toasts.enterDetailsError'));
      return;
    }
    try {
      setIsDownloading(true);
      await downloadAsPNG({
        canvasRef,
        filename: `qrify-${type}-${Date.now().toString(36)}.png`,
        bgColor: config.bgColor,
        multiplier: exportResolution,
        padding: 32,
      });
      triggerConfetti();
      toast.success(t('toasts.pngSuccess'));
      onSaveHistory?.();
    } catch (err) {
      toast.error(err.message || 'Failed to download PNG');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleDownloadSVG = () => {
    if (!payload) {
      toast.error(t('toasts.enterDetailsError'));
      return;
    }
    try {
      downloadAsSVG({
        svgRef,
        filename: `qrify-${type}-${Date.now().toString(36)}.svg`,
        bgColor: config.bgColor,
      });
      triggerConfetti();
      toast.success(t('toasts.svgSuccess'));
      onSaveHistory?.();
    } catch (err) {
      toast.error(err.message || 'Failed to download SVG');
    }
  };

  const handleCopyImage = async () => {
    if (!payload) {
      toast.error(t('toasts.noContentError'));
      return;
    }
    try {
      await copyQRImageToClipboard(canvasRef, config.bgColor);
      setCopiedImage(true);
      toast.success(t('toasts.copyImageSuccess'));
      setTimeout(() => setCopiedImage(false), 2500);
      onSaveHistory?.();
    } catch {
      toast.error(t('toasts.copyImageError'));
    }
  };

  const handleCopyText = async () => {
    if (!payload) {
      toast.error(t('toasts.noContentError'));
      return;
    }
    try {
      await copyTextToClipboard(payload);
      setCopiedText(true);
      toast.success(t('toasts.copyTextSuccess'));
      setTimeout(() => setCopiedText(false), 2000);
    } catch {
      toast.error(t('toasts.copyTextError'));
    }
  };

  const handleManualSave = () => {
    if (!payload) {
      toast.error(t('toasts.enterDetailsError'));
      return;
    }
    onSaveHistory?.();
    toast.success(t('toasts.saveSuccess'));
  };

  // Compute center image settings for qrcode.react
  const imageSettings = config.logoSrc
    ? {
        src: config.logoSrc,
        height: Math.round(config.size * (config.logoSize || 0.22)),
        width: Math.round(config.size * (config.logoSize || 0.22)),
        excavate: config.excavateLogo !== false,
      }
    : undefined;

  const scannabilityLabel =
    scannability.score === 'optimal'
      ? t('preview.scannability.optimal')
      : scannability.score === 'poor'
      ? t('preview.scannability.lowContrast')
      : scannability.score === 'warning'
      ? t('preview.scannability.recommendHigher')
      : scannability.score === 'dense'
      ? t('preview.scannability.dense')
      : scannability.label;

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Card Header with Status & Scannability */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-indigo-500" /> {t('preview.title')}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {t('preview.subtitle')}
          </p>
        </div>

        {/* Scannability Badge */}
        {payload && (
          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${
              scannability.color === 'emerald'
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/50 dark:text-emerald-400 dark:border-emerald-800'
                : scannability.color === 'rose'
                ? 'bg-rose-50 text-rose-700 border-rose-200 dark:bg-rose-950/50 dark:text-rose-400 dark:border-rose-800'
                : scannability.color === 'amber'
                ? 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/50 dark:text-amber-400 dark:border-amber-800'
                : 'bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:border-zinc-700'
            }`}
          >
            {scannability.color === 'emerald' ? (
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
            ) : (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            )}
            <span>{scannabilityLabel}</span>
          </div>
        )}
      </div>

      {/* Main Preview Stage */}
      <div className="relative flex-1 min-h-[320px] rounded-2xl bg-zinc-100/70 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 p-6 flex flex-col items-center justify-center overflow-hidden bg-grid-pattern">
        {payload ? (
          <div className="relative group">
            {/* The QR Card container */}
            <div
              className={`p-4 rounded-2xl transition-all duration-300 shadow-xl border ${
                isTransparent ? 'checkerboard border-zinc-300 dark:border-zinc-700' : 'border-black/5 dark:border-white/10'
              }`}
              style={{
                backgroundColor: isTransparent ? 'transparent' : config.bgColor,
              }}
            >
              <div ref={canvasRef} className="flex items-center justify-center">
                <QRCodeCanvas
                  value={payload}
                  size={config.size}
                  level={config.errorLevel}
                  fgColor={config.fgColor}
                  bgColor={isTransparent ? 'transparent' : config.bgColor}
                  marginSize={config.margin}
                  imageSettings={imageSettings}
                />
              </div>

              {/* Hidden SVG element used for clean SVG export */}
              <div ref={svgRef} className="hidden">
                <QRCodeSVG
                  value={payload}
                  size={config.size}
                  level={config.errorLevel}
                  fgColor={config.fgColor}
                  bgColor={isTransparent ? 'transparent' : config.bgColor}
                  marginSize={config.margin}
                  imageSettings={imageSettings}
                />
              </div>
            </div>

            {/* Content summary tooltip pill */}
            <div className="mt-3 text-center">
              <span className="inline-block text-[11px] font-mono text-zinc-500 dark:text-zinc-400 max-w-[260px] truncate px-2.5 py-1 rounded-md bg-white/80 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700 shadow-2xs backdrop-blur-xs" dir="ltr">
                {title || payload}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center p-8 max-w-xs space-y-3">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-zinc-200/60 dark:bg-zinc-800/60 flex items-center justify-center text-zinc-400">
              <Sparkles className="w-8 h-8 opacity-40 animate-pulse" />
            </div>
            <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
              {t('preview.emptyTitle')}
            </h4>
            <p className="text-xs text-zinc-400 dark:text-zinc-500 leading-relaxed">
              {t('preview.emptyDesc')}
            </p>
          </div>
        )}
      </div>

      {/* Export Options & Actions */}
      <div className="space-y-3 pt-2">
        {/* Export Resolution Picker */}
        <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400 px-1">
          <span className="font-medium">{t('preview.exportQuality')}</span>
          <div className="flex items-center gap-1">
            {[
              { val: 1, label: '1x' },
              { val: 2, label: '2x' },
              { val: 4, label: '4x' },
            ].map((res) => (
              <button
                key={res.val}
                type="button"
                onClick={() => setExportResolution(res.val)}
                className={`px-2 py-0.5 rounded-md font-mono text-[11px] transition-colors ${
                  exportResolution === res.val
                    ? 'bg-indigo-600 text-white font-semibold'
                    : 'bg-zinc-200/80 dark:bg-zinc-800 hover:bg-zinc-300 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                {res.label}
              </button>
            ))}
          </div>
        </div>

        {/* Primary Download Buttons */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleDownloadPNG}
            disabled={!payload || isDownloading}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] shadow-sm shadow-indigo-500/20 disabled:opacity-50 disabled:pointer-events-none transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{t('preview.downloadPNG')}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadSVG}
            disabled={!payload}
            className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-xs text-zinc-800 dark:text-zinc-100 bg-white dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-750 border border-zinc-200 dark:border-zinc-700 active:scale-[0.98] shadow-2xs disabled:opacity-50 disabled:pointer-events-none transition-all"
          >
            <FileCode className="w-4 h-4 text-indigo-500" />
            <span>{t('preview.downloadSVG')}</span>
          </button>
        </div>

        {/* Secondary Quick Actions */}
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={handleCopyImage}
            disabled={!payload}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-850 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 disabled:opacity-50 disabled:pointer-events-none transition-all"
            title={t('preview.copyImage')}
          >
            {copiedImage ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="truncate">{copiedImage ? t('preview.copiedImage') : t('preview.copyImage')}</span>
          </button>

          <button
            type="button"
            onClick={handleCopyText}
            disabled={!payload}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-850 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 disabled:opacity-50 disabled:pointer-events-none transition-all"
            title={t('preview.copyText')}
          >
            {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Share2 className="w-3.5 h-3.5" />}
            <span className="truncate">{copiedText ? t('preview.copiedText') : t('preview.copyText')}</span>
          </button>

          <button
            type="button"
            onClick={handleManualSave}
            disabled={!payload}
            className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-850 hover:bg-zinc-200 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-800 disabled:opacity-50 disabled:pointer-events-none transition-all"
            title={t('preview.save')}
          >
            <BookmarkPlus className="w-3.5 h-3.5 text-indigo-500" />
            <span className="truncate">{t('preview.save')}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
