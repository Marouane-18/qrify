import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Globe,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  Wifi,
  MapPin,
  UserCheck,
} from 'lucide-react';
import { QR_TYPES } from '../types/qrTypes';

const ICON_MAP = {
  Globe,
  FileText,
  Mail,
  Phone,
  MessageSquare,
  Wifi,
  MapPin,
  UserCheck,
};

export default function QRTypeSelector({ activeType, onSelectType }) {
  const { t } = useTranslation();

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {t('tabs.contentType')}
        </label>
        <span className="text-xs font-medium text-indigo-600 dark:text-indigo-400">
          {t(`types.${activeType}.label`)}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {QR_TYPES.map((type) => {
          const Icon = ICON_MAP[type.iconName] || Globe;
          const isSelected = activeType === type.id;
          const label = t(`types.${type.id}.label`);
          const shortLabel = t(`types.${type.id}.shortLabel`);

          return (
            <button
              key={type.id}
              type="button"
              onClick={() => onSelectType(type.id)}
              className={`flex items-center gap-2.5 p-3 rounded-xl border text-left rtl:text-right transition-all duration-150 ${
                isSelected
                  ? 'bg-indigo-50/80 dark:bg-indigo-950/40 border-indigo-600/60 dark:border-indigo-500/60 text-indigo-900 dark:text-indigo-100 shadow-xs ring-1 ring-indigo-500/30'
                  : 'bg-white dark:bg-zinc-900 border-zinc-200/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-zinc-50/50 dark:hover:bg-zinc-850'
              }`}
            >
              <div
                className={`p-2 rounded-lg transition-colors shrink-0 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                }`}
              >
                <Icon className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold truncate leading-tight">
                  {shortLabel}
                </p>
                <p className="text-[10px] text-zinc-400 dark:text-zinc-500 truncate">
                  {label}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
