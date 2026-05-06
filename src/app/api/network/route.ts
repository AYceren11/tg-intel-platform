import { NextResponse } from 'next/server'
import axios from 'axios'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    try {
      const pythonResponse = await axios.get('http://localhost:8000/api/v1/network', { timeout: 1000 })
      return NextResponse.json(pythonResponse.data)
    } catch (e) {
      console.log('Python microservice not reachable, using DB data for network graph')
    }

    const users = await prisma.telegramUser.findMany({ 
      include: {
        interactions: true, // Interactions where user is source
        mentionedBy: true,  // Interactions where user is target
      },
      take: 50 
    })

    const metrics = await prisma.networkMetric.findMany()

    const nodes = users.map(u => {
      const userMetric = metrics.find(m => m.userId === u.id)
      return {
        id: u.id,
        label: u.username || u.id,
        title: `${u.firstName || ''} ${u.lastName || ''}`.trim() || u.id,
        group: userMetric?.community ?? 0,
        degree: u.interactions.length + u.mentionedBy.length,
        betweenness: userMetric?.betweenness ?? 0,
      }
    })

    const interactions = await prisma.interaction.findMany({ 
      where: { targetUserId: { not: null } },
      take: 100 
    })

    const edges = interactions.map(i => ({
      from: i.sourceUserId,
      to: i.targetUserId!,
      label: i.type,
      arrows: 'to'
    }))

    return NextResponse.json({ nodes, edges })
  } catch (error) {
    console.error('Error fetching network data:', error)
    return NextResponse.json({
      nodes: [],
      edges: []
    })
  }
}
