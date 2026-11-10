import React from 'react';
import { useTranslation } from 'react-i18next';
import { MessageSquare } from 'lucide-react';

export default function WhatsAppForm({ data, onChange, errors }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
          {t('forms.whatsapp.label')} <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-emerald-500">
            <MessageSquare className="w-4 h-4" />
          </div>
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder={t('forms.whatsapp.placeholder')}
            dir="ltr"
            className={`w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 bg-white dark:bg-zinc-900 border rounded-xl text-sm font-medium placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-left rtl:text-left ${
              errors?.phone
                ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                : 'border-zinc-200 dark:border-zinc-800'
            }`}
          />
        </div>
        {errors?.phone ? (
          <p className="mt-1.5 text-xs text-rose-500 font-medium">
            {t(errors.phone) !== errors.phone ? t(errors.phone) : errors.phone}
          </p>
        ) : (
          <p className="mt-1 text-xs text-zinc-400">
            {t('forms.whatsapp.formatNotice')}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
          {t('forms.whatsapp.message')}
        </label>
        <textarea
          rows={3}
          value={data.message || ''}
          onChange={(e) => onChange({ ...data, message: e.target.value })}
          placeholder={t('forms.whatsapp.messagePlaceholder')}
          className="w-full p-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 resize-none transition-all text-left rtl:text-right"
        />
        <p className="mt-1 text-xs text-zinc-400">
          {t('forms.whatsapp.messageNotice')}
        </p>
      </div>
    </div>
  );
}
