'use client'

import React, { createContext, useContext, useState } from 'react'

type Language = 'en' | 'tr'

type Translations = {
  [key in Language]: {
    [key: string]: string
  }
}

const translations: Translations = {
  en: {
    dashboard: 'Dashboard',
    overview: 'Dashboard Overview',
    subtitle: 'Real-time Telegram network insights and trend analysis.',
    total_messages: 'Total Messages',
    active_users: 'Active Users',
    trending_topics: 'Trending Topics',
    avg_velocity: 'Avg Velocity',
    'Total Messages': 'Total Messages',
    'Active Users': 'Active Users',
    'Trending Topics': 'Trending Topics',
    'Avg Velocity': 'Avg Velocity',
    generated_on: 'Generated on',
    download: 'Download',
    trending_hashtags: 'Trending Hashtags',
    activity_heatmap: 'Activity Heatmap',
    network: 'Network',
    network_title: 'Interaction Network',
    network_subtitle: 'Discover influencers and community clusters within the Telegram network.',
    network_metrics: 'Network Metrics',
    total_nodes: 'Total Nodes',
    total_edges: 'Total Edges',
    density: 'Density',
    top_influencers: 'Top Influencers',
    search_user: 'Search User',
    filter_clusters: 'Filter Clusters',
    analytics: 'Analytics',
    analytics_title: 'In-depth Analytics',
    analytics_subtitle: 'Advanced time-series and categorical message analysis.',
    last_24h: 'Last 24 Hours',
    export_csv: 'Export CSV',
    message_volume: 'Message Volume (24h)',
    topic_distribution: 'Topic Distribution',
    sentiment_analysis: 'Sentiment Analysis over Time',
    reports: 'Reports',
    reports_title: 'Intelligence Reports',
    reports_subtitle: 'Generate production-ready PDF reports with automated trend summaries.',
    standard_brief: 'Standard Daily Brief',
    standard_brief_desc: 'Includes top 10 trends, message volume stats, and sentiment overview.',
    generate_pdf: 'Generate PDF',
    generating: 'Generating...',
    network_deep_dive: 'Network Deep-Dive',
    network_deep_dive_desc: 'Full interaction graph, influencer rankings, and community detection results.',
    scheduled_only: 'Scheduled only',
    report_success: 'Report Generated Successfully',
    download_now: 'Download Now',
    recent_reports: 'Recent Reports',

    settings: 'Settings',
    settings_subtitle: 'Configure operational dashboard parameters.',
    language: 'Language',
    language_desc: 'Select the active interface language.',
    system_status_desc: 'Operational state of backend pipelines.',
    switch_lang: 'Switch to Turkish',
    no_data: 'No Data Available',
    save: 'Save Changes',
    theme: 'Theme',
    dark: 'Dark',
    system_status: 'System Status',
    online: 'Online',
    offline: 'Offline'
  },
  tr: {
    dashboard: 'Panel',
    overview: 'Genel Bakış',
    subtitle: 'Gerçek zamanlı Telegram ağı içgörüleri ve trend analizi.',
    total_messages: 'Toplam Mesaj',
    active_users: 'Aktif Kullanıcılar',
    trending_topics: 'Trend Konular',
    avg_velocity: 'Ort. Hız',
    'Total Messages': 'Toplam Mesaj',
    'Active Users': 'Aktif Kullanıcılar',
    'Trending Topics': 'Trend Konular',
    'Avg Velocity': 'Ort. Hız',
    generated_on: 'Oluşturulma Tarihi:',
    download: 'İndir',
    trending_hashtags: 'Trend Etiketler',
    activity_heatmap: 'Aktivite Isı Haritası',
    network: 'Etkileşim Ağı',
    network_title: 'Etkileşim Ağı',
    network_subtitle: 'Telegram ağı içindeki etkileyicileri ve topluluk kümelerini keşfedin.',
    network_metrics: 'Ağ Metrikleri',
    total_nodes: 'Toplam Düğüm',
    total_edges: 'Toplam Kenar',
    density: 'Yoğunluk',
    top_influencers: 'En İyi Etkileyiciler',
    search_user: 'Kullanıcı Ara',
    filter_clusters: 'Kümeleri Filtrele',
    analytics: 'Analiz',
    analytics_title: 'Derinlemesine Analiz',
    analytics_subtitle: 'Gelişmiş zaman serisi ve kategorik mesaj analizi.',
    last_24h: 'Son 24 Saat',
    export_csv: 'CSV Olarak Dışa Aktar',
    message_volume: 'Mesaj Hacmi (24s)',
    topic_distribution: 'Konu Dağılımı',
    sentiment_analysis: 'Zaman İçinde Duygu Analizi',
    reports: 'Raporlar',
    reports_title: 'İstihbarat Raporları',
    reports_subtitle: 'Otomatik trend özetleri içeren üretime hazır PDF raporları oluşturun.',
    standard_brief: 'Standart Günlük Özet',
    standard_brief_desc: 'En iyi 10 trendi, mesaj hacmi istatistiklerini ve duygu durum genel bakışını içerir.',
    generate_pdf: 'PDF Oluştur',
    generating: 'Oluşturuluyor...',
    network_deep_dive: 'Derin Ağ Analizi',
    network_deep_dive_desc: 'Tam etkileşim grafiği, etkileyici sıralamaları ve topluluk tespiti sonuçları.',
    scheduled_only: 'Sadece Planlanmış',
    report_success: 'Rapor Başarıyla Oluşturuldu',
    download_now: 'Şimdi İndir',
    recent_reports: 'Son Raporlar',

    settings: 'Ayarlar',
    settings_subtitle: 'Operasyonel panel parametrelerini yapılandırın.',
    language: 'Dil',
    language_desc: 'Etkin arayüz dilini seçin.',
    system_status_desc: 'Arka plan veri akışlarının operasyonel durumu.',
    switch_lang: 'Türkçe',
    no_data: 'Veri Yok',
    save: 'Değişiklikleri Kaydet',
    theme: 'Tema',
    dark: 'Karanlık',
    system_status: 'Sistem Durumu',
    online: 'Aktif',
    offline: 'Pasif'
  }
}

type LanguageContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string) => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
