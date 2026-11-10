import React from 'react';
import { useTranslation } from 'react-i18next';
import { User, Building, Phone, Mail, Globe, Briefcase } from 'lucide-react';

export default function VCardForm({ data, onChange, errors }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
            {t('forms.vcard.firstName')} <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-zinc-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.firstName || ''}
              onChange={(e) => onChange({ ...data, firstName: e.target.value })}
              placeholder="Alex"
              className={`w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 bg-white dark:bg-zinc-900 border rounded-xl text-sm font-medium placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-left rtl:text-right ${
                errors?.firstName
                  ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                  : 'border-zinc-200 dark:border-zinc-800'
              }`}
            />
          </div>
          {errors?.firstName && (
            <p className="mt-1.5 text-xs text-rose-500 font-medium">
              {t(errors.firstName) !== errors.firstName ? t(errors.firstName) : errors.firstName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
            {t('forms.vcard.lastName')}
          </label>
          <input
            type="text"
            value={data.lastName || ''}
            onChange={(e) => onChange({ ...data, lastName: e.target.value })}
            placeholder="Morgan"
            className="w-full px-3.5 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-left rtl:text-right"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
            {t('forms.vcard.company')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-zinc-400">
              <Building className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.company || ''}
              onChange={(e) => onChange({ ...data, company: e.target.value })}
              placeholder="Acme Studios"
              className="w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-left rtl:text-right"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
            {t('forms.vcard.title')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-zinc-400">
              <Briefcase className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.title || ''}
              onChange={(e) => onChange({ ...data, title: e.target.value })}
              placeholder="Lead Designer"
              className="w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-left rtl:text-right"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
            {t('forms.vcard.phone')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-zinc-400">
              <Phone className="w-4 h-4" />
            </div>
            <input
              type="tel"
              value={data.phone || ''}
              onChange={(e) => onChange({ ...data, phone: e.target.value })}
              placeholder="+1 555 987 6543"
              dir="ltr"
              className={`w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 bg-white dark:bg-zinc-900 border rounded-xl text-sm font-medium placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-left rtl:text-left ${
                errors?.phone
                  ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                  : 'border-zinc-200 dark:border-zinc-800'
              }`}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
            {t('forms.vcard.email')}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-zinc-400">
              <Mail className="w-4 h-4" />
            </div>
            <input
              type="email"
              value={data.email || ''}
              onChange={(e) => onChange({ ...data, email: e.target.value })}
              placeholder="alex@acmestudios.com"
              dir="ltr"
              className="w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-left rtl:text-left"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
          {t('forms.vcard.website')}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-zinc-400">
            <Globe className="w-4 h-4" />
          </div>
          <input
            type="url"
            value={data.website || ''}
            onChange={(e) => onChange({ ...data, website: e.target.value })}
            placeholder="https://alexmorgan.design"
            dir="ltr"
            className="w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-left rtl:text-left"
          />
        </div>
      </div>
    </div>
  );
}
