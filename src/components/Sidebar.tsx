'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/context/LanguageContext'
import { LayoutDashboard, Share2, BarChart3, FileText, Settings, Zap, Globe } from 'lucide-react'
import { clsx } from 'clsx'


export default function Sidebar() {
  const pathname = usePathname()
  const { language, setLanguage, t } = useLanguage()

  const navItems = [
    { name: t('dashboard'), href: '/', icon: LayoutDashboard },
    { name: t('network'), href: '/network', icon: Share2 },
    { name: t('analytics'), href: '/analytics', icon: BarChart3 },
    { name: t('reports'), href: '/reports', icon: FileText },
  ]

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'tr' : 'en')
  }

  return (
    <div className="w-64 h-screen border-r border-white/5 flex flex-col p-6 bg-black/50 backdrop-blur-xl fixed left-0 top-0">
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center border border-primary/50">
          <Zap className="text-primary w-6 h-6" />
        </div>
        <h1 className="text-xl font-bold gradient-text">TG Intel</h1>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group",
                isActive 
                  ? "bg-primary/10 text-primary border border-primary/20" 
                  : "text-muted-foreground hover:bg-white/5 hover:text-white"
              )}
            >
              <item.icon className={clsx("w-5 h-5", isActive ? "text-primary" : "group-hover:text-white")} />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      <div className="pt-6 border-t border-white/5 space-y-2">
        <button
          onClick={toggleLanguage}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-white transition-all"
        >
          <Globe className="w-5 h-5" />
          <span className="font-medium">{language === 'en' ? 'Türkçe' : 'English'}</span>
        </button>

        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-white/5 hover:text-white transition-all"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">{t('settings')}</span>
        </Link>
      </div>
    </div>
  )
}
