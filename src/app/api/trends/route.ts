import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import axios from 'axios'

export async function GET() {
  try {
    let trends = []
    try {
      // Optionally fetch from Python microservice for NLP processing
      const pythonResponse = await axios.get('http://localhost:8000/api/v1/trends', { timeout: 1000 })
      trends = pythonResponse.data.trends
    } catch (e) {
      console.log('Python microservice not reachable, using DB snapshots only')
    }

    // Fetch recent snapshots from DB
    const snapshots = await prisma.trendSnapshot.findMany({
      take: 20,
      orderBy: { timestamp: 'desc' }
    })

    // If Python trends are missing, use snapshots to populate the UI charts
    if (trends.length === 0 && snapshots.length > 0) {
      // Group by keyword and take average frequency for the chart
      const trendMap = new Map<string, number>()
      snapshots.forEach(s => {
        if (!trendMap.has(s.keyword)) {
          trendMap.set(s.keyword, s.frequency)
        }
      })
      trends = Array.from(trendMap.entries()).map(([keyword, score]) => ({
        keyword,
        score
      })).slice(0, 10)
    }

    return NextResponse.json({ trends, snapshots })
  } catch (error) {
    console.error('Error fetching trends:', error)
    return NextResponse.json({
      trends: [],
      snapshots: []
    })
  }
}
