import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import QRTypeSelector from './QRTypeSelector';
import QRCustomization from './QRCustomization';
import QRPreview from './QRPreview';
import URLForm from './forms/URLForm';
import TextForm from './forms/TextForm';
import EmailForm from './forms/EmailForm';
import PhoneForm from './forms/PhoneForm';
import WhatsAppForm from './forms/WhatsAppForm';
import WiFiForm from './forms/WiFiForm';
import LocationForm from './forms/LocationForm';
import VCardForm from './forms/VCardForm';
import { generateQRPayload, getQRSummaryTitle } from '../utils/qrPayloadGenerator';
import { validateQRInput } from '../utils/validation';
import { Sliders, PenTool } from 'lucide-react';

export default function QRGenerator({
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
  const [activeTab, setActiveTab] = useState('content'); // 'content' | 'customize'

  // Generate real-time QR payload
  const currentPayload = generateQRPayload(type, formData);
  const currentTitle = getQRSummaryTitle(type, formData, t);
  const validation = validateQRInput(type, formData);

  const renderActiveForm = () => {
    switch (type) {
      case 'url':
        return <URLForm data={formData} onChange={onFormDataChange} errors={validation.errors} />;
      case 'text':
        return <TextForm data={formData} onChange={onFormDataChange} errors={validation.errors} />;
      case 'email':
        return <EmailForm data={formData} onChange={onFormDataChange} errors={validation.errors} />;
      case 'phone':
        return <PhoneForm data={formData} onChange={onFormDataChange} errors={validation.errors} />;
      case 'whatsapp':
        return <WhatsAppForm data={formData} onChange={onFormDataChange} errors={validation.errors} />;
      case 'wifi':
        return <WiFiForm data={formData} onChange={onFormDataChange} errors={validation.errors} />;
      case 'location':
        return <LocationForm data={formData} onChange={onFormDataChange} errors={validation.errors} />;
      case 'vcard':
        return <VCardForm data={formData} onChange={onFormDataChange} errors={validation.errors} />;
      default:
        return null;
    }
  };

  const handleSaveToHistory = () => {
    if (!currentPayload) return;
    onSaveHistory({
      type,
      title: currentTitle,
      payload: currentPayload,
      formData: { ...formData },
      config: { ...config },
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Column (or Right Column in RTL): Form & Customization Workspace */}
      <div className="lg:col-span-7 space-y-5">
        {/* Type Selector Grid */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
          <QRTypeSelector activeType={type} onSelectType={onTypeChange} />
        </div>

        {/* Content vs Customization Tabs */}
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs space-y-5">
          {/* Workspace Tabs Header */}
          <div className="flex items-center gap-1 p-1 bg-zinc-100/80 dark:bg-zinc-850/80 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60">
            <button
              type="button"
              onClick={() => setActiveTab('content')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'content'
                  ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              <PenTool className="w-3.5 h-3.5" />
              <span>{t('tabs.enterDetails')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('customize')}
              className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === 'customize'
                  ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 shadow-2xs'
                  : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>{t('tabs.designStyling')}</span>
              {config.logoSrc && (
                <span className="w-2 h-2 rounded-full bg-indigo-500" />
              )}
            </button>
          </div>

          {/* Active Tab Content */}
          <div className="pt-1">
            {activeTab === 'content' ? (
              <div className="space-y-4 animate-in fade-in duration-150">
                {renderActiveForm()}
              </div>
            ) : (
              <div className="animate-in fade-in duration-150">
                <QRCustomization
                  config={config}
                  onChange={onConfigChange}
                  onReset={onResetConfig}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Right Column (or Left Column in RTL): Sticky Live QR Preview & Export */}
      <div className="lg:col-span-5 lg:sticky lg:top-20">
        <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
          <QRPreview
            payload={currentPayload}
            config={config}
            type={type}
            title={currentTitle}
            isValid={validation.isValid}
            onSaveHistory={handleSaveToHistory}
          />
        </div>
      </div>
    </div>
  );
}
