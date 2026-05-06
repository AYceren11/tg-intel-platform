'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Globe, Shield } from 'lucide-react'

export default function SettingsPage() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10">
      <header>
        <h2 className="text-4xl font-bold">{t('settings')}</h2>
        <p className="text-xl text-muted-foreground mt-2">{t('settings_subtitle')}</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Language Selection */}
        <div className="glass-card p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center border border-blue-500/30">
              <Globe className="w-6 h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{t('language')}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t('language_desc')}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <button
              onClick={() => setLanguage('en')}
              className={`py-3 px-6 rounded-xl font-bold border transition-all ${
                language === 'en'
                  ? 'bg-blue-500/20 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'border-white/10 text-muted-foreground hover:bg-white/5'
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage('tr')}
              className={`py-3 px-6 rounded-xl font-bold border transition-all ${
                language === 'tr'
                  ? 'bg-blue-500/20 border-blue-500 text-white shadow-lg shadow-blue-500/20'
                  : 'border-white/10 text-muted-foreground hover:bg-white/5'
              }`}
            >
              Türkçe
            </button>
          </div>
        </div>

        {/* System Status */}
        <div className="glass-card p-8 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-500/20 rounded-xl flex items-center justify-center border border-emerald-500/30">
              <Shield className="w-6 h-6 text-emerald-500" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{t('system_status')}</h3>
              <p className="text-sm text-muted-foreground mt-1">{t('system_status_desc')}</p>
            </div>
          </div>

          <div className="space-y-4 pt-4">
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
              <span className="font-medium">Telethon Ingestion</span>
              <span className="flex items-center gap-2 text-emerald-500 text-sm font-bold">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                {t('online')}
              </span>
            </div>
            <div className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/5">
              <span className="font-medium">TurkishBERT Engine</span>
              <span className="flex items-center gap-2 text-orange-500 text-sm font-bold">
                <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
                {t('offline')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
