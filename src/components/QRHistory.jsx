import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { QRCodeCanvas } from 'qrcode.react';
import {
  Search,
  Trash2,
  RotateCcw,
  Copy,
  Check,
  Layers,
  X,
  AlertTriangle,
  Globe,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  Wifi,
  MapPin,
  UserCheck,
} from 'lucide-react';
import { copyTextToClipboard } from '../utils/qrExport';
import { useToast } from '../context/ToastContext';
import { QR_TYPES } from '../types/qrTypes';

const ICON_MAP = {
  url: Globe,
  text: FileText,
  email: Mail,
  phone: Phone,
  whatsapp: MessageSquare,
  wifi: Wifi,
  location: MapPin,
  vcard: UserCheck,
};

export default function QRHistory({
  history = [],
  filteredHistory = [],
  searchQuery = '',
  onSearchChange,
  selectedType = 'all',
  onTypeChange,
  onReuseItem,
  onDeleteItem,
  onClearAll,
}) {
  const { t, i18n } = useTranslation();
  const toast = useToast();
  const [previewItem, setPreviewItem] = useState(null);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [copiedId, setCopiedId] = useState(null);

  const handleCopyPayload = async (item, e) => {
    e?.stopPropagation();
    try {
      await copyTextToClipboard(item.payload);
      setCopiedId(item.id);
      toast.success(t('toasts.copyTextSuccess'));
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      toast.error(t('toasts.copyTextError'));
    }
  };

  const formatDate = (isoString) => {
    try {
      const d = new Date(isoString);
      const locale = i18n.language === 'ar' ? 'ar-SA' : i18n.language === 'fr' ? 'fr-FR' : 'en-US';
      return d.toLocaleDateString(locale, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return t('history.recently');
    }
  };

  return (
    <div className="space-y-4">
      {/* Search and Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 pb-3 border-b border-zinc-200 dark:border-zinc-800">
        {/* Search input */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3 rtl:pl-0 rtl:pr-3 flex items-center pointer-events-none text-zinc-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={t('history.searchPlaceholder')}
            className="w-full pl-9 pr-8 rtl:pl-8 rtl:pr-9 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-left rtl:text-right"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 pr-2.5 rtl:pr-0 rtl:pl-2.5 flex items-center text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Type filter & Clear buttons */}
        <div className="flex items-center gap-2 shrink-0">
          <select
            value={selectedType}
            onChange={(e) => onTypeChange(e.target.value)}
            className="text-xs px-3 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-left rtl:text-right"
          >
            <option value="all">{t('history.allTypes')}</option>
            {QR_TYPES.map((typeItem) => (
              <option key={typeItem.id} value={typeItem.id}>
                {t(`types.${typeItem.id}.shortLabel`)}
              </option>
            ))}
          </select>

          {history.length > 0 && (
            <button
              type="button"
              onClick={() => setShowClearConfirm(true)}
              className="text-xs px-3 py-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 font-medium flex items-center gap-1 transition-colors"
              title={t('history.clear')}
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{t('history.clear')}</span>
            </button>
          )}
        </div>
      </div>

      {/* History List or Empty State */}
      {filteredHistory.length === 0 ? (
        <div className="p-12 text-center rounded-2xl border border-dashed border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/30">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-400 mb-3">
            <Layers className="w-6 h-6" />
          </div>
          <h4 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-1">
            {history.length === 0 ? t('history.emptyTitle') : t('history.noResultsTitle')}
          </h4>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 max-w-sm mx-auto">
            {history.length === 0
              ? t('history.emptyDesc')
              : t('history.noResultsDesc')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredHistory.map((item) => {
            const Icon = ICON_MAP[item.type] || Globe;
            const itemConfig = item.config || {
              fgColor: '#000000',
              bgColor: '#ffffff',
              errorLevel: 'M',
              margin: 1,
            };

            return (
              <div
                key={item.id}
                onClick={() => setPreviewItem(item)}
                className="group p-3.5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 hover:border-indigo-400 dark:hover:border-indigo-600/70 shadow-xs hover:shadow-md transition-all duration-200 cursor-pointer flex flex-col justify-between text-left rtl:text-right"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2.5">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 truncate">
                        {t(`types.${item.type}.shortLabel`) || item.type}
                      </span>
                    </div>

                    <span className="text-[10px] text-zinc-400 font-mono shrink-0">
                      {formatDate(item.timestamp)}
                    </span>
                  </div>

                  {/* Thumbnail and title row */}
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="w-12 h-12 rounded-xl p-1 shrink-0 flex items-center justify-center border border-zinc-200 dark:border-zinc-700 overflow-hidden"
                      style={{
                        backgroundColor:
                          itemConfig.bgColor === 'transparent'
                            ? '#ffffff'
                            : itemConfig.bgColor,
                      }}
                    >
                      <QRCodeCanvas
                        value={item.payload}
                        size={40}
                        fgColor={itemConfig.fgColor}
                        bgColor="transparent"
                        level="L"
                        marginSize={0}
                      />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h5 className="text-xs font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                        {item.title}
                      </h5>
                      <p className="text-[11px] font-mono text-zinc-400 dark:text-zinc-500 truncate mt-0.5" dir="ltr">
                        {item.payload}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action buttons footer */}
                <div
                  className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/60 text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => {
                      onReuseItem(item);
                      toast.info(t('toasts.loadedIntoGenerator', { title: item.title }));
                    }}
                    className="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700 dark:text-indigo-400 dark:hover:text-indigo-300"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{t('history.reuse')}</span>
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={(e) => handleCopyPayload(item, e)}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                      title={t('history.copyTitle')}
                    >
                      {copiedId === item.id ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteItem(item.id);
                        toast.info(t('toasts.removedFromHistory'));
                      }}
                      className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title={t('history.deleteTitle')}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Clear Confirmation Modal */}
      {showClearConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-sm w-full p-5 space-y-4 shadow-2xl text-left rtl:text-right">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {t('history.clearConfirmTitle')}
              </h4>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                {t('history.clearConfirmDesc', { count: history.length })}
              </p>
            </div>
            <div className="flex items-center justify-end rtl:justify-start gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowClearConfirm(false)}
                className="px-3 py-1.5 rounded-xl border border-zinc-200 dark:border-zinc-700 text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                {t('history.cancel')}
              </button>
              <button
                type="button"
                onClick={() => {
                  onClearAll();
                  setShowClearConfirm(false);
                  toast.success(t('toasts.historyCleared'));
                }}
                className="px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs"
              >
                {t('history.confirmClear')}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Single Item Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-5 shadow-2xl text-left rtl:text-right">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-100 dark:border-zinc-800">
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-500">
                  {t(`types.${previewItem.type}.shortLabel`) || previewItem.type}
                </span>
                <h4 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100 truncate">
                  {previewItem.title}
                </h4>
              </div>
              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="p-1 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* QR Preview Display */}
            <div className="p-6 rounded-2xl bg-zinc-50 dark:bg-zinc-950 flex flex-col items-center justify-center border border-zinc-200/60 dark:border-zinc-800/60">
              <div
                className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-700 shadow-md"
                style={{
                  backgroundColor:
                    previewItem.config?.bgColor === 'transparent'
                      ? '#ffffff'
                      : previewItem.config?.bgColor || '#ffffff',
                }}
              >
                <QRCodeCanvas
                  value={previewItem.payload}
                  size={200}
                  fgColor={previewItem.config?.fgColor || '#000000'}
                  bgColor={previewItem.config?.bgColor || '#ffffff'}
                  level={previewItem.config?.errorLevel || 'M'}
                  marginSize={previewItem.config?.margin ?? 1}
                  imageSettings={
                    previewItem.config?.logoSrc
                      ? {
                          src: previewItem.config.logoSrc,
                          height: 40,
                          width: 40,
                          excavate: true,
                        }
                      : undefined
                  }
                />
              </div>

              <p className="mt-4 text-xs font-mono text-zinc-500 dark:text-zinc-400 break-all text-center max-h-20 overflow-y-auto px-2" dir="ltr">
                {previewItem.payload}
              </p>
            </div>

            {/* Modal actions */}
            <div className="flex items-center justify-between pt-1">
              <button
                type="button"
                onClick={() => {
                  onReuseItem(previewItem);
                  setPreviewItem(null);
                  toast.info(t('toasts.loadedIntoGenerator', { title: previewItem.title }));
                }}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 text-xs font-semibold transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                <span>{t('history.loadInGenerator')}</span>
              </button>

              <button
                type="button"
                onClick={() => setPreviewItem(null)}
                className="px-4 py-2 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 text-xs font-semibold hover:opacity-90 transition-opacity"
              >
                {t('history.done')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
