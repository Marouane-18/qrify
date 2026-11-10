import React from 'react';
import { useTranslation } from 'react-i18next';
import { Phone, PhoneCall } from 'lucide-react';

export default function PhoneForm({ data, onChange, errors }) {
  const { t } = useTranslation();

  const quickCountryCodes = [
    { code: '+1', country: 'US/CA' },
    { code: '+33', country: 'FR' },
    { code: '+44', country: 'UK' },
    { code: '+49', country: 'DE' },
    { code: '+966', country: 'KSA' },
    { code: '+212', country: 'MA' },
    { code: '+971', country: 'UAE' },
  ];

  const handleCountryPrefix = (prefix) => {
    const current = (data.phone || '').replace(/^\+\d+\s*/, '');
    onChange({ ...data, phone: `${prefix} ${current}`.trim() });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
          {t('forms.phone.label')} <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-zinc-400">
            <Phone className="w-4 h-4" />
          </div>
          <input
            type="tel"
            value={data.phone || ''}
            onChange={(e) => onChange({ ...data, phone: e.target.value })}
            placeholder={t('forms.phone.placeholder')}
            dir="ltr"
            className={`w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 bg-white dark:bg-zinc-900 border rounded-xl text-sm font-medium placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-left rtl:text-left ${
              errors?.phone
                ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                : 'border-zinc-200 dark:border-zinc-800'
            }`}
          />
        </div>
        {errors?.phone && (
          <p className="mt-1.5 text-xs text-rose-500 font-medium">
            {t(errors.phone) !== errors.phone ? t(errors.phone) : errors.phone}
          </p>
        )}
      </div>

      <div>
        <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-2">
          {t('forms.phone.prefixes')}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {quickCountryCodes.map((item) => (
            <button
              key={item.code}
              type="button"
              onClick={() => handleCountryPrefix(item.code)}
              className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium transition-colors"
              dir="ltr"
            >
              {item.code} <span className="text-zinc-400">({item.country})</span>
            </button>
          ))}
        </div>
      </div>

      <div className="p-3 bg-zinc-100/70 dark:bg-zinc-800/50 rounded-xl text-xs text-zinc-600 dark:text-zinc-400 flex items-start gap-2">
        <PhoneCall className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
        <p>{t('forms.phone.callNotice')}</p>
      </div>
    </div>
  );
}
