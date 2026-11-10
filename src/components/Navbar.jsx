import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Sun,
  Moon,
  Plus,
  QrCode,
  Menu,
  X,
} from 'lucide-react';
import LanguageSwitcher from './LanguageSwitcher';

export default function Navbar({
  isDark,
  onToggleTheme,
  activeView,
  onViewChange,
  historyCount = 0,
  onNewQR,
  onToggleMobileSidebar,
  isMobileSidebarOpen,
}) {
  const { t } = useTranslation();

  return (
    <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 dark:border-zinc-800/80 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Logo & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onToggleMobileSidebar}
            className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 md:hidden"
            aria-label="Toggle navigation"
          >
            {isMobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <button
            type="button"
            onClick={() => onViewChange('generator')}
            className="flex items-center gap-2.5 group text-left rtl:text-right"
          >
            {/* Custom Modern QRify Logo */}
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-zinc-950 rounded-[10px] flex items-center justify-center">
                <QrCode className="w-5 h-5 text-indigo-400" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-base tracking-tight text-zinc-900 dark:text-white">
                  QRify
                </span>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20 uppercase tracking-wider">
                  {t('navbar.studioBadge')}
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 dark:text-zinc-500 hidden sm:block">
                {t('navbar.subtitle')}
              </p>
            </div>
          </button>
        </div>

        {/* Center Navigation Shortcuts (Desktop) */}
        <nav className="hidden md:flex items-center gap-1 p-1 bg-zinc-100/80 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80 rounded-xl">
          <button
            type="button"
            onClick={() => onViewChange('generator')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'generator'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-2xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
            }`}
          >
            {t('navbar.generator')}
          </button>
          <button
            type="button"
            onClick={() => onViewChange('history')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
              activeView === 'history'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-2xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
            }`}
          >
            <span>{t('navbar.history')}</span>
            {historyCount > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] font-mono bg-indigo-100 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 font-bold">
                {historyCount}
              </span>
            )}
          </button>
          <button
            type="button"
            onClick={() => onViewChange('guide')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              activeView === 'guide'
                ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-2xs'
                : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white'
            }`}
          >
            {t('navbar.guide')}
          </button>
        </nav>

        {/* Right Actions: Language Switcher, New QR, Theme toggle */}
        <div className="flex items-center gap-2">
          {/* Language Switcher Dropdown */}
          <LanguageSwitcher />

          {/* New QR Button */}
          <button
            type="button"
            onClick={onNewQR}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{t('navbar.newQR')}</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-xl border border-zinc-200 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            title={isDark ? t('navbar.switchThemeLight') : t('navbar.switchThemeDark')}
            aria-label="Toggle theme"
          >
            {isDark ? (
              <Sun className="w-4 h-4 text-amber-400 transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-700 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
