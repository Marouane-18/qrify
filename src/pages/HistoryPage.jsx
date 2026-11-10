import React from 'react';
import { useTranslation } from 'react-i18next';
import QRHistory from '../components/QRHistory';
import { QrCode } from 'lucide-react';

export default function HistoryPage({
  history,
  filteredHistory,
  searchQuery,
  onSearchChange,
  selectedType,
  onTypeChange,
  onReuseItem,
  onDeleteItem,
  onClearAll,
}) {
  const { t } = useTranslation();

  return (
    <div className="space-y-6 text-left rtl:text-right">
      {/* Page Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50">
            {t('history.title')}
          </h1>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            {t('history.subtitle')}
          </p>
        </div>

        {/* Quick Stat Counter */}
        <div className="inline-flex items-center gap-3 px-3.5 py-1.5 rounded-xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-2xs self-start">
          <div className="flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
            <QrCode className="w-4 h-4 text-indigo-500" />
            <span>{t('history.savedCount')}</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100 font-mono">
              {history.length}
            </span>
          </div>
        </div>
      </div>

      {/* History Manager Container */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs">
        <QRHistory
          history={history}
          filteredHistory={filteredHistory}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
          selectedType={selectedType}
          onTypeChange={onTypeChange}
          onReuseItem={onReuseItem}
          onDeleteItem={onDeleteItem}
          onClearAll={onClearAll}
        />
      </div>
    </div>
  );
}
