import { useState, useCallback, useMemo } from 'react';
import { getStoredHistory, saveHistoryToStorage, clearStoredHistory } from '../utils/storage';

export function useQRHistory() {
  const [history, setHistory] = useState(() => getStoredHistory());
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypeFilter, setSelectedTypeFilter] = useState('all');

  const saveToHistory = useCallback((itemData) => {
    setHistory((prev) => {
      // Check if exact same payload already exists at top
      const existingIndex = prev.findIndex((i) => i.payload === itemData.payload);
      let updated;
      const newItem = {
        id: 'qr_' + Date.now().toString(36) + Math.random().toString(36).substring(2, 6),
        timestamp: new Date().toISOString(),
        isFavorite: false,
        ...itemData,
      };

      if (existingIndex !== -1) {
        // Move to top and update timestamp
        const withoutOld = prev.filter((_, idx) => idx !== existingIndex);
        updated = [newItem, ...withoutOld];
      } else {
        updated = [newItem, ...prev].slice(0, 60); // Store up to 60 codes
      }

      saveHistoryToStorage(updated);
      return updated;
    });
  }, []);

  const deleteFromHistory = useCallback((id) => {
    setHistory((prev) => {
      const updated = prev.filter((item) => item.id !== id);
      saveHistoryToStorage(updated);
      return updated;
    });
  }, []);

  const toggleFavorite = useCallback((id) => {
    setHistory((prev) => {
      const updated = prev.map((item) =>
        item.id === id ? { ...item, isFavorite: !item.isFavorite } : item
      );
      saveHistoryToStorage(updated);
      return updated;
    });
  }, []);

  const clearAllHistory = useCallback(() => {
    clearStoredHistory();
    setHistory([]);
  }, []);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const matchesSearch =
        !searchQuery ||
        (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.payload && item.payload.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.type && item.type.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesType =
        selectedTypeFilter === 'all' || item.type === selectedTypeFilter;

      return matchesSearch && matchesType;
    });
  }, [history, searchQuery, selectedTypeFilter]);

  return {
    history,
    filteredHistory,
    searchQuery,
    setSearchQuery,
    selectedTypeFilter,
    setSelectedTypeFilter,
    saveToHistory,
    deleteFromHistory,
    toggleFavorite,
    clearAllHistory,
    totalCount: history.length,
  };
}
