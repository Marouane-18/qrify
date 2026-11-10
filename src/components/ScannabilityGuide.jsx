import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck,
  CheckCircle2,
  Printer,
  Contrast,
  Image as ImageIcon,
  Sparkles,
} from 'lucide-react';

export default function ScannabilityGuide() {
  const { t } = useTranslation();

  const guidelines = [
    {
      title: t('guide.c1Title'),
      icon: Contrast,
      description: t('guide.c1Desc'),
      tips: [t('guide.c1Tip1'), t('guide.c1Tip2')],
    },
    {
      title: t('guide.c2Title'),
      icon: ShieldCheck,
      description: t('guide.c2Desc'),
      tips: [
        t('guide.c2Tip1'),
        t('guide.c2Tip2'),
        t('guide.c2Tip3'),
        t('guide.c2Tip4'),
      ],
    },
    {
      title: t('guide.c3Title'),
      icon: ImageIcon,
      description: t('guide.c3Desc'),
      tips: [
        t('guide.c3Tip1'),
        t('guide.c3Tip2'),
        t('guide.c3Tip3'),
      ],
    },
    {
      title: t('guide.c4Title'),
      icon: Printer,
      description: t('guide.c4Desc'),
      tips: [
        t('guide.c4Tip1'),
        t('guide.c4Tip2'),
        t('guide.c4Tip3'),
      ],
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto text-left rtl:text-right">
      <div className="pb-4 border-b border-zinc-200 dark:border-zinc-800">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="w-5 h-5 text-indigo-500 shrink-0" />
          <h2 className="text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {t('guide.title')}
          </h2>
        </div>
        <p className="text-xs text-zinc-500 dark:text-zinc-400">
          {t('guide.subtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {guidelines.map((guide, idx) => {
          const Icon = guide.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3 shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 shrink-0">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {guide.title}
                </h3>
              </div>

              <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {guide.description}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-zinc-100 dark:border-zinc-800/60">
                {guide.tips.map((tip, tipIdx) => (
                  <div key={tipIdx} className="flex items-start gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span className="leading-tight">{tip}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
