import React from 'react';
import { useTranslation } from 'react-i18next';
import { ExternalLink, Link2, Sparkles } from 'lucide-react';

export default function URLForm({ data, onChange, errors }) {
  const { t } = useTranslation();

  const handleQuickDomain = (domain) => {
    onChange({ ...data, url: domain });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400 mb-1.5">
          {t('forms.url.label')} <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 rtl:left-auto rtl:right-0 pl-3.5 rtl:pl-0 rtl:pr-3.5 flex items-center pointer-events-none text-zinc-400">
            <Link2 className="w-4 h-4" />
          </div>
          <input
            type="url"
            value={data.url || ''}
            onChange={(e) => onChange({ ...data, url: e.target.value })}
            placeholder={t('forms.url.placeholder')}
            dir="ltr"
            className={`w-full pl-10 pr-10 rtl:pl-10 rtl:pr-10 py-2.5 bg-white dark:bg-zinc-900 border rounded-xl text-sm font-medium placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-left rtl:text-left ${
              errors?.url
                ? 'border-rose-500 bg-rose-50/20 dark:bg-rose-950/20'
                : 'border-zinc-200 dark:border-zinc-800'
            }`}
          />
          {data.url && (
            <a
              href={data.url.startsWith('http') ? data.url : `https://${data.url}`}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute inset-y-0 right-0 rtl:right-auto rtl:left-0 pr-3.5 rtl:pr-0 rtl:pl-3.5 flex items-center text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
              title={t('forms.url.testLink')}
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
        {errors?.url && (
          <p className="mt-1.5 text-xs text-rose-500 font-medium">
            {t(errors.url) !== errors.url ? t(errors.url) : errors.url}
          </p>
        )}
      </div>

      <div>
        <span className="text-xs text-zinc-400 dark:text-zinc-500 flex items-center gap-1 mb-2">
          <Sparkles className="w-3 h-3 text-indigo-500 shrink-0" />
          {t('forms.url.quickExamples')}
        </span>
        <div className="flex flex-wrap gap-1.5">
          {['https://github.com', 'https://linkedin.com', 'https://twitter.com', 'https://myportfolio.io'].map(
            (sample) => (
              <button
                key={sample}
                type="button"
                onClick={() => handleQuickDomain(sample)}
                className="text-xs px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/70 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-600 dark:text-zinc-300 font-mono transition-colors"
                dir="ltr"
              >
                {sample.replace('https://', '')}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
