import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  RotateCcw,
  Image as ImageIcon,
  Sliders,
  Upload,
  Trash2,
} from 'lucide-react';
import ColorPicker from './ColorPicker';
import { COLOR_PRESETS, ERROR_LEVELS, PRESET_LOGOS } from '../types/qrTypes';

export default function QRCustomization({
  config,
  onChange,
  onReset,
}) {
  const { t } = useTranslation();
  const fileInputRef = useRef(null);

  const handleApplyPreset = (preset) => {
    onChange({
      ...config,
      fgColor: preset.fg,
      bgColor: preset.bg,
    });
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, SVG, WebP)');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      onChange({
        ...config,
        logoSrc: event.target.result,
        logoId: 'custom',
        // Automatically ensure error correction is at least 'Q' for logos
        errorLevel: config.errorLevel === 'L' || config.errorLevel === 'M' ? 'Q' : config.errorLevel,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveLogo = () => {
    onChange({
      ...config,
      logoSrc: null,
      logoId: 'none',
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSelectPresetLogo = (preset) => {
    if (preset.id === 'none') {
      handleRemoveLogo();
    } else {
      onChange({
        ...config,
        logoSrc: preset.src,
        logoId: preset.id,
        errorLevel: config.errorLevel === 'L' || config.errorLevel === 'M' ? 'Q' : config.errorLevel,
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header with Reset */}
      <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-zinc-800">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-indigo-500" /> {t('customization.title')}
          </h3>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            {t('customization.subtitle')}
          </p>
        </div>
        <button
          type="button"
          onClick={onReset}
          className="inline-flex items-center gap-1 text-xs px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 transition-colors"
          title={t('customization.reset')}
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>{t('customization.reset')}</span>
        </button>
      </div>

      {/* Style Presets */}
      <div>
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 block mb-2">
          {t('customization.colorPresets')}
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {COLOR_PRESETS.map((preset) => {
            const isCurrent =
              config.fgColor.toLowerCase() === preset.fg.toLowerCase() &&
              config.bgColor.toLowerCase() === preset.bg.toLowerCase();

            const presetName = t(`customization.presets.${preset.id}`);

            return (
              <button
                key={preset.id}
                type="button"
                onClick={() => handleApplyPreset(preset)}
                className={`p-2 rounded-xl border text-left rtl:text-right flex items-center gap-2 transition-all ${
                  isCurrent
                    ? 'border-indigo-500 ring-2 ring-indigo-500/20 bg-indigo-50/30 dark:bg-indigo-950/20'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900'
                }`}
              >
                <div className="flex -space-x-1.5 rtl:space-x-reverse shrink-0">
                  <div
                    className="w-4 h-4 rounded-full border border-black/10 dark:border-white/10"
                    style={{ backgroundColor: preset.fg }}
                  />
                  <div
                    className="w-4 h-4 rounded-full border border-black/10 dark:border-white/10 shadow-xs"
                    style={{ backgroundColor: preset.bg }}
                  />
                </div>
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300 truncate">
                  {presetName}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Color Pickers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ColorPicker
          label={t('customization.fgColor')}
          value={config.fgColor}
          onChange={(val) => onChange({ ...config, fgColor: val })}
          helperText={t('customization.fgHelper')}
        />
        <ColorPicker
          label={t('customization.bgColor')}
          value={config.bgColor}
          onChange={(val) => onChange({ ...config, bgColor: val })}
          allowTransparent={true}
          helperText={t('customization.bgHelper')}
        />
      </div>

      {/* Logo / Center Image */}
      <div className="space-y-3 pt-2 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 flex items-center gap-1.5">
            <ImageIcon className="w-4 h-4 text-indigo-500" /> {t('customization.centerLogo')}
          </label>
          {config.logoSrc && (
            <button
              type="button"
              onClick={handleRemoveLogo}
              className="text-xs text-rose-500 hover:text-rose-600 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> {t('customization.removeLogo')}
            </button>
          )}
        </div>

        {/* Preset logo buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {PRESET_LOGOS.map((logo) => {
            const isSelected = config.logoId === logo.id;
            const logoName = t(`customization.logos.${logo.id}`);

            return (
              <button
                key={logo.id}
                type="button"
                onClick={() => handleSelectPresetLogo(logo)}
                className={`px-3 py-1.5 rounded-xl border text-xs font-medium flex items-center gap-2 transition-all ${
                  isSelected
                    ? 'border-indigo-500 bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 ring-1 ring-indigo-500'
                    : 'border-zinc-200 dark:border-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-850 text-zinc-700 dark:text-zinc-300'
                }`}
              >
                {logo.src ? (
                  <img src={logo.src} alt={logoName} className="w-4 h-4 object-contain" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-zinc-300 dark:bg-zinc-600" />
                )}
                {logoName}
              </button>
            );
          })}

          {/* Upload Custom Logo Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-3 py-1.5 rounded-xl border border-dashed border-zinc-300 dark:border-zinc-700 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50/30 dark:hover:bg-indigo-950/30 text-xs font-medium text-zinc-600 dark:text-zinc-300 flex items-center gap-1.5 transition-all"
          >
            <Upload className="w-3.5 h-3.5" />
            {t('customization.uploadCustom')}
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>

        {/* Logo controls if logo is active */}
        {config.logoSrc && (
          <div className="p-3 bg-zinc-100/70 dark:bg-zinc-850/60 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                {t('customization.logoRatio', { val: Math.round((config.logoSize || 0.22) * 100) })}
              </span>
              <span className="text-[11px] text-zinc-400">{t('customization.recommendedRatio')}</span>
            </div>
            <input
              type="range"
              min="0.15"
              max="0.30"
              step="0.01"
              value={config.logoSize || 0.22}
              onChange={(e) =>
                onChange({ ...config, logoSize: parseFloat(e.target.value) })
              }
              className="w-full accent-indigo-600 cursor-pointer"
            />
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="excavate-logo"
                checked={config.excavateLogo !== false}
                onChange={(e) =>
                  onChange({ ...config, excavateLogo: e.target.checked })
                }
                className="w-4 h-4 rounded text-indigo-600 border-zinc-300 dark:border-zinc-700"
              />
              <label htmlFor="excavate-logo" className="text-xs text-zinc-600 dark:text-zinc-400 cursor-pointer">
                {t('customization.excavate')}
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Error Correction Level */}
      <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {t('customization.errorResilience')}
          </label>
          <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
            {t(`customization.errorLevels.${config.errorLevel}.name`)}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {ERROR_LEVELS.map((lvl) => {
            const isSelected = config.errorLevel === lvl.level;
            const lvlName = t(`customization.errorLevels.${lvl.level}.name`);
            const lvlDesc = t(`customization.errorLevels.${lvl.level}.desc`);

            return (
              <button
                key={lvl.level}
                type="button"
                onClick={() => onChange({ ...config, errorLevel: lvl.level })}
                className={`p-2.5 rounded-xl border text-left rtl:text-right transition-all ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/70 dark:bg-indigo-950/40 ring-1 ring-indigo-500 text-indigo-900 dark:text-indigo-200'
                    : 'border-zinc-200 dark:border-zinc-800 hover:border-zinc-300 dark:hover:border-zinc-700 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold font-mono">{lvl.level}</span>
                  <span className="text-[10px] opacity-75">{lvlName.match(/\((.*?)\)/)?.[1]}</span>
                </div>
                <p className="text-[10px] leading-tight opacity-80">{lvlDesc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Size and Margins */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-200 dark:border-zinc-800">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {t('customization.displaySize', { val: config.size })}
            </label>
          </div>
          <input
            type="range"
            min="180"
            max="450"
            step="10"
            value={config.size}
            onChange={(e) => onChange({ ...config, size: parseInt(e.target.value, 10) })}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
            <span>{t('customization.compact')}</span>
            <span>{t('customization.standard')}</span>
            <span>{t('customization.large')}</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              {t('customization.quietZone', { val: config.margin })}
            </label>
          </div>
          <input
            type="range"
            min="0"
            max="4"
            step="1"
            value={config.margin}
            onChange={(e) => onChange({ ...config, margin: parseInt(e.target.value, 10) })}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-zinc-400 font-mono">
            <span>{t('customization.none')}</span>
            <span>{t('customization.recMargin')}</span>
            <span>{t('customization.stdMargin')}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
