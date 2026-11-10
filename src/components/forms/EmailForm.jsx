import React from 'react';
import { useTranslation } from 'react-i18next';
import { Mail } from 'lucide-react';

export default function EmailForm({ data, onChange, errors }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
          {t('forms.email.recipient')} <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-zinc-400">
            <Mail className="w-4 h-4" />
          </div>
          <input
            type="email"
            value={data.email || ''}
            onChange={(e) => onChange({ ...data, email: e.target.value })}
            placeholder={t('forms.email.recipientPlaceholder')}
            dir="ltr"
            className={`w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 bg-white dark:bg-zinc-900 border rounded-xl text-sm font-medium placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-left rtl:text-left ${
              errors?.email
                ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                : 'border-zinc-200 dark:border-zinc-800'
            }`}
          />
        </div>
        {errors?.email && (
          <p className="mt-1.5 text-xs text-rose-500 font-medium">
            {t(errors.email) !== errors.email ? t(errors.email) : errors.email}
          </p>
        )}
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
          {t('forms.email.subject')}
        </label>
        <input
          type="text"
          value={data.subject || ''}
          onChange={(e) => onChange({ ...data, subject: e.target.value })}
          placeholder={t('forms.email.subjectPlaceholder')}
          className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-left rtl:text-right"
        />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
          {t('forms.email.body')}
        </label>
        <textarea
          rows={3}
          value={data.body || ''}
          onChange={(e) => onChange({ ...data, body: e.target.value })}
          placeholder={t('forms.email.bodyPlaceholder')}
          className="w-full p-3.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 resize-none transition-all text-left rtl:text-right"
        />
      </div>
    </div>
  );
}
