'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, PieChart, Pie, Cell } from 'recharts'
import { Calendar, Download, Filter } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'


const COLORS = ['#3b82f6', '#a855f7', '#10b981', '#f59e0b']


export default function AnalyticsPage() {
  const { t } = useLanguage()
  const [timeData, setTimeData] = useState<any[]>([])
  const [topicData, setTopicData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/analytics')
      .then(res => res.json())
      .then(data => {
        setTimeData(data.timeData || [])
        setTopicData(data.topicData || [])
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }, [])
  return (
    <div className="space-y-8">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">{t('analytics_title')}</h2>
          <p className="text-muted-foreground mt-1">{t('analytics_subtitle')}</p>
        </div>
        <div className="flex gap-4">
           <button className="glass-card px-4 py-2 flex items-center gap-2">
             <Calendar className="w-4 h-4" /> {t('last_24h')}
           </button>
           <button className="bg-primary hover:bg-primary/90 px-4 py-2 rounded-xl flex items-center gap-2 text-primary-foreground font-medium transition-all">
             <Download className="w-4 h-4" /> {t('export_csv')}
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 glass-card p-8">
          <h3 className="text-xl font-semibold mb-6">{t('message_volume')}</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={timeData}>
                <defs>
                  <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                <XAxis dataKey="time" stroke="#888" axisLine={false} tickLine={false} />
                <YAxis stroke="#888" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="volume" stroke="#3b82f6" fillOpacity={1} fill="url(#colorVolume)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-card p-8">
          <h3 className="text-xl font-semibold mb-6">{t('topic_distribution')}</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topicData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {topicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                   contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-8 space-y-3">
             {topicData.map((topic, i) => (
               <div key={topic.name} className="flex justify-between items-center text-sm">
                 <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[i] }} />
                    <span className="text-muted-foreground">{topic.name}</span>
                 </div>
                 <span className="font-medium">{topic.value}</span>
               </div>
             ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-8">
        <h3 className="text-xl font-semibold mb-6">{t('sentiment_analysis')}</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
              <XAxis dataKey="time" stroke="#888" axisLine={false} tickLine={false} />
              <YAxis stroke="#888" axisLine={false} tickLine={false} />
              <Tooltip 
                 contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '8px' }}
              />
              <Line type="monotone" dataKey="sentiment" stroke="#10b981" strokeWidth={3} dot={{ fill: '#10b981', r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}
