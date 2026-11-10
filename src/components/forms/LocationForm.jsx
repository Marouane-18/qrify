import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPin, Navigation, ExternalLink, Loader2 } from 'lucide-react';

export default function LocationForm({ data, onChange, errors }) {
  const { t } = useTranslation();
  const [isLocating, setIsLocating] = useState(false);
  const [geoError, setGeoError] = useState('');

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setGeoError(t('validation.geoNotSupported'));
      return;
    }

    setIsLocating(true);
    setGeoError('');

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsLocating(false);
        onChange({
          ...data,
          latitude: pos.coords.latitude.toFixed(6),
          longitude: pos.coords.longitude.toFixed(6),
        });
      },
      (err) => {
        setIsLocating(false);
        setGeoError(t('validation.geoError', { err: err.message }));
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const presetLocations = [
    { name: t('forms.location.landmarks.paris'), lat: '48.8584', lng: '2.2945' },
    { name: t('forms.location.landmarks.ny'), lat: '40.7580', lng: '-73.9855' },
    { name: t('forms.location.landmarks.tokyo'), lat: '35.6595', lng: '139.7004' },
    { name: t('forms.location.landmarks.london'), lat: '51.5007', lng: '-0.1246' },
  ];

  const hasCoords = data.latitude && data.longitude;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
            {t('forms.location.lat')} <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-zinc-400">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.latitude || ''}
              onChange={(e) => onChange({ ...data, latitude: e.target.value })}
              placeholder="e.g. 48.8584"
              dir="ltr"
              className={`w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 bg-white dark:bg-zinc-900 border rounded-xl text-sm font-mono placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-left rtl:text-left ${
                errors?.latitude
                  ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                  : 'border-zinc-200 dark:border-zinc-800'
              }`}
            />
          </div>
          {errors?.latitude && (
            <p className="mt-1.5 text-xs text-rose-500 font-medium">
              {t(errors.latitude) !== errors.latitude ? t(errors.latitude) : errors.latitude}
            </p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
            {t('forms.location.lng')} <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-zinc-400">
              <MapPin className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={data.longitude || ''}
              onChange={(e) => onChange({ ...data, longitude: e.target.value })}
              placeholder="e.g. 2.2945"
              dir="ltr"
              className={`w-full pl-10 pr-3.5 rtl:pl-3.5 rtl:pr-10 py-2.5 bg-white dark:bg-zinc-900 border rounded-xl text-sm font-mono placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-left rtl:text-left ${
                errors?.longitude
                  ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                  : 'border-zinc-200 dark:border-zinc-800'
              }`}
            />
          </div>
          {errors?.longitude && (
            <p className="mt-1.5 text-xs text-rose-500 font-medium">
              {t(errors.longitude) !== errors.longitude ? t(errors.longitude) : errors.longitude}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={handleGetCurrentLocation}
          disabled={isLocating}
          className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-indigo-50 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:hover:bg-indigo-900/80 text-indigo-700 dark:text-indigo-300 font-medium border border-indigo-200 dark:border-indigo-800/60 transition-colors"
        >
          {isLocating ? (
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Navigation className="w-3.5 h-3.5" />
          )}
          {isLocating ? t('forms.location.locating') : t('forms.location.useGPS')}
        </button>

        {hasCoords && (
          <a
            href={`https://www.google.com/maps?q=${data.latitude},${data.longitude}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 font-medium transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            {t('forms.location.previewMap')}
          </a>
        )}
      </div>

      {geoError && (
        <p className="text-xs text-rose-500 font-medium">{geoError}</p>
      )}

      <div>
        <span className="text-xs text-zinc-400 dark:text-zinc-500 block mb-2">
          {t('forms.location.pickLandmark')}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {presetLocations.map((loc) => (
            <button
              key={loc.name}
              type="button"
              onClick={() => onChange({ ...data, latitude: loc.lat, longitude: loc.lng })}
              className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/70 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 transition-colors"
            >
              {loc.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
