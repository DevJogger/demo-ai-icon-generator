import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import store from '@/store/store'
import { Plus } from 'lucide-react'
import { generateRandomHexColor } from '@/lib/utils'

export default function ColorPicker() {
  const colors = store((state) => state.colors)
  const setColors = store((state) => state.setColors)

  return (
    <div className='flex items-center gap-2'>
      {colors.map((color, index) => (
        <Input
          type='color'
          className='w-9 cursor-pointer px-1'
          key={index}
          id={`color-${index}`}
          name={`color-${index}`}
          value={color}
          onChange={(e) => {
            const newColors = [...colors]
            newColors[index] = e.target.value
            setColors(newColors)
          }}
        />
      ))}
      <Button
        variant={'secondary'}
        className='cursor-pointer'
        onClick={() => {
          if (colors.length >= 3) return
          setColors([...colors, generateRandomHexColor()])
        }}
      >
        <Plus className='size-4' />
        Color
      </Button>
    </div>
  )
}
