import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Wifi, Eye, EyeOff, ShieldCheck, Lock } from 'lucide-react';

export default function WiFiForm({ data, onChange, errors }) {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);

  const encryptionType = data.encryption || 'WPA';
  const isNoPass = encryptionType === 'nopass';

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
          {t('forms.wifi.ssid')} <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-zinc-400">
            <Wifi className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={data.ssid || ''}
            onChange={(e) => onChange({ ...data, ssid: e.target.value })}
            placeholder={t('forms.wifi.ssidPlaceholder')}
            className={`w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 bg-white dark:bg-zinc-900 border rounded-xl text-sm font-medium placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-left rtl:text-right ${
              errors?.ssid
                ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                : 'border-zinc-200 dark:border-zinc-800'
            }`}
          />
        </div>
        {errors?.ssid && (
          <p className="mt-1.5 text-xs text-rose-500 font-medium">
            {t(errors.ssid) !== errors.ssid ? t(errors.ssid) : errors.ssid}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
            {t('forms.wifi.security')}
          </label>
          <select
            value={encryptionType}
            onChange={(e) => onChange({ ...data, encryption: e.target.value })}
            className="w-full px-3 py-2.5 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-left rtl:text-right"
          >
            <option value="WPA">{t('forms.wifi.wpa')}</option>
            <option value="WEP">{t('forms.wifi.wep')}</option>
            <option value="nopass">{t('forms.wifi.open')}</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
            {t('forms.wifi.password')} {!isNoPass && <span className="text-rose-500">*</span>}
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-zinc-400">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              disabled={isNoPass}
              value={isNoPass ? '' : data.password || ''}
              onChange={(e) => onChange({ ...data, password: e.target.value })}
              placeholder={isNoPass ? t('forms.wifi.openPlaceholder') : '••••••••••••'}
              dir="ltr"
              className={`w-full pl-10 pr-10 rtl:pl-10 rtl:pr-10 py-2.5 bg-white dark:bg-zinc-900 border rounded-xl text-sm font-medium placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-left rtl:text-left ${
                isNoPass ? 'opacity-50 cursor-not-allowed bg-zinc-100 dark:bg-zinc-800' : ''
              } ${
                errors?.password
                  ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                  : 'border-zinc-200 dark:border-zinc-800'
              }`}
            />
            {!isNoPass && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 pr-3 rtl:pr-0 rtl:pl-3 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                title={showPassword ? t('forms.wifi.hidePassword') : t('forms.wifi.showPassword')}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            )}
          </div>
          {errors?.password && (
            <p className="mt-1.5 text-xs text-rose-500 font-medium">
              {t(errors.password) !== errors.password ? t(errors.password) : errors.password}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <input
          type="checkbox"
          id="hidden-wifi"
          checked={Boolean(data.hidden)}
          onChange={(e) => onChange({ ...data, hidden: e.target.checked })}
          className="w-4 h-4 rounded text-indigo-600 border-zinc-300 dark:border-zinc-700 focus:ring-indigo-500 dark:bg-zinc-900"
        />
        <label htmlFor="hidden-wifi" className="text-xs font-medium text-zinc-600 dark:text-zinc-400 cursor-pointer select-none">
          {t('forms.wifi.hiddenCheckbox')}
        </label>
      </div>

      <div className="p-3 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/40 rounded-xl text-xs text-indigo-900 dark:text-indigo-300 flex items-start gap-2">
        <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0 mt-0.5" />
        <p>{t('forms.wifi.notice')}</p>
      </div>
    </div>
  );
}
