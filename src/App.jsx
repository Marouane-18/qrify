import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import HistoryPage from './pages/HistoryPage';
import ScannabilityGuide from './components/ScannabilityGuide';
import ErrorBoundary from './components/ErrorBoundary';
import { ToastProvider, useToast } from './context/ToastContext';
import { useTheme } from './hooks/useTheme';
import { useQRHistory } from './hooks/useQRHistory';

const DEFAULT_CONFIG = {
  fgColor: '#000000',
  bgColor: '#ffffff',
  size: 240,
  errorLevel: 'M',
  margin: 2,
  logoId: 'none',
  logoSrc: null,
  logoSize: 0.22,
  excavateLogo: true,
};

const DEFAULT_FORM_DATA = {
  url: 'https://linear.app',
};

function AppContent() {
  const { t } = useTranslation();
  const { isDark, toggleTheme } = useTheme();
  const toast = useToast();

  const [activeView, setActiveView] = useState('generator'); // 'generator' | 'history' | 'guide'
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // QR State
  const [qrType, setQrType] = useState('url');
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [config, setConfig] = useState(DEFAULT_CONFIG);

  // History State
  const {
    history,
    filteredHistory,
    searchQuery,
    setSearchQuery,
    selectedTypeFilter,
    setSelectedTypeFilter,
    saveToHistory,
    deleteFromHistory,
    clearAllHistory,
  } = useQRHistory();

  const handleResetConfig = () => {
    setConfig(DEFAULT_CONFIG);
    toast.info(t('toasts.resetSuccess'));
  };

  const handleNewQR = () => {
    setQrType('url');
    setFormData({ url: '' });
    setActiveView('generator');
    toast.info(t('toasts.newQRReady'));
  };

  const handleReuseHistoryItem = (item) => {
    if (item.type) setQrType(item.type);
    if (item.formData) setFormData(item.formData);
    if (item.config) setConfig(item.config);
    setActiveView('generator');
  };

  const handleTypeChange = (newType) => {
    setQrType(newType);
    // Provide sensible default placeholders depending on type
    if (newType === 'url' && !formData.url) {
      setFormData({ url: 'https://linear.app' });
    } else if (newType === 'wifi' && !formData.ssid) {
      setFormData({ ssid: 'Office-Guest', password: '', encryption: 'WPA' });
    } else if (newType === 'whatsapp' && !formData.phone) {
      setFormData({ phone: '', message: 'Hi there!' });
    } else if (newType === 'location' && !formData.latitude) {
      setFormData({ latitude: '48.8584', longitude: '2.2945' });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 flex flex-col font-sans transition-colors duration-200">
      {/* Top Navigation */}
      <Navbar
        isDark={isDark}
        onToggleTheme={toggleTheme}
        activeView={activeView}
        onViewChange={setActiveView}
        historyCount={history.length}
        onNewQR={handleNewQR}
        onToggleMobileSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
        isMobileSidebarOpen={isMobileSidebarOpen}
      />

      {/* Main Body Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto flex">
        {/* Left/Right Sidebar */}
        <Sidebar
          activeView={activeView}
          onViewChange={setActiveView}
          historyCount={history.length}
          isOpen={isMobileSidebarOpen}
          onClose={() => setIsMobileSidebarOpen(false)}
        />

        {/* Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">
          {activeView === 'generator' && (
            <Dashboard
              type={qrType}
              onTypeChange={handleTypeChange}
              formData={formData}
              onFormDataChange={setFormData}
              config={config}
              onConfigChange={setConfig}
              onResetConfig={handleResetConfig}
              onSaveHistory={saveToHistory}
            />
          )}

          {activeView === 'history' && (
            <HistoryPage
              history={history}
              filteredHistory={filteredHistory}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
              selectedType={selectedTypeFilter}
              onTypeChange={setSelectedTypeFilter}
              onReuseItem={handleReuseHistoryItem}
              onDeleteItem={deleteFromHistory}
              onClearAll={clearAllHistory}
            />
          )}

          {activeView === 'guide' && <ScannabilityGuide />}
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t border-zinc-200/80 dark:border-zinc-800/80 py-4 px-6 text-center text-xs text-zinc-400 dark:text-zinc-600">
        <p>{t('footer.text')}</p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ErrorBoundary>
  );
}
