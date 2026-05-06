'use client'

import { useState } from 'react'
import { FileText, Download, CheckCircle2, Loader2, Mail } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'


export default function ReportsPage() {
  const { t } = useLanguage()
  const [isGenerating, setIsGenerating] = useState(false)
  const [reportReady, setReportReady] = useState(false)


  const handleGenerate = () => {
    setIsGenerating(true)
    // Simulate server-side PDF generation
    setTimeout(() => {
      setIsGenerating(false)
      setReportReady(true)
    }, 3000)
  }

  return (
    <div className="max-w-4xl mx-auto space-y-12 py-10">
      <div className="text-center space-y-4">
        <h2 className="text-4xl font-bold">{t('reports_title')}</h2>
        <p className="text-xl text-muted-foreground">{t('reports_subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-card p-8 flex flex-col items-center text-center space-y-6">
           <div className="w-16 h-16 bg-blue-500/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
              <FileText className="w-8 h-8 text-blue-500" />
           </div>
           <div>
              <h3 className="text-xl font-bold">{t('standard_brief')}</h3>
              <p className="text-muted-foreground mt-2">{t('standard_brief_desc')}</p>
           </div>
           <button 
             onClick={handleGenerate}
             disabled={isGenerating}
             className="w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-white/90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
           >
             {isGenerating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Download className="w-5 h-5" />}
             {isGenerating ? t('generating') : t('generate_pdf')}
           </button>
        </div>

        <div className="glass-card p-8 flex flex-col items-center text-center space-y-6 opacity-60">
           <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center border border-purple-500/30">
              <Mail className="w-8 h-8 text-purple-500" />
           </div>
           <div>
              <h3 className="text-xl font-bold">{t('network_deep_dive')}</h3>
              <p className="text-muted-foreground mt-2">{t('network_deep_dive_desc')}</p>
           </div>
           <button className="w-full border border-white/20 text-white font-bold py-3 rounded-xl hover:bg-white/5 transition-all">
             {t('scheduled_only')}
           </button>
        </div>
      </div>

      {reportReady && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-emerald-500/10 border border-emerald-500/30 p-6 rounded-2xl flex items-center justify-between"
        >
          <div className="flex items-center gap-4">
             <div className="p-2 bg-emerald-500 rounded-full">
                <CheckCircle2 className="w-5 h-5 text-black" />
             </div>
             <div>
                <p className="font-bold">{t('report_success')}</p>
                <p className="text-sm text-emerald-500/80">TG_Intel_Report_2024-04-22.pdf is ready for download.</p>
             </div>
          </div>
          <button className="bg-emerald-500 text-black px-6 py-2 rounded-lg font-bold hover:bg-emerald-400 transition-all">
            {t('download_now')}
          </button>
        </motion.div>
      )}

      <div className="glass-card overflow-hidden">
         <div className="p-6 border-b border-white/5 bg-white/5">
            <h3 className="font-bold">{t('recent_reports')}</h3>
         </div>
         <div className="divide-y divide-white/5">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-6 flex items-center justify-between hover:bg-white/2 transition-all">
                 <div className="flex items-center gap-4">
                    <FileText className="w-5 h-5 text-muted-foreground" />
                    <div>
                       <p className="font-medium">Intelligence_Summary_v{i}.pdf</p>
                       <p className="text-xs text-muted-foreground">{t('generated_on')} {20-i}/04/2024</p>
                    </div>
                 </div>
                 <button className="text-sm text-primary hover:underline">{t('download')}</button>
              </div>
            ))}
         </div>
      </div>
    </div>
  )
}
