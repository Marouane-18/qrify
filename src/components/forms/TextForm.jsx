import React from 'react';
import { useTranslation } from 'react-i18next';
import { X } from 'lucide-react';

export default function TextForm({ data, onChange, errors }) {
  const { t } = useTranslation();
  const textValue = data.text || '';
  const charCount = textValue.length;

  return (
    <div className="space-y-4">
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            {t('forms.text.label')} <span className="text-rose-500">*</span>
          </label>
          <span className={`text-xs font-mono ${charCount > 500 ? 'text-amber-500' : 'text-zinc-400'}`}>
            {charCount} / 2000 {t('forms.text.chars')}
          </span>
        </div>
        <div className="relative">
          <textarea
            rows={5}
            value={textValue}
            onChange={(e) => onChange({ ...data, text: e.target.value })}
            placeholder={t('forms.text.placeholder')}
            className={`w-full p-3.5 bg-white dark:bg-zinc-900 border rounded-xl text-sm placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none font-normal transition-all text-left rtl:text-right ${
              errors?.text
                ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                : 'border-zinc-200 dark:border-zinc-800'
            }`}
          />
          {textValue && (
            <button
              type="button"
              onClick={() => onChange({ ...data, text: '' })}
              className="absolute top-3 right-3 rtl:right-auto rtl:left-3 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 p-1"
              title={t('forms.text.clearTitle')}
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
        {errors?.text && (
          <p className="mt-1.5 text-xs text-rose-500 font-medium">
            {t(errors.text) !== errors.text ? t(errors.text) : errors.text}
          </p>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange({ ...data, text: 'WELCOME-2026-VIP-OFFER' })}
          className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors"
        >
          {t('forms.text.promoCoupon')}
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...data, text: 'Order #98214 - Table 12 - Ready for Pickup' })}
          className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors"
        >
          {t('forms.text.orderReceipt')}
        </button>
        <button
          type="button"
          onClick={() => onChange({ ...data, text: 'Weekly sync meeting - Monday 9:00 AM' })}
          className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors"
        >
          {t('forms.text.meetingMemo')}
        </button>
      </div>
    </div>
  );
}
