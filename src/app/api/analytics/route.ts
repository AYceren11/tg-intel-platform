import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Fetch recent messages to calculate volume over time
    const messages = await prisma.message.findMany({
      take: 1000,
      orderBy: { timestamp: 'desc' }
    })

    // Group by hour
    const volumeByHour: { [key: string]: number } = {}
    messages.forEach(msg => {
      const date = new Date(msg.timestamp)
      const hour = date.getHours().toString().padStart(2, '0') + ':00'
      volumeByHour[hour] = (volumeByHour[hour] || 0) + 1
    })

    const timeData = Object.entries(volumeByHour).map(([time, volume]) => ({
      time,
      volume,
      sentiment: 0 // Zero-Hallucination: No real sentiment data available in DB yet
    }))

    // Fetch top hashtags for topic data
    const hashtags = await prisma.hashtag.findMany({
      take: 5,
      orderBy: { count: 'desc' }
    })

    const topicData = hashtags.map(h => ({
      name: h.tag,
      value: h.count
    }))

    return NextResponse.json({
      timeData: timeData.sort((a, b) => a.time.localeCompare(b.time)),
      topicData
    })
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return NextResponse.json({
      timeData: [],
      topicData: []
    })
  }
}
