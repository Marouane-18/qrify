import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  QrCode,
  History,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';

export default function Sidebar({
  activeView,
  onViewChange,
  historyCount = 0,
  isOpen = false,
  onClose,
}) {
  const { t } = useTranslation();

  const navItems = [
    {
      id: 'generator',
      label: t('sidebar.generator'),
      icon: QrCode,
      description: t('sidebar.generatorDesc'),
    },
    {
      id: 'history',
      label: t('sidebar.history'),
      icon: History,
      badge: historyCount,
      description: t('sidebar.historyDesc'),
    },
    {
      id: 'guide',
      label: t('sidebar.guide'),
      icon: HelpCircle,
      description: t('sidebar.guideDesc'),
    },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-xs md:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 md:top-16 z-40 md:z-0 h-screen md:h-[calc(100vh-4rem)] w-64 shrink-0 bg-white dark:bg-zinc-950 border-r rtl:border-r-0 rtl:border-l border-zinc-200/80 dark:border-zinc-800/80 flex flex-col justify-between p-4 transition-transform duration-300 left-0 rtl:left-auto rtl:right-0 md:left-auto md:rtl:right-auto ${
          isOpen
            ? 'translate-x-0'
            : '-translate-x-full rtl:translate-x-full md:translate-x-0 md:rtl:translate-x-0'
        }`}
      >
        <div className="space-y-6">
          {/* Mobile Header */}
          <div className="md:hidden pb-3 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between">
            <span className="font-extrabold text-sm tracking-tight text-zinc-900 dark:text-white">
              {t('sidebar.menu')}
            </span>
            <button
              onClick={onClose}
              className="text-xs px-2 py-1 rounded-md text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200"
            >
              {t('sidebar.close')}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500 mb-2">
              {t('sidebar.workspace')}
            </p>
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeView === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onViewChange(item.id);
                    onClose?.();
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-left rtl:text-right transition-all group ${
                    isActive
                      ? 'bg-indigo-50/80 dark:bg-indigo-950/40 text-indigo-900 dark:text-indigo-200 font-semibold border border-indigo-200/60 dark:border-indigo-800/60 shadow-2xs'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-900 hover:text-zinc-900 dark:hover:text-zinc-100 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <Icon
                      className={`w-4 h-4 shrink-0 ${
                        isActive
                          ? 'text-indigo-600 dark:text-indigo-400'
                          : 'text-zinc-400 group-hover:text-zinc-600 dark:group-hover:text-zinc-300'
                      }`}
                    />
                    <div className="min-w-0">
                      <p className="text-xs leading-none truncate">{item.label}</p>
                      <p className="text-[10px] text-zinc-400 dark:text-zinc-500 leading-tight mt-1 truncate">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {typeof item.badge === 'number' && item.badge > 0 && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom Feature Card: Client-Side Security Guarantee */}
        <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200/80 dark:border-zinc-800/80 space-y-2 text-left rtl:text-right">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <ShieldCheck className="w-4 h-4 shrink-0" />
            <span className="text-xs font-semibold">{t('sidebar.privateBadge')}</span>
          </div>
          <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {t('sidebar.privateDesc')}
          </p>
          <div className="flex items-center gap-1.5 pt-1 text-[10px] font-mono text-zinc-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>{t('sidebar.engineStatus')}</span>
          </div>
        </div>
      </aside>
    </>
  );
}
