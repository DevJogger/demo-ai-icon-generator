'use client'
import { toast } from 'sonner'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import StylePicker from '@/components/input-panel/style-picker'
import ColorPicker from '@/components/input-panel/color-picker'
import store from '@/store/store'

export default function InputPanel() {
  const prompt = store((state) => state.prompt)
  const setPrompt = store((state) => state.setPrompt)

  const handleCreateButtonClick = () => {
    if (!prompt.trim()) {
      toast.warning('Please enter a prompt')
      return
    }
    // TODO: Implement API
  }

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
      <Button className='cursor-pointer' onClick={handleCreateButtonClick}>
        Create Icons
      </Button>
    </div>
  )
}
