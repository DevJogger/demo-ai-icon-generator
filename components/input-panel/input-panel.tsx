'use client'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import StylePicker from '@/components/input-panel/style-picker'
import ColorPicker from '@/components/input-panel/color-picker'
import store from '@/store/store'
import { sleep } from '@/lib/utils'
import { type Prediction } from 'replicate'

export default function InputPanel() {
  const [isLoading, setIsLoading] = useState(false)
  const [prediction, setPrediction] = useState<Prediction | null>(null)
  const prompt = store((state) => state.prompt)
  const style = store((state) => state.style)
  const colors = store((state) => state.colors)
  const setPrompt = store((state) => state.setPrompt)
  const setIcons = store((state) => state.setIcons)

  const handleCreateButtonClick = async () => {
    if (isLoading) return
    if (!prompt.trim()) {
      toast.warning('Please enter a prompt')
      return
    }
    setIsLoading(true)

    const response = await fetch('/api/predictions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt, style, colors }),
    })
    let prediction = (await response.json()) as Prediction
    if (response.status !== 201) {
      toast.error('Failed to create icon set')
      setIsLoading(false)
      return
    }
    setPrediction(prediction)

    while (prediction.status !== 'succeeded' && prediction.status !== 'failed') {
      await sleep(1000)
      const response = await fetch('/api/predictions/' + prediction.id)
      prediction = await response.json()
      if (response.status !== 200) {
        toast.error('Failed to create icon set')
        setIsLoading(false)
        return
      }
      setPrediction(prediction)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    if (prediction?.output && prediction.output.length > 0) {
      setIcons(prediction.output as string[])
    }
  }, [prediction, setIcons])

  return (
    <div className='flex gap-4'>
      <Input
        id='text-prompt'
        name='text-prompt'
        placeholder='Prompt for Icon Set (e.g. “Hockey equipment”)'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <StylePicker />
      <ColorPicker />
      <Button className='w-28 cursor-pointer' onClick={handleCreateButtonClick}>
        {isLoading ? (
          <div className='grid w-4 place-items-center'>
            <div className='size-4 animate-spin rounded-full border-2 border-purple-300 border-t-purple-600'></div>
          </div>
        ) : (
          <span>Create Icons</span>
        )}
      </Button>
    </div>
  )
}
