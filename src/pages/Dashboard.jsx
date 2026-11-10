import React from 'react';
import { useTranslation } from 'react-i18next';
import QRGenerator from '../components/QRGenerator';

export default function Dashboard({
  type,
  onTypeChange,
  formData,
  onFormDataChange,
  config,
  onConfigChange,
  onResetConfig,
  onSaveHistory,
}) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 text-left rtl:text-right">
      {/* Workspace Headline */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t('dashboard.title')}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            {t('dashboard.subtitle')}
          </p>
        </div>
      </div>

      {/* Main Generator Component */}
      <QRGenerator
        type={type}
        onTypeChange={onTypeChange}
        formData={formData}
        onFormDataChange={onFormDataChange}
        config={config}
        onConfigChange={onConfigChange}
        onResetConfig={onResetConfig}
        onSaveHistory={onSaveHistory}
      />
    </div>
  );
}
