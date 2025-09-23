import { NextRequest, NextResponse } from 'next/server'
import Replicate from 'replicate'
import ntc from 'ntcjs'

interface RequestBody {
  prompt: string
  style?: string
  colors?: string[]
}

const replicate = new Replicate({ auth: process.env.REPLICATE_API_TOKEN })

// In production and preview deployments (on Vercel), the VERCEL_URL environment variable is set.
// In development (on your local machine), the NGROK_HOST environment variable is set.
const WEBHOOK_HOST = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : process.env.NGROK_HOST

export async function POST(request: NextRequest) {
  const { prompt, style, colors }: RequestBody = await request.json()

  if (!prompt) {
    return NextResponse.json(
      { error: `The key 'prompt' is required in request body` },
      { status: 400 }
    )
  }

  const options = {
    model: 'black-forest-labs/flux-schnell',
    input: {
      prompt: `one icon, (${prompt}), ${style ? `((${style} style))` : ''} ${colors?.length ? `${colors.map((color) => `theme color ${ntc.name(color)[1]}`).join(', ')}` : ''}, minimalist design, single clear subject in the center, sharp lines, high contrast, simple shapes, no text, pure light color background`,
      megapixels: '0.25',
      num_outputs: 4,
      aspect_ratio: '1:1',
      output_format: 'png',
      output_quality: 80,
      num_inference_steps: 4,
    },
  }

  if (WEBHOOK_HOST) {
    Object.assign(options, {
      webhook: `${WEBHOOK_HOST}/api/webhook`,
    })
    Object.assign(options, {
      webhook_events_filter: ['start', 'completed'],
    })
  }

  const prediction = await replicate.predictions.create(options)

  if (prediction?.error) {
    return NextResponse.json({ detail: prediction.error }, { status: 500 })
  }

  return NextResponse.json(prediction, { status: 201 })
}
