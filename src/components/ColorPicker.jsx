import React from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

const COMMON_SWATCHES = [
  '#000000',
  '#FFFFFF',
  '#4F46E5', // Indigo
  '#6366F1', // Indigo light
  '#059669', // Emerald
  '#0284C7', // Sky
  '#7C3AED', // Violet
  '#DB2777', // Pink
  '#EA580C', // Orange
  '#18181B', // Zinc dark
];

export default function ColorPicker({
  label,
  value,
  onChange,
  allowTransparent = false,
  helperText,
}) {
  const { t } = useTranslation();
  const isTransparent = value === 'transparent';

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {label}
        </label>
        {isTransparent ? (
          <span className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
            {t('customization.transparent')}
          </span>
        ) : (
          <span className="text-xs font-mono font-medium text-zinc-600 dark:text-zinc-300">
            {value ? value.toUpperCase() : ''}
          </span>
        )}
      </div>

      <div className="flex items-center gap-2">
        {/* Swatch & native input button */}
        <div className="relative shrink-0">
          <label
            htmlFor={`color-input-${label}`}
            className="w-10 h-10 rounded-xl border border-zinc-200 dark:border-zinc-700 cursor-pointer flex items-center justify-center shadow-xs overflow-hidden relative"
            style={{
              backgroundColor: isTransparent ? 'transparent' : value,
            }}
          >
            {isTransparent && (
              <div className="absolute inset-0 checkerboard" />
            )}
            <input
              id={`color-input-${label}`}
              type="color"
              value={isTransparent ? '#ffffff' : value}
              onChange={(e) => onChange(e.target.value)}
              className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
            />
          </label>
        </div>

        {/* Text hex input */}
        <div className="flex-1 relative">
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-zinc-400">
            <span className="text-xs font-mono">#</span>
          </div>
          <input
            type="text"
            disabled={isTransparent}
            value={isTransparent ? t('customization.transparent').toUpperCase() : value.replace('#', '')}
            onChange={(e) => {
              const val = e.target.value.replace(/[^0-9A-Fa-f]/g, '');
              if (val.length <= 6) {
                onChange(`#${val}`);
              }
            }}
            placeholder="000000"
            className="w-full pl-7 pr-3 rtl:pl-3 rtl:pr-7 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-mono uppercase focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 disabled:opacity-50 transition-all text-left rtl:text-right"
          />
        </div>

        {/* Transparent toggle if enabled */}
        {allowTransparent && (
          <button
            type="button"
            onClick={() => onChange(isTransparent ? '#FFFFFF' : 'transparent')}
            className={`text-xs px-2.5 py-2 rounded-xl border font-medium transition-all shrink-0 ${
              isTransparent
                ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-300 dark:border-indigo-700 text-indigo-600 dark:text-indigo-400'
                : 'bg-white dark:bg-zinc-900 border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800'
            }`}
          >
            {t('customization.clearTransp')}
          </button>
        )}
      </div>

      {/* Swatch chips */}
      <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
        {COMMON_SWATCHES.map((hex) => {
          const isSelected = !isTransparent && value.toLowerCase() === hex.toLowerCase();
          return (
            <button
              key={hex}
              type="button"
              onClick={() => onChange(hex)}
              className={`w-6 h-6 rounded-md border transition-all flex items-center justify-center relative ${
                isSelected
                  ? 'ring-2 ring-indigo-500 ring-offset-2 dark:ring-offset-zinc-950 scale-105'
                  : 'hover:scale-105 border-zinc-300 dark:border-zinc-700'
              }`}
              style={{ backgroundColor: hex }}
              title={hex}
            >
              {isSelected && (
                <Check
                  className={`w-3.5 h-3.5 ${
                    hex === '#FFFFFF' ? 'text-zinc-900' : 'text-white'
                  }`}
                />
              )}
            </button>
          );
        })}
      </div>

      {helperText && (
        <p className="text-[11px] text-zinc-400 dark:text-zinc-500">{helperText}</p>
      )}
    </div>
  );
}
