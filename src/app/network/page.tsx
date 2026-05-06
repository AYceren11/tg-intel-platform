'use client'

import { useEffect, useRef, useState } from 'react'
import { Network, DataSet } from 'vis-network/standalone'
import { Filter, Search, Info } from 'lucide-react'
import { motion } from 'framer-motion'
import { useLanguage } from '@/context/LanguageContext'


export default function NetworkPage() {
  const { t } = useLanguage()
  const containerRef = useRef(null)
  const [loading, setLoading] = useState(true)
  const [metrics, setMetrics] = useState<{ nodes: number, edges: number, influencers: any[] }>({ nodes: 0, edges: 0, influencers: [] })


  useEffect(() => {
    fetch('/api/network')
      .then(res => res.json())
      .then(data => {
        const visNodes = new DataSet(
          data.nodes.map((node: any) => ({
            id: node.id,
            label: `User ${node.id}`,
            value: node.degree,
            title: `Betweenness: ${node.betweenness.toFixed(2)}`,
            group: node.community,
            color: {
              background: '#1e293b',
              border: '#3b82f6',
              highlight: '#60a5fa'
            },
            font: { color: '#ffffff' }
          }))
        )

        const visEdges = new DataSet(
          data.edges.map((edge: any) => ({
            from: edge.from,
            to: edge.to,
            arrows: 'to',
            color: { color: '#475569', opacity: 0.4 }
          }))
        )

        const options = {
          nodes: {
            shape: 'dot',
            scaling: { min: 10, max: 30 },
          },
          edges: {
            smooth: { type: 'continuous' }
          },
          physics: {
            forceAtlas2Based: {
              gravitationalConstant: -50,
              centralGravity: 0.01,
              springLength: 100,
              springConstant: 0.08
            },
            maxVelocity: 50,
            solver: 'forceAtlas2Based',
            timestep: 0.35,
            stabilization: { iterations: 150 }
          },
          groups: {
            1: { color: { background: '#3b82f6', border: '#2563eb' } },
            2: { color: { background: '#a855f7', border: '#9333ea' } },
            3: { color: { background: '#10b981', border: '#059669' } },
          }
        }

        if (containerRef.current) {
          const network = new Network(containerRef.current, { nodes: visNodes, edges: visEdges } as any, options as any)
        }
        setMetrics({
          nodes: data.nodes.length,
          edges: data.edges.length,
          influencers: data.nodes.sort((a: any, b: any) => b.degree - a.degree).slice(0, 5)
        })
        setLoading(false)
      })
  }, [])

  return (
    <div className="space-y-8 h-full flex flex-col">
      <header className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold">{t('network_title')}</h2>
          <p className="text-muted-foreground mt-1">{t('network_subtitle')}</p>
        </div>
        <div className="flex gap-4">
           <button className="glass-card px-4 py-2 flex items-center gap-2 hover:bg-white/10 transition-all">
             <Search className="w-4 h-4" /> {t('search_user')}
           </button>
           <button className="glass-card px-4 py-2 flex items-center gap-2 hover:bg-white/10 transition-all">
             <Filter className="w-4 h-4" /> {t('filter_clusters')}
           </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 flex-1">
        <div className="lg:col-span-3 glass-card relative overflow-hidden min-h-[600px]">
          {loading && (
             <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10 backdrop-blur-sm">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
             </div>
          )}
          <div ref={containerRef} className="w-full h-full" />
          <div className="absolute bottom-6 left-6 flex gap-6">
             <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 text-sm">
                <div className="w-3 h-3 rounded-full bg-blue-500" /> Community A
             </div>
             <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-full border border-white/10 text-sm">
                <div className="w-3 h-3 rounded-full bg-purple-500" /> Community B
             </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-primary" /> {t('network_metrics')}
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('total_nodes')}</span>
                <span className="font-mono">{metrics.nodes}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('total_edges')}</span>
                <span className="font-mono">{metrics.edges}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('density')}</span>
                <span className="font-mono">{(metrics.edges / (metrics.nodes * (metrics.nodes - 1) || 1)).toFixed(4)}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-4">{t('top_influencers')}</h3>
            <div className="space-y-4">
              {metrics.influencers.map((inf, i) => (
                <div key={inf.id} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold border border-primary/50">
                      #{i+1}
                    </div>
                    <span className="text-sm font-medium">User {inf.id}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">Deg: {inf.degree}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
